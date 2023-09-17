import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import SurveyPage from '../components/SurveyPage.vue';
import ThankYouPage from '../components/ThankYouPage.vue';

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
    path: '/thankyou',
    name: 'ThankYouPage',
    component: ThankYouPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
