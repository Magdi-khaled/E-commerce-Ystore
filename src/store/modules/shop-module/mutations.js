export const mutations = {
    Set_Products(state, products) {
        state.products = products;
    },
    Set_NewProducts(state, newProducts) {
        state.newProducts = newProducts;
    },
    Set_BestSellers(state, bestSellers) {
        state.bestSellers = bestSellers;
    }
}