import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { surveyPlugin } from 'survey-vue3-ui';
import 'bootstrap/dist/css/bootstrap.css'



createApp(App).use(router)
.use(surveyPlugin)
.mount('#app')





