<!--   START  ====>> Copy of GeneratePDF (relatedsheet)  -->
<template>
  <div>
    <v-app>
      <v-container>
        <v-btn @click="printPDF" :loading="loading" color="primary">
          <template v-if="!loading">Print PDF</template>
          <template v-else>Loading...</template>
        </v-btn>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    printPDF() {
      this.loading = true;
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbyc59GbvjjkXg2Od8vbMH1wyHGKXDBn0UdFo3IuEI3aAKU_OvW4gdyhJhcFMMdM677y3w/exec";
      const callbackName = "jsonpCallback";

      window[callbackName] = (data) => {
        this.loading = false;
        if (data.pdfId) {
          const userConfirmed = confirm(
            "PDF generated with ID: " + data.pdfId + ". Do you want to view it?"
          );
          if (userConfirmed) {
            window.open(`${data.pdfId}`, "_blank");
          }
        } else {
          alert("Failed to generate PDF: " + data.error);
        }
        // Clean up the script tag after use
        document.body.removeChild(script);
      };

      const script = document.createElement("script");
      script.src = `${scriptUrl}?callback=${callbackName}`;
      document.body.appendChild(script);
    },
  },
};
</script>

<!--   END  ====>> Copy of GeneratePDF (relatedsheet)  -->

<!-- <template>
  <v-app>
    <v-container>
      <v-btn @click="printPdf">Print PDF</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    async printPdf() {
      const response = await fetch("http://localhost:3030/api/data");
      const data = await response.json();

      const pdfUrl = `http://localhost:3030/api/generate-pdf?name=${data.Name}`;
      window.open(pdfUrl, "_blank");
    },
  },
};
</script> -->

<!-- <template>
  <v-container>
    <v-btn @click="generatePDF" color="primary">Generate PDF</v-btn>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-title class="headline">PDF Preview</v-card-title>
        <v-card-text>
          <iframe
            v-if="pdfUrl"
            :src="pdfUrl"
            width="100%"
            height="500px"
          ></iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="downloadPDF"
            >Download PDF</v-btn
          >
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const pdfUrl = ref(null);
const pdfBlob = ref(null);

const generatePDF = async () => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyc59GbvjjkXg2Od8vbMH1wyHGKXDBn0UdFo3IuEI3aAKU_OvW4gdyhJhcFMMdM677y3w/exec"
    ); // Replace with your Apps Script web app URL
    const base64String = await response.text();
    const binary = atob(base64String);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    pdfBlob.value = new Blob([bytes], { type: "application/pdf" });
    pdfUrl.value = URL.createObjectURL(pdfBlob.value);

    // Open the dialog with the PDF preview
    dialog.value = true;
  } catch (error) {
    console.error("Error:", error);
  }
};

const downloadPDF = () => {
  const link = document.createElement("a");
  link.href = pdfUrl.value;
  link.download = "GeneratedDocument.pdf";
  link.click();

  // Optionally, revoke the object URL after it's used
  setTimeout(() => URL.revokeObjectURL(pdfUrl.value), 10000);
};
</script>

<style scoped>
/* Add your styles here */
</style> -->

<!-- <template>
  <v-container>
    <v-btn @click="generatePDF" color="primary">Generate PDF</v-btn>
    <v-btn @click="goToPreview">Go to Preview</v-btn>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-title class="headline">PDF Preview</v-card-title>
        <v-card-text>
          <iframe
            v-if="pdfUrl"
            :src="pdfUrl"
            width="100%"
            height="500px"
          ></iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="downloadPDF"
            >Download PDF</v-btn
          >
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const pdfUrl = ref(null);
const pdfBlob = ref(null);

const generatePDF = async () => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby9y74tPP-w2OJ4rjOrZo1qw0-H4vl7t4xIHlA2j-5kj761F17aBEzeB9Mtwo1eF-bi/exec"
    ); // Replace with your Apps Script web app URL
    const base64String = await response.text();
    const binary = atob(base64String);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    pdfBlob.value = new Blob([bytes], { type: "application/pdf" });
    pdfUrl.value = URL.createObjectURL(pdfBlob.value);

    // Open the dialog with the PDF preview
    dialog.value = true;
  } catch (error) {
    console.error("Error:", error);
  }
};

const downloadPDF = () => {
  const link = document.createElement("a");
  link.href = pdfUrl.value;
  link.download = "GeneratedDocument.pdf";
  link.click();

  // Optionally, revoke the object URL after it's used
  setTimeout(() => URL.revokeObjectURL(pdfUrl.value), 10000);
};
</script>

<script>
export default {
  methods: {
    goToPreview() {
      this.$router.push("/preview"); // Navigate to the preview page
    },
    async generatePdf() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycby9y74tPP-w2OJ4rjOrZo1qw0-H4vl7t4xIHlA2j-5kj761F17aBEzeB9Mtwo1eF-bi/exec"
        );
        const result = await response.json();
        console.log("PDF Generation Result:", result); // Log the result
        this.pdfUrl = `https://drive.google.com/file/d/${result.pdfId}/view?usp=sharing`;
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style> -->
