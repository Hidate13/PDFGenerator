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

    onMounted(() => {
      pdfUrl.value = route.params.pdfUrl || "";
    });

    const getDownloadUrl = (url) => {
      const fileId = url.match(/\/d\/(.*?)\//)[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    };

    console.log(route.params.pdfUrl + " test the pdfUrl outside");
    // const downloadPdf = () => {
    //   const downloadUrl = getDownloadUrl(decodedPdfUrl.value);
    //   const link = document.createElement("a");
    //   link.href = downloadUrl;
    //   link.download = "document.pdf";
    //   link.click();
    // };

    const downloadWordDocument = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzReiwTkqwNSZrtVp6Gw_TukN4bQDemwV-1sHYG2-YVlAN4XH9fIFe8cXVgeUooub6d/exec"
        );
        const data = await response.json();

        if (response.ok) {
          // Directly download the Word document
          const link = document.createElement("a");
          link.href = data.wordUrl;
          link.download = "document.docx";
          link.click();
        } else {
          console.error("Failed to generate document:", data.error);
        }
      } catch (error) {
        console.error("Error fetching Word document:", error);
      }
    };

    const downloadPdf = () => {
      const downloadUrl = getDownloadUrl(decodedPdfUrl.value);
      window.location.href = downloadUrl; // Redirect to download URL
    };

    const downloadWord = async () => {
      try {
        const pdfBlob = await fetchPdf();
        const wordUrl = await convertPdfToWord(pdfBlob);

        // Trigger download
        const link = document.createElement("a");
        link.href = wordUrl;
        link.download = "document.docx";
        link.click();
      } catch (error) {
        console.error("Error during download:", error);
      }
    };

    const closePreview = () => {
      router.push("/print-pdf"); // Adjust the route as needed
    };

    const decodedPdfUrl = computed(() => {
      try {
        return decodeURIComponent(pdfUrl.value);
      } catch (e) {
        console.error("Error decoding PDF URL:", e);
        return "";
      }
    });

    const fetchPdf = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwZqhqDQvRUkU6urCAD7WTn_AoUjv4sTIiTm_ey90IZnC99t2PLKc6Z6a6N8d3q3BIl/exec"
        );
        const blob = await response.blob();
        return blob;
      } catch (error) {
        console.error("Error fetching PDF:", error);
        throw error;
      }
    };

    return {
      decodedPdfUrl,
      downloadPdf,
      downloadWord,
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
