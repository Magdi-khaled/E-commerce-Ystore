import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';


export default {
    namespace: true,
    state() {
        return {
            products: [],
            newProducts: [],
            bestSellers: []
        };
    },
    mutations,
    actions,
    getters,
};