<!-- src/components/Protected.vue -->
<template>
  <v-container>
    <v-btn @click="logout">Logout</v-btn>
    <div v-if="message">{{ message }}</div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3030/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.message = response.data.message;
    } catch (err) {
      console.error("Failed to fetch protected resource:", err);
      this.$router.push("/");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
