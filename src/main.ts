import '@mdi/font/css/materialdesignicons.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './router/router';
import vuetify from './plugins/vuetify';

import App from './App.vue';
import i18n from './plugins/i18n';

import VueMatomo from 'vue-matomo';
const app = createApp(App)

app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(VueMatomo, {
  host: 'https://customizedhalakha.matomo.cloud/',
  siteId: 1,
  router: router, // Enables automatic page tracking
  enableLinkTracking: true,
  requireConsent: false,
  trackInitialView: true,
  debug: false,
});

app.use(i18n);
app.mount('#app');
window._paq.push(['trackPageView']); // Pour suivre les visites sur vos pages