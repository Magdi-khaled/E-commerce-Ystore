import axios from "axios";

export const actions = {
    async fetchProducts({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const products = [
                {
                    id: 1,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 't-shirt with tape details',
                    rate: 4.5,
                    price: 120,
                    sale: 0.0,
                },
                {
                    id: 2,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'skinny fit jeans',
                    rate: 3.5,
                    price: 240,
                    sale: 0.2,
                },
                {
                    id: 3,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'checkered shirt',
                    rate: 3.0,
                    price: 180,
                    sale: 0.0,
                },
                {
                    id: 4,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'sleeve striped t-shirt',
                    rate: 4.0,
                    price: 130,
                    sale: 0.3,
                },
                {
                    id: 5,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'skinny fit jeans',
                    rate: 3.5,
                    price: 240,
                    sale: 0.2,
                },
                {
                    id: 6,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'checkered shirt',
                    rate: 3.0,
                    price: 180,
                    sale: 0.0,
                },
                {
                    id: 7,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'sleeve striped t-shirt',
                    rate: 4.0,
                    price: 130,
                    sale: 0.3,
                },
                {
                    id: 8,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'checkered shirt',
                    rate: 3.0,
                    price: 180,
                    sale: 0.0,
                },
                {
                    id: 9,
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 'sleeve striped t-shirt',
                    rate: 4.0,
                    price: 130,
                    sale: 0.3,
                },
            ];
            await commit('Set_Products', products);
        }
        catch (error) {
            console.error("Fetching Products error: ", error);
        }
    },
    async fetchMainProducts({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const newProducts = [
                {
                    src: '/assets/new-arrivals/na-img-1.png',
                    title: 't-shirt with tape details',
                    rate: 4.5,
                    price: 120,
                    sale: 0.0,
                },
                {
                    src: '/assets/new-arrivals/na-img-2.png',
                    title: 'skinny fit jeans',
                    rate: 3.5,
                    price: 240,
                    sale: 0.2,
                },
                {
                    src: '/assets/new-arrivals/na-img-3.png',
                    title: 'checkered shirt',
                    rate: 3.0,
                    price: 180,
                    sale: 0.0,
                },
                {
                    src: '/assets/new-arrivals/na-img-4.png',
                    title: 'sleeve striped t-shirt',
                    rate: 4.0,
                    price: 130,
                    sale: 0.3,
                }
            ];
            const bestSellers = [
                {
                    src: '/assets/top-selling/ts-img-1.png',
                    title: 'vertical striped shirt',
                    rate: 3.5,
                    price: 212,
                    sale: 0.2,
                },
                {
                    src: '/assets/top-selling/ts-img-2.png',
                    title: 'courage graphic t-shirt',
                    rate: 4.0,
                    price: 145,
                    sale: 0.0,
                },
                {
                    src: '/assets/top-selling/ts-img-3.png',
                    title: 'loose fit bermuda shorts',
                    rate: 3.0,
                    price: 80,
                    sale: 0.0,
                },
                {
                    src: '/assets/top-selling/ts-img-4.png',
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

