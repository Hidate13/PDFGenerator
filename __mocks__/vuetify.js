// __mocks__/vuetify.js
const Vuetify = {
  // Mock the Vuetify components you use
  VBtn: { template: "<button><slot></slot></button>" },
  VCard: { template: "<div><slot></slot></div>" },
  VCardTitle: { template: "<div><slot></slot></div>" },
  VCardText: { template: "<div><slot></slot></div>" },
  VContainer: { template: "<div><slot></slot></div>" },
  VRow: { template: "<div><slot></slot></div>" },
  VCol: { template: "<div><slot></slot></div>" },
};

export default Vuetify;
