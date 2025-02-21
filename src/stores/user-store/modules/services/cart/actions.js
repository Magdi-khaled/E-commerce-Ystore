import axios from "axios";

export const actions = {
    async FetchCartItems({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            await commit('Set_CartItems', cartItems);
        }
        catch (error) {
            console.error("Axios Error : ", error);
        }
    },
    async AddItemToCart({ dispatch }, AddedItem) {
        try {
            // if (localStorage.getItem('user') !== 'customer') {
            let updatedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existItem = updatedCart.find(v => v._id === AddedItem._id);
            console.log(existItem);
            if (existItem) {
                const index = updatedCart.findIndex(v => v == existItem);
                updatedCart[index].orderQuantity++;
            }
            else updatedCart.push({ ...AddedItem, orderQuantity: 1 });

            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            await dispatch('FetchCartItems');
        }
        catch (error) {
            console.error("Axios Error : ", error);
        }
    },
    async RemoveCartItem({ dispatch }, id) {
        try {
            const updatedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            const deletedIndex = updatedCart.findIndex(item => item._id === id);

            if (deletedIndex !== -1) {
                updatedCart.splice(deletedIndex, 1);
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            await dispatch('FetchCartItems');
        } catch (err) {
            console.error('Axios Error', err.message);
        }
    }
}
