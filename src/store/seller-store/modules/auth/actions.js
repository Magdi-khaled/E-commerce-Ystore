import axios from "axios";

export const actions = {
    async sellerLogin({ commit }, { email, password }) {
        try {
            const data = new FormData();
            data.append('email', email);
            data.append('password', password);
            const response = await axios.post('http://localhost:4000/api/users/login',
                data);
            console.log('loggedin');
            const user = response.data.data.User;
            console.log(user);

            localStorage.setItem('token', user.token);
            // commit('Set_User', user);
            // commit('Set_Token', user.token);
        } catch (error) {
            console.error(error);
        }
    },
    async sellerLogout({ commit }) {
        try {
            console.log('loggedOut...');
            localStorage.removeItem('token');
            // commit('Set_User', null);
            // commit('Set_Token', null);
        } catch (error) {
            console.error(error);
        }
    },
}
