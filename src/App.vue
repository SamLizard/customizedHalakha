<template>
  <v-app fluid>
    <nav-bar @logout="logout" :key="$router.currentRoute.value.fullPath" :personal-details="personalDetails" />
    <v-main fluid class="mt-sm-0 mt-md-4 mt-lg-8">
      <router-view :key="$router.currentRoute.value.fullPath" @connected="setPersonalDetails" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
import { useRouter } from 'vue-router';
const router = useRouter();

type details = {
  name: string,
  phone: string,
}

let personalDetails: details = {} as details;
// personalDetails = {
//   name: "Sam",
//   phone: "065666666",
// };

// onMounted(() => {
//   userStore.changeUserId("sam")
// });

const setPersonalDetails = (details: details | {}): void => {
  personalDetails = details as details;
}

const logout = (): void => {
  userStore.changeUserId(undefined);
  setPersonalDetails({});

  if (router.currentRoute.value.path !== '/login') {
    router.push('/login');
  }
}

import { watch } from 'vue';
import { useRtl } from 'vuetify';
const { isRtl } = useRtl();

watch(isRtl, (newRtl) => {
  document.documentElement.style.setProperty('--swal-direction', newRtl ? 'rtl' : 'ltr');
})
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
} */

nav a.router-link-exact-active {
  color: #42b983;
}

:root {
  --swal-direction: ltr;
}

.swal2-container {
  direction: var(--swal-direction);
}

.swal2-modal {
  font-family: "roboto", sans-serif;
}

.component {
  background-color: white;
  border-radius: 15px;
  box-shadow: 6px 3px 13px 0px #aaaaaaa1;
}

.fill-height {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
