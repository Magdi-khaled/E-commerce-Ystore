import axios from "axios";

export const actions = {
    async FetchCartItems({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const cartItems =
                [
                    {
                        title: 'Gradient Graphic T-Shirt',
                        imgSrc: '/assets/new-arrivals/na-img-1.png',
                        size: 'Medium',
                        color: 'Red',
                        price: 145,
                        quantity: 1
                    },
                    {
                        title: 'Gradient Graphic T-Shirt 2',
                        imgSrc: '/assets/new-arrivals/na-img-3.png',
                        size: 'Large',
                        color: 'Green',
                        price: 240,
                        quantity: 2
                    },
                    {
                        title: 'vertical T-Shirt',
                        imgSrc: '/assets/new-arrivals/na-img-4.png',
                        size: 'Large',
                        color: 'Green',
                        price: 165,
                        quantity: 1
                    },
                ];
            await commit('Set_CartItems', cartItems);
        }
        catch (error) {
            console.error("Fetching Cart Items Error : ", error);
        }
    },
    async AddItemToCart({ commit, dispatch }, cartItem) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const cart = this.state.cartItems;
            const existingItem = cart.find(item => item.id === cartItem.id);
            if (existingItem) {
                return
            }
            cart.push(cartItem);
            await commit('Set_CartItems', cart);
            dispatch('FetchCartItems');
        }
        catch (error) {
            console.error("Fetching Cart Items Error : ", error);
        }
    }
}
