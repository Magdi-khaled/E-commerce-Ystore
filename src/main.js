import { createApp } from 'vue'
import './assets/style.css'

// import AOS from "aos";
import router from "./routes/index";
import store from "./store/index";
import App from './App.vue'

import pagination from './components/pagination.vue';
import breadcrumbs from './components/breadcrumbs.vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';

import 'nouislider/dist/nouislider.css';



const app = createApp(App);
app.use(router);
app.use(store);

app.component("pagination", pagination);
app.component("breadcrumbs", breadcrumbs);
// AOS.init();

app.mount("#app");

