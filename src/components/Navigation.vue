<template>
  <v-app-bar :dark="isDark" app fixed>
    <v-layout class="overflow-visible" style="height: 56px">
      <v-col class="d-flex justify-start" cols="2">
        <h2>
          <a href="./home" class="no-decoration"
            >Testing<span class="logo">Vue</span></a
          >
        </h2>
      </v-col>
      <v-col class="d-flex justify-center" cols="6">
        <v-btn @click="navigateToHome">Home</v-btn>
        <v-btn @click="navigateToAbout">About</v-btn>
        <v-btn @click="navigateToMenu">Menu</v-btn>
        <v-btn @click="navigateToPrintPDF">printPdf</v-btn>
      </v-col>
      <v-col cols="2">
        <v-switch
          v-model="isDark"
          :label="`${isDark ? 'Dark' : 'Light'}`"
          hide-details
          @change="toggleDarkMode"
        ></v-switch>
      </v-col>
      <v-col class="d-flex justify-end" cols="2">
        <LogoutBtn v-if="isLoggedIn" />
        <v-btn v-else @click="navigateToLogin">Login</v-btn>
      </v-col>
    </v-layout>
  </v-app-bar>
</template>

<script>
import LogoutBtn from "./LogoutBtn.vue";

export default {
  name: "Navigation",
  methods: {
    navigateToHome() {
      this.$router.push("/home");
    },
    navigateToAbout() {
      this.$router.push("/about");
    },
    navigateToMenu() {
      this.$router.push("/menu");
    },
    navigateToLogin() {
      this.$router.push("/");
    },
    navigateToPrintPDF() {
      this.$router.push("/print-pdf");
    },
    toggleDarkMode() {
      // Update Vuetify theme
      this.$vuetify.theme.global.name = this.isDark
        ? "myCustomDarkTheme"
        : "myCustomLightTheme";
      // Save the current theme to localStorage
      localStorage.setItem("theme", this.isDark ? "Dark" : "Light");
    },
  },
  data() {
    return {
      isDark: false, // Default value
    };
  },
  // data: () => ({
  //   theme: "Light",
  // }),
  mounted() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.isDark = savedTheme === "Dark";
      this.$vuetify.theme.defaultTheme = this.isDark
        ? "myCustomDarkTheme"
        : "myCustomLightTheme";
    }
  },
  computed: {
    isLoggedIn() {
      const token = localStorage.getItem("token");
      console.log("isLoggedIn evaluated:", !!token); // Log computed property evaluation
      console.log("isLoggedIn show the token:", token); // Log computed property evaluation
      return !!token;
    },
  },
  watch: {
    isLoggedIn(val) {
      console.log("isLoggedIn changed:", val); // Log changes in isLoggedIn
      this.$forceUpdate(); // Force re-render the component when isLoggedIn changes
    },
  },
};
</script>

<style>
.no-decoration {
  text-decoration: none;
  color: inherit; /* This will inherit the color from its parent */
}

.no-decoration:hover {
  color: inherit; /* This will keep the color the same on hover */
}

.logo {
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
.theme-toggle {
  font-size: x-small;
}
</style>
