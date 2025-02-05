import { createApp } from 'vue'
import './assets/style.css'
// 
import AOS from 'aos';
import 'aos/dist/aos.css';
// 
import router from "./routes/index";
import store from "./store/index";
import App from './App.vue'
// 
import Pagination from './components/Pagination.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';
//
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';

import 'nouislider/dist/nouislider.css';
// 
import { configure, defineRule, Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
// 
// Define validation rules globally
defineRule('required', (value) => {
    if (!value || !value.length) {
        return 'This field is required';
    }
    return true;
});

defineRule('min', (value, [limit]) => {
    if (value.length < limit) {
        return `Must be at least ${limit} characters`;
    }
    return true;
});

// Global configuration
configure({
    generateMessage: ({ field, rule }) => `${field} is invalid (${rule})`,
    validateOnInput: true, // Validate as user types
});

const app = createApp(App);

app.use(router);
app.use(store);

// Register VeeValidate Components Globally
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);


// Global Components
app.component("Pagination", Pagination);
app.component("Breadcrumbs", Breadcrumbs);
AOS.init({
    duration: 1000, // Animation duration (default: 400ms)
    once: true,     // Run only once (default: false)
});
app.mount("#app");

