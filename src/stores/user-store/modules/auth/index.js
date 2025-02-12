import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';


export default {
    namespace: true,
    state() {
        return {
            user: null,
            token: null,
        };
    },
    mutations,
    actions,
    getters,
};