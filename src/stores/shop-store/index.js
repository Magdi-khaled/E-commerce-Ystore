import { createStore } from "vuex";
import module1 from './modules/product/index';
const store = {
    namespace: true,
    modules: {
        module1,
    },
}
export default store;
