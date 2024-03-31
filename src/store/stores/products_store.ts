import { Commit } from "vuex"
import { IProduct, IProductsStore } from "../../interfaces/interfaces"

export default {
    state: {
        products: [],
    },
    mutations: {
        SET_PRODUCTS(state: IProductsStore, products: IProduct[]) {
            state.products = products
        },
    },
    actions: {
        updateProducts({ commit }: { commit: Commit }, products: IProduct[]) {
            commit('SET_PRODUCTS', products)
        }
    },
    getters: {
        products: (state: IProductsStore) => state.products,
    }
}
