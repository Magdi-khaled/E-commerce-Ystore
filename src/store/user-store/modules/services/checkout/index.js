import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';


export default {
    namespace: true,
    state() {
        return {
            recipt: null,
        };
    },
    mutations,
    actions,
    getters,
};