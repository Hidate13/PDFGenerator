<template>
  <v-btn @click="logout" color="primary">Logout</v-btn>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      // Log token removal attempt
      console.log(
        "Token after removal attempt:",
        localStorage.getItem("token")
      );
      this.$nextTick(() => {
        this.$forceUpdate();
        this.$router.push("/");
      });
    },
  },
};
</script>
