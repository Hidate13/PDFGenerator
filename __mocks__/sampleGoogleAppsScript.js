globalThis.SpreadsheetApp = {
  openById: (id) => ({
    getSheetByName: (name) => ({
      getCharts: () => [
        {
          modify: () => ({
            setOption: (option, value) => ({
              build: () => ({}),
            }),
          }),
        },
      ],
      updateChart: () => {}, // Mock updateChart method
      getRange: (cell) => ({
        setValue: (value) => {},
        getValue: () => {
          const values = {
            B2: 200, // Mock PlanPremium value
            B3: 250.98, // Mock Rider1 value
            B4: 100.0, // Mock Rider2 value
          };
          return values[cell] || 0;
        },
      }),
    }),
  }),
};

globalThis.DriveApp = {
  getFileById: (id) => ({
    makeCopy: () => ({
      getId: () => "123456",
    }),
    getAs: () => new Blob([]),
    setTrashed: () => {},
  }),
  createFile: (pdf) => ({
    setName: (name) => ({
      getId: () => "abcdef",
    }),
    setSharing: (access, permission) => {
      // Mock implementation of setSharing
      if (access !== "anyoneWithLink" || permission !== "view") {
        throw new Error("Unexpected arguments to setSharing");
      }
    },
  }),
  Access: {
    ANYONE_WITH_LINK: "anyoneWithLink", // Mock Access property
  },
  Permission: {
    VIEW: "view", // Mock Permission property
  },
};

globalThis.DocumentApp = {
  openById: (id) => ({
    getBody: () => ({
      replaceText: (search, replacement) => {},
    }),
    saveAndClose: () => {}, // Add this line to mock saveAndClose
  }),
};

globalThis.Logger = {
  log: (...args) => {
    // Optional: Implement logging or just ignore
    console.log(...args); // For debugging purposes
  },
};

// __mocks__/src/scriptDocsToPdf.js or in your test file setup
globalThis.ScriptApp = {
  getOAuthToken: () => "mocked-oauth-token",
};

globalThis.UrlFetchApp = {
  fetch: (url, options) => {
    // Simulate a response
    return {
      getBlob: () =>
        new Blob(["mocked content"], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }),
    };
  },
};

globalThis.Blob = class {
  constructor(content, options) {
    this.content = content;
    this.options = options;
  }
};
