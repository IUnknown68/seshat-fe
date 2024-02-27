import AboutPage from './pages/AboutPage.vue';
import PrivacyPage from './pages/PrivacyPage.vue';

import MainLayoutFooter from './components/MainLayoutFooter.vue';

export default {
  routes: [
    {
      path: 'about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: 'privacy',
      name: 'privacy',
      component: PrivacyPage,
    },
  ],
  footer: MainLayoutFooter,
};
