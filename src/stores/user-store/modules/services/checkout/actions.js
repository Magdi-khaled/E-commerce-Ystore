import axios from "axios";

export const actions = {
    async checkout({ commit },) {
        try {
            const response = await axios.post('http://localhost:4000/api/users/login',
                data);
            console.log('checkingout...');

            // commit('Set_User', user);
            // commit('Set_Token', user.token);
        } catch (error) {
            console.error(error);
        }
    },
}
