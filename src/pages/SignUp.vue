<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="register">
      <v-text-field
        v-model="username"
        :rules="[(v) => !!v || 'Username is required']"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[(v) => !!v || 'Password is required']"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" type="submit" color="primary">Sign Up</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch("http://localhost:3030/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          this.$router.push("/");
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    },
  },
};
</script>
