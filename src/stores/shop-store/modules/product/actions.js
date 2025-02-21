import axios from "axios";
import data from '../../../../assets/db/data.json'
export const actions = {
    async FetchProducts({ commit }) {
        try {
            // const res = await axios.get('http://localhost:3000/getproducts');
            const products = data;
            // console.log(products);
            await commit('Set_Products', products);
            // await commit('Set_Products', res.data);
        }
        catch (error) {
            console.error("Fetching Products error: ", error);
        }
    },
    async FetchNBProduvts({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const newProducts = [
                {
                    src: "/assets/shop/product5.webp",
                    title: 't-shirt with tape details',
                    rate: 4.5,
                    price: 120,
                    sale: 0.0,
                },
                {
                    src: "/assets/shop/product7.webp",
                    title: 'skinny fit jeans',
                    rate: 3.5,
                    price: 240,
                    sale: 0.2,
                },
                {
                    src: "/assets/shop/product18.webp",
                    title: 'checkered shirt',
                    rate: 3.0,
                    price: 180,
                    sale: 0.0,
                },
                {
                    src: "/assets/shop/product10.webp",
                    title: 'sleeve striped t-shirt',
                    rate: 4.0,
                    price: 130,
                    sale: 0.3,
                }
            ];
            const bestSellers = [
                {
                    src: "/assets/shop/product11.webp",
                    title: 'vertical striped shirt',
                    rate: 3.5,
                    price: 212,
                    sale: 0.2,
                },
                {
                    src: "/assets/shop/product12.webp",
                    title: 'courage graphic t-shirt',
                    rate: 4.0,
                    price: 145,
                    sale: 0.0,
                },
                {
                    src: "/assets/shop/product7.webp",
                    title: 'loose fit bermuda shorts',
                    rate: 3.0,
                    price: 80,
                    sale: 0.0,
                },
                {
                    src: "/assets/shop/product15.webp",
                    title: 'faded skinny jeans',
                    rate: 4.5,
                    price: 210,
                    sale: 0.50,
                }
            ];
            await commit('Set_NewProducts', newProducts);
            await commit('Set_BestSellers', bestSellers);
        }
        catch (error) {
            console.error("Fetching Main Products error: ", error);
        }
    },
}
