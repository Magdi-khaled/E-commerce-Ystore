import axios from "axios";

export const actions = {
    async userLogin({ commit }, { email, password }) {
        try {
            const data = new FormData();
            data.append('email', email);
            data.append('password', password);
            localStorage.setItem('user', 'customer');
            const response = await axios.post('http://localhost:4000/api/users/login',
                data);
            const user = response.data.data.User;
            localStorage.setItem('token', user.token);
            console.log('loggedin');
            console.log('USER : ', user);
            commit('Set_User', user);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async userLogout({ commit }) {
        try {
            console.log('loggedOut...');
            localStorage.removeItem('token');
            localStorage.setItem('user', '');
            commit('Set_User', null);
        } catch (error) {
            console.error(error);
        }
    },
}
