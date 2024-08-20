<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <span class="headline">PDF Preview</span>
          </v-card-title>
          <v-card-text>
            <div v-if="decodedPdfUrl">
              <iframe :src="decodedPdfUrl" width="100%" height="600px"></iframe>
            </div>
            <div v-else>
              <span>No PDF URL provided.</span>
            </div>
            <div>
              <v-btn @click="downloadPdf" color="info" class="mr-2"
                >Save PDF</v-btn
              >
              <v-btn @click="downloadWordDocument" color="primary" class="mr-2"
                >Save Word</v-btn
              >

              <v-btn @click="closePreview" color="error">Close</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pdfUrl = ref("");
    const wordUrl = ref("");

    onMounted(() => {
      pdfUrl.value = route.params.pdfUrl || "";
      wordUrl.value = route.query.wordUrl
        ? decodeURIComponent(route.query.wordUrl)
        : "";
      console.log("PDF URL mounted:", pdfUrl.value);
      console.log("Word URL mounted:", wordUrl.value);
    });

    const getDirectDownloadUrl = (previewUrl) => {
      const fileId = previewUrl.match(/\/d\/(.*?)\//)[1];
      console.log("File ID:", fileId.value);
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    };

    const downloadPdf = () => {
      const downloadUrl = getDirectDownloadUrl(decodedPdfUrl.value);
      window.location.href = downloadUrl; // Redirect to download URL
    };

    const downloadWordDocument = () => {
      console.log("Word document URL:", wordUrl.value); // Debugging line
      if (wordUrl.value) {
        window.location.href = wordUrl.value;
      } else {
        console.error("Word document URL is missing.");
      }
    };

    console.log(route.params.pdfUrl + " test the pdfUrl outside");

    const closePreview = () => {
      router.push("/"); //
    };

    const decodedPdfUrl = computed(() => {
      try {
        return decodeURIComponent(pdfUrl.value);
      } catch (e) {
        console.error("Error decoding PDF URL:", e);
        return "";
      }
    });

    return {
      decodedPdfUrl,
      downloadPdf,
      closePreview,
      downloadWordDocument,
    };
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
