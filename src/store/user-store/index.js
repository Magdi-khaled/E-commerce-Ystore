import { createStore } from "vuex";
import module1 from './modules/auth/index';
import module2 from './modules/services/cart/index';
import module3 from './modules/services/profile/index';
const store = {
    namespace: true,
    modules: {
        module1,
        module2,
        module3,
    },
}
export default store;
