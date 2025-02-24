import axios from "axios";
import data from '../../../../assets/db/data.json'
export const actions = {
    async FetchProducts({ commit }) {
        try {
            // const res = await axios.get('http://localhost:3000/getproducts');
            const products = data;
            await commit('Set_Products', products);
        }
        catch (error) {
            console.error("Axios Error: ", error);
        }
    },
    async FetchNBProduvts({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const newProducts = data.slice(27, 31).reverse();
            const bestSellers = data.slice(27, 31);
            await commit('Set_NewProducts', newProducts);
            await commit('Set_BestSellers', bestSellers);
        }
        catch (error) {
            console.error("Axios Error: ", error);
        }
    },
}
