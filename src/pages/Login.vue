<!-- src/components/Login.vue -->
<template>
  <v-container>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit">Login</v-btn>
        <v-btn @click="$router.push('/signup')" color="secondary"
          >Sign Up</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3030/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/home");
      } catch (err) {
        console.error("Login failed:", err);
        alert("Login failed");
      }
    },
  },
};
</script>
