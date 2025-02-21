import { createStore } from "vuex";
import module1 from './modules/auth/index';
import module2 from './modules/services/cart/index';
import module3 from './modules/services/profile/index';
import module4 from './modules/services/wishlist/index';
const store = {
    namespace: true,
    modules: {
        module1,
        module2,
        module3,
        module4,
    },
}
export default store;
