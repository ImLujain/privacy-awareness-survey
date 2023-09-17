import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import SurveyPage from '../components/SurveyPage.vue';
import FingerprintPage from '../components/FingerprintPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/survey',
    name: 'SurveyPage',
    component: SurveyPage,
  },
  {
    path: '/fingerprint',
    name: 'FingerprintPage',
    component: FingerprintPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
