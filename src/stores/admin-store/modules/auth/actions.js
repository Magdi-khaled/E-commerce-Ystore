import axios from "axios";

export const actions = {
    async ADLogin({ commit }, { email, password }) {
        try {
            const user = new FormData();
            user.append('email', email);
            user.append('password', password);

            console.log('LoggedIn User', user);
            // const response = await axios.post('http://localhost:4000/api/users/login',
            //     user);
            // console.log('loggedin');
            // const user = response.data.data.User;
            // console.log(user);

            localStorage.setItem('user', 'Admin');
            // commit('Set_User', user);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async ADLogout({ commit }) {
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
