**PDF Generator**

## **Overview**

**PDF Generator** is a Vue.js application designed to generate PDF documents based on predefined templates. It integrates Google Apps Script to dynamically populate templates with data and generate PDFs. The application features a simple user interface with a button that triggers the PDF generation process.

## **Project Structure**

- **`src/pages`**: Contains the source code for the PDF Generator.

  - **`PreviewPDF.vue`**: The main page that includes the "Preview PDF" button.
  - **`PrintPdf.vue`**: The main page that includes the "Print PDF" button and handles the PDF generation logic.

- **`tests/`**: Contains test files for Vitest.
  - **`DocsToPdf.test.js`**: Unit and integration tests using Vitest.
  - **`DocsToWord.test.js`**: Unit and integration tests using Vitest.

## **Dependencies**

- **vuetify.js**: Framework used for building the UI.
- **`@vue/test-utils`**: Utilities for testing Vue components.
- **`Vitest`**: A fast unit test framework powered by Vite.
- **`@playwright/test`**: A library for browser automation, used to run end-to-end tests.
- **`axios`**: HTTP client for making API requests to Google Apps Script.

## **Setup**

### **1. Clone the Repository**

Clone the repository to your local machine using Git. Replace `<repository-url>` with the URL of your Git repository.

```bash
git clone https://github.com/Hidate13/PDFGenerator
cd PDFGenerator
```

### **2. Prerequisites**

1. **Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### **3. Install Dependencies**

Install the necessary dependencies using npm:

```bash
npm install
```

### **4. Running the Project**

To start the development server and run the application, use:

```bash
npm run dev
```

### **5. Running Tests**

- **Vitest**: Run unit and integration tests with Vitest:

  ```bash
  npx vitest run
  ```

- **Playwright**: Run end-to-end tests with Playwright:

  ```bash
  npx playwright test --ui
  ```

## **Functionality**

1. **Generate PDF**:

   - The application includes a single button labeled "Print PDF."
   - When the button is clicked, it triggers a request to a Google Apps Script endpoint that:
     - Retrieves a predefined Word document template.
     - Populates the template fields with data returned from the API (hardcoded in the backend).
     - Saves the generated PDF using the `{{name}}` field from the data without overwriting the original template.
     - Returns the generated PDF file to the Vue.js frontend.

2. **API**:

   - The API provides the data needed to populate the template fields. This data is hardcoded and includes fields like `{{name}}`, `{{plan}}`, `{{premium}}`, etc.
   - The API is designed to be simple and does not require a database or external data source.

3. **Testing**:

   - **Vitest** is used for unit and integration testing of the Vue components.
   - **Playwright** is used for end-to-end testing to ensure the entire PDF generation process works correctly.

4. **Google Apps Script**:
   - A Google Apps Script is used to handle the document template, populate the fields with data, and generate the PDF. The script is hosted on Google Apps Script and accessible via a URL endpoint.

---

This structure and setup should provide a clear path for developing, testing, and deploying the PDF Generator application. If you need any more details or adjustments, feel free to ask!
