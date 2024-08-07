/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Login from "../pages/Login.vue";
import SignUp from "../pages/SignUp.vue";
import Menu from "../pages/Menu.vue";
import PrintPDF from "../pages/PrintPdf.vue";
import PreviewPage from "../pages/PreviewPDF.vue";
import Protected from "../components/Protected.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/print-pdf",
    name: "PrintPDF",
    component: PrintPDF,
  },
  {
    path: "/preview/:pdfUrl",
    name: "PreviewPage",
    component: PreviewPage,
  },
  {
    path: "/proteted",
    // name: "About",
    // component: About,
    name: "Protected",
    component: Protected,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/* router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.name !== 'Login' && to.name !== 'SignUp' && !token) next({ name: 'Login' });
  else next();
}); */

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
