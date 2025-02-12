import axios from "axios";
import inventoryProducts from '../../../../../assets/db/data.json';

export const actions = {
    async FetchInventory({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/getproducts');
            await commit('Set_Inventory', response.data);
        } catch (err) {
            console.error("Axios Error:", err);
        }
    },
    async AddProduct({ commit, dispatch }, product) {
        try {
            const response = await axios.post('http://localhost:3000/addproduct', product);

            if (response.status !== 200) {
                console.error("Failed to add product:", response);
                return;
            }
            console.log("Product added:", response.data);
            await dispatch('FetchInventory');
        } catch (err) {
            console.error("Axios Error:", err);
        }
    },
    async EditProduct({ commit }, product) {
        try {
            const response = await axios.patch('http://localhost:3000/editproduct', product);
            if (response.status !== 200) {
                console.error("Failed to add product:", response);
                return;
            }
            console.log("Product Updated:", response.data);
            await dispatch('FetchInventory');
        } catch (err) {
            console.error("Axios Error:", err);
        }
    }
    // 4 - delete product
}
