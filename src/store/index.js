import { createStore } from "vuex";
import user_module from "./user-store/index"
import seller_module from "./seller-store/index"
import shop_module from "./shop-store/index"

const store = createStore({
    namespace: true,
    modules: {
        user_module,
        seller_module,
        shop_module
    }
})
export default store;