import { createApp } from 'vue'

// AOS - Fading
import AOS from 'aos';
import 'aos/dist/aos.css';

// Main System Files
import router from "./routes/index";
import store from "./stores/index";
import App from './App.vue'
import './assets/css/main.css'

// Global Components
import Pagination from './components/Pagination.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';

// UISlider 
import 'nouislider/dist/nouislider.css';

const app = createApp(App);
app.use(router);
app.use(store);

// Call Global Components
app.component("Pagination", Pagination);
app.component("Breadcrumbs", Breadcrumbs);
// Call AOS
AOS.init({
    duration: 1000,
    once: true,
});

app.mount("#app");

