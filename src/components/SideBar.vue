<template>
  <v-card>
    <v-navigation-drawer style="height: 90%" v-model="drawer" permanent>
      <div color="" class="pa-4">
        <v-img
          src="../assets/p1.webp"
          alt="food"
          width="150"
          height="150"
          class="ml-9"
        ></v-img>
      </div>

      <!-- <v-card class="rounded-e-xl me" width="60" height="400" color="#545454">
      </v-card> -->

      <v-list class="top">
        <v-list-item
          v-for="(item, i) in links"
          :key="i"
          :value="item"
          class="mb-5"
          color="#FF6259"
          variant="plain"
        >
          <template v-slot:append="{ isActive }">
            <div v-if="isActive" class="a"></div>
          </template>

          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <router-link class="link-sidebar" :to="item.path">
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>

      <!-- <v-div
        style="
          position: absolute;
          bottom: 20px;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
        "
      >
        <v-btn
          icon="mdi mdi-cog"
          size="small"
          class="mr-2"
          color="#5F3B39"
        ></v-btn>

        <v-badge dot color="#FF6259">
          <v-btn icon="mdi mdi-bell" size="small" color="#5F3B39"></v-btn>
        </v-badge>
      </v-div> -->
    </v-navigation-drawer>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
const links = [
  { text: "Dashboard", icon: "mdi mdi-view-dashboard", path: "/dashboard" },
  { text: "Orders", icon: "mdi mdi-phone-classic", path: "/orders" },
  {
    text: "Restaurants",
    icon: "mdi mdi-map-marker-radius",
    path: "/restaurants",
  },
  { text: "Finance", icon: "mdi mdi-finance", path: "/finance" },
];

const drawer = ref(null);
</script>

<script>
export default {
  name: "SideBar",
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
};
</script>
<style scoped>
.v-list-item.v-list-item--active.v-list-item--link.border
  .v-theme--light.text-red.v-list-item--density-default.v-list-item--one-line.v-list-item--variant-text {
  color: white !important;
}
.top {
  margin-top: 40px;
}
.me {
  position: absolute;
  margin-top: 28px;
}
.v-locale--is-ltr .rounded-e-xl {
  border-top-right-radius: 44px !important;
  border-bottom-right-radius: 44px !important;
}
.a {
  top: 32%;
  left: 20.5%;
  position: absolute;
  height: 15px;
  width: 15px;
  background: linear-gradient(-90deg, #545454, #545454 50%, black 50%);
  border-radius: 50%;
}
.link-sidebar {
  text-decoration: none;
  color: inherit;
}
</style>
