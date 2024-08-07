<template>
  <v-app>
    <v-main>
      <Navigation />
      <router-view />
      <AppFooter
        style="position: fixed; width: 100%; left: 0; right: 0; z-index: 9999"
      />
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
