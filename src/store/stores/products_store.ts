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
        DELETE_PRODUCT(state: IProductsStore, product_id: string) {
            state.products = state.products.filter((product: IProduct) => product.id !== product_id)
            state.count = state.count - 1
        },
        SET_COUNT(state: IProductsStore, count: number) {
            state.count = count
        }
    },
    actions: {
        updateProducts({ commit }: { commit: Commit }, products: IProduct[]) {
            commit('SET_PRODUCTS', products)
        },
        deleteProduct({ commit }: { commit: Commit }, product_id: string) {
            commit('DELETE_PRODUCT', product_id)
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
