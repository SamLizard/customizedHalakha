import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import HalakhaView from "@/views/HalakhaView.vue";
// import LoginView from "../views/LoginView.vue";
// import RegisterView from "../views/RegisterView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/halakha/:id",
    name: "halakha",
    component: HalakhaView,
    props: true,
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: LoginView,
  // },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: RegisterView,
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top when navigating to a new route
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (window._paq && to.name === 'halakha' && to.params.id) {
    const id = to.params.id;
    window._paq.push(['setCustomUrl', window.location.href]);
    window._paq.push(['setDocumentTitle', `Halakha View - ID: ${id}`]);
    window._paq.push(['trackPageView']);
  }
  next();
});

export default router;
