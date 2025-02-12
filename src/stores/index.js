import { createStore } from "vuex";
import user_module from "./user-store/index"
import ad_module from "./admin-store/index"
import shop_module from "./shop-store/index"

const store = createStore({
    namespace: true,
    modules: {
        user_module,
        ad_module,
        shop_module
    }
})
export default store;