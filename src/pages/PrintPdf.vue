<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <span class="headline">PDF GENERATOR</span>
          </v-card-title>
          <v-card-text>
            <v-btn @click="generatePdf">Generate and Preview PDF</v-btn>
            <div v-if="loading">
              <v-progress-circular indeterminate></v-progress-circular>
              <span>Generating PDF...</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const loading = ref(false);
    const router = useRouter();

    const generatePdf = async () => {
      loading.value = true;
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxHUcGd-VNfMOaIX5WrpDHhmlfBb9zo21kyzhDVZQu99FDf0QnsqjT7OkOrL8u-WJe1/exec"
        );
        const result = await response.json();
        console.log("PDF generation response:", result);
        console.log("wordUrl response:", result.wordUrl);

        const pdfUrl = result.pdfId || result.pdfUrl;
        const wordUrl = result.wordUrl;
        if (!pdfUrl || !wordUrl) {
          throw new Error("PDF URL is missing from the response.");
        }

        console.log("PDF URL:", pdfUrl);
        console.log("Word URL:", wordUrl);
        router.push({
          name: "PreviewPage",
          params: {
            pdfUrl: encodeURIComponent(pdfUrl),
          },
          query: {
            wordUrl: wordUrl,
          },
        });
      } catch (error) {
        console.error("Error fetching PDF:", error);
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      generatePdf,
    };
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
