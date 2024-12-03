import { createApp } from 'vue'
import './assets/style.css'

import AOS from "aos";
import router from "./routes/index";
import store from "./store/index";
import App from './App.vue'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';

import 'nouislider/dist/nouislider.css';



const app = createApp(App);
app.use(router);
app.use(store);

AOS.init();

app.mount("#app");

