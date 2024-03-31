import { Commit } from "vuex"
import { IProduct, IProductsStore } from "../../interfaces/interfaces"

export default {
    state: {
        products: [],
        count: 0
    },
    mutations: {
        SET_PRODUCTS(state: IProductsStore, products: IProduct[]) {
            state.products = products
        },
        SET_COUNT(state: IProductsStore, count: number) {
            state.count = count
        }
    },
    actions: {
        updateProducts({ commit }: { commit: Commit }, products: IProduct[]) {
            commit('SET_PRODUCTS', products)
        },
        updateCount({ commit }: { commit: Commit }, count: number) {
            commit('SET_COUNT', count)
        }
    },
    getters: {
        products: (state: IProductsStore) => state.products,
        count: (state: IProductsStore) => state.count
    }
}
