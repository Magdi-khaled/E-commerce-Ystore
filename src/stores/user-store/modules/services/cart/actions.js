import axios from "axios";

export const actions = {
    async FetchCartItems({ commit }) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            const cartItems =
                [
                    {
                        id: 1,
                        title: 'Gradient Graphic T-Shirt',
                        imgSrc: '/assets/shop/product11.webp',
                        size: 'M',
                        color: 'Red',
                        price: 145,
                        quantity: 1
                    },
                    {
                        id: 2,
                        title: 'Gradient Graphic T-Shirt 2',
                        imgSrc: '/assets/shop/product18.webp',
                        size: 'L',
                        color: 'Green',
                        price: 240,
                        quantity: 1
                    },
                ];
            await commit('Set_CartItems', cartItems);
        }
        catch (error) {
            console.error("Fetching Cart Items Error : ", error);
        }
    },
    async addItemToCart({ commit, dispatch }, cartItem) {
        try {
            // const response = await axios.get('https://api.example.com/products');
            // const existingItem = cart.find(item => item.id === cartItem.id);
            // if (existingItem) {
            //     console.log(cart[existingItem.id - 1]);
            //     cart[existingItem.id - 1].quantity++;
            // }
            // else {
            // this.state.cartItems.push(cartItem);
            // }
            // cart.push(cartItem);
            // await commit('Set_CartItems', this.state.cartItems);
            dispatch('FetchCartItems');
        }
        catch (error) {
            console.error("Fetching Cart Items Error : ", error);
        }
    }
}
