import { createStore } from "vuex";
import user_module from "./modules/user-module/index"
import shop_module from "./modules/shop-module/index"

const store = createStore({
    namespace: true,
    modules: {
        user_module,
        shop_module
    }
})
export default store;