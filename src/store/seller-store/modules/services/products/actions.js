import axios from "axios";
import inventoryProducts from '../../../../../assets/db/data.json';

export const actions = {
    async FetchInventory({ commit }) {
        try {
            // const response = await axios.get('/api/inventory');
            const res = inventoryProducts;
            await commit('Set_Inventory', res)
        } catch (err) {
            console.error(err);
        }
    },
    async AddProduct({ commit }, product) {
        try {
            const newInventory = inventoryProducts;
            newInventory.push(product);
            await commit('Set_Inventory', newInventory)
        } catch (err) {
            console.error(err);
        }
    }
    // 3 - edit product
    // 4 - delete product
}
