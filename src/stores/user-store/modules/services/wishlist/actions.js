import axios from "axios";

export const actions = {
    async FetchWishlist({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            await commit('Set_Wishlist', wishlist);
        }
        catch (error) {
            console.error("Axios Error : ", error);
        }
    },
    async AddToWishlist({ dispatch }, AddedItem) {
        try {
            // if (localStorage.getItem('user') !== 'customer') {
            let updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            updatedWishlist.push(AddedItem);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            // }

            await dispatch('FetchWishlist');
        }
        catch (error) {
            console.error("Axios Error : ", error);
        }
    },
    async RemoveWishItem({ dispatch }, id) {
        try {
            const updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const deletedIndex = updatedWishlist.findIndex(item => item._id === id);

            if (deletedIndex !== -1) {
                updatedWishlist.splice(deletedIndex, 1);
            }
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            await dispatch('FetchWishlist');
        } catch (err) {
            console.error('Axios Error', err.message);
        }
    }
}
