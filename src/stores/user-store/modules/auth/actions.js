import axios from "axios";
import emailjs from 'emailjs-com';

export const actions = {
    async UserLogin({ commit }, { email, password }) {
        try {
            // const response = await axios.post('http://localhost:4000/api/users/login',
            //     user);
            // const user = response.user.user.User;
            const user = new FormData();
            user.append('email', email);
            user.append('password', password);

            console.log('LoggedIn User', user);
            localStorage.setItem('user', 'customer');

            console.log('loggedin');
            // console.log('USER : ', user);
            // await commit('Set_User', user);
            return true;
        } catch (error) {
            console.error('Axios Error: ', error);
            return false;
        }
    },
    async UserSignup({ commit }, fname, lname, email, password, repeatpassword) {
        try {
            // const response = await axios.post('http://localhost:4000/api/users/login', user);
            // const user = response.user.user.User;
            const user = new FormData();
            user.append('email', fname);
            user.append('email', lname);
            user.append('email', email);
            user.append('password', password);
            user.append('confirmpassword', repeatpassword);

            console.log('Signed Up - User: ', user);
            // console.log('USER : ', user);
            // await commit('Set_User', user);
            return true;
        } catch (error) {
            console.error('Axios Error: ', error);
            return false;
        }
    },
    async ResetPassword(email, otp) {
        try {
            const serviceID = 'service_iaktjtk';
            const templateID = 'template_nm5nv81';
            const userID = 'y9UDCsdTOdBxPSBum';
            console.log(email);
            console.log(otp);
            // emailjs.send('service_iaktjtk', 'template_nm5nv81', {
            //     to_email: 'test@example.com',
            //     otp: '123456'
            // }, 'y9UDCsdTOdBxPSBum')
            //     .then(response => console.log('Success:', response))
            //     .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Axios Error: ', error);
        }
    },
    async UserLogout({ commit }) {
        try {
            console.log('loggedOut...');
            // localStorage.removeItem('token');
            localStorage.setItem('user', '');
            await commit('Set_User', null);
        } catch (error) {
            console.error('Axios Error: ', error);
        }
    },
}
