import axios from "axios";
import products from '../../../../composables/data.js'
export const actions = {
    async FetchProducts({ commit }) {
        try {
            // const res = await axios.get('http://localhost:3000/getproducts');
            const data = products;
            await commit('Set_Products', data);
        }
        catch (error) {
            console.error("Axios Error: ", error);
        }
    },
    async FetchNBProduvts({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const newProducts = products.slice(27, 31).reverse();
            const bestSellers = products.slice(27, 31);
            await commit('Set_NewProducts', newProducts);
            await commit('Set_BestSellers', bestSellers);
        }
        catch (error) {
            console.error("Axios Error: ", error);
        }
    },
}
