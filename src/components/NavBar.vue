<template>
  <v-app-bar app color="#f2f2f2" :align="$vuetify.locale.isRtl ? 'right' : 'left'" class="navbar" flat>
    <!-- <template v-if="$vuetify.display.smAndUp"> -->
    <v-toolbar-title>
      <strong>{{ $t("title") }}</strong>
    </v-toolbar-title>
    <!-- <v-spacer></v-spacer> -->
    <div v-if="$vuetify.display.smAndUp" class="route-links-container">
      <v-btn v-for="route in router.getRoutes()" v-show="showRoute(route) && !!route.name" :key="route.name"
        :color="route.name === router.currentRoute.value.name ? 'primary' : ''" :to="route.path" variant="elevated"
        active-class="no-active" flex-grow>
        {{ $t("routes." + route.name?.toString()) }}
      </v-btn>
    </div>
    <v-spacer v-for="i in 3" :key="i"></v-spacer>
    <div>
      <v-toolbar-items>
        <!-- <div class="d-flex align-center" v-if="isLoggedIn">
            <v-icon class="mx-1">mdi-account</v-icon>
            {{ $t("salutation") }} {{ userStore.userId }}
          </div>
          <div class="d-flex align-center mx-3" v-if="isLoggedIn">
            <v-icon @click="showUserInfo">mdi-information</v-icon>
          </div> -->
        <language-selection :class="isLoggedIn ? '' : $vuetify.locale.isRtl ? 'rtl' : 'ltr'" class="me-4" />
        <!-- <div class="d-flex align-center mx-3" v-if="isLoggedIn">
            <v-icon @click="$emit('logout')">mdi-logout</v-icon>
          </div> -->
      </v-toolbar-items>
    </div>
    <!-- </template> -->

    <!-- <template v-else>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template> -->
  </v-app-bar>

  <!-- <v-navigation-drawer v-model="drawer" app temporary>
    <v-toolbar-title>
      <strong>{{ $t("title") }}</strong>
    </v-toolbar-title>
    <v-divider></v-divider>
    <div class="route-links-container">
      <v-btn v-for="route in router.getRoutes()" v-show="showRoute(route) && !!route.name" :key="route.name"
        :color="route.name === router.currentRoute.value.name ? 'primary' : ''" :to="route.path" variant="elevated"
        active-class="no-active" block>
        {{ $t("routes." + route.name?.toString()) }}
      </v-btn>
    </div>
    <v-divider></v-divider>
    <language-selection class="my-4" />
  </v-navigation-drawer> -->
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import LanguageSelection from './LanguageSelection.vue';

const drawer = ref(false);

const router = useRouter();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import Swal from 'sweetalert2'

type details = {
  name: string,
  phone: string,
}

const props = defineProps<{ personalDetails: details }>();

const allowedRoutes = ['home', 'login', 'register'];

const isLoggedIn = computed(() => userStore.userId !== undefined);

const showRoute = (route: any): boolean => {
  return isLoggedIn.value
    ? !allowedRoutes.includes(route.name) || route.name === 'home'
    : allowedRoutes.includes(route.name);
};

const encodeHTML = (str: string): string => {
  var elem = document.createElement("div");
  elem.innerText = str;
  return elem.innerHTML;
};

const showUserInfo = () => {
  let details = "";
  Object.entries(props.personalDetails).forEach(([key, value]) => {
    details += t("details." + key) + ": " + encodeHTML(value as string) + "<br />";
  });
  Swal.fire({
    title: t("details.title"),
    html: '<pre class="swal2-modal">' + details + '</pre>',
    icon: "info",
    confirmButtonText: t("ok"),
  });
};
</script>
<style scoped>
.navbar {
  background-color: #f2f2f2;
  /*#f8f9fa;*/
}

.route-links-container {
  display: flex;
  justify-content: space-evenly;
  flex-grow: 0.5 !important;
  min-width: 10% !important;
  max-width: 40% !important;
}

.v-toolbar-title {
  flex-grow: 0.8;
  flex-shrink: 0.8;
  min-width: max-content !important;
}
</style>