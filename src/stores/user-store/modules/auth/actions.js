import axios from "axios";

export const actions = {
    async UserLogin({ commit }, { email, password }) {
        try {
            const user = new FormData();
            user.append('email', email);
            user.append('password', password);

            console.log('LoggedIn User', user);
            localStorage.setItem('user', 'customer');
            // const response = await axios.post('http://localhost:4000/api/users/login',
            //     user);
            // const user = response.user.user.User;

            console.log('loggedin');
            // console.log('USER : ', user);
            // commit('Set_User', user);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async UserLogout({ commit }) {
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
