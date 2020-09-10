import { createRouter, createWebHistory  } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from "../views/Tabs.vue";
import useFirebaseAuth from "../hooks/firebase-auth";
const state = useFirebaseAuth();



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "tabs-list",
    redirect:  '/tabs/list'
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/image-detail/:url",
    component: () => import("@/views/ImageDetail.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "list",
      },
      {
        path: "upload",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "list",
        component: () => import("@/views/AllUploads.vue"),
      },
      {
        path: "geolocation",
        component: () => import("@/views/Geolocation.vue"),
      },
    ],
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log("user",state.user.value);
  if (state.user.value && (to.name === 'login')) {
    next({ name: "tabs-list", replace: true });
  } else if (!state.user.value && (to.name !== 'login')) {
    next({ name: "login", replace: true });
  } else {
    next();
  }
})

export default router
