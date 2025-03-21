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
            let updatedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const existItem = updatedWishlist.find(v => v._id === AddedItem._id);
            if (existItem) {
                const index = updatedWishlist.findIndex(v => v === existItem);
                updatedWishlist.splice(index, 1);
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                await dispatch('FetchWishlist');
                return true;
            }
            else updatedWishlist.push(AddedItem);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            await dispatch('FetchWishlist');
            return false;
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
