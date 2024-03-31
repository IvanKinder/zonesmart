import { Commit } from "vuex"
import { IAuthStore } from "../../interfaces/interfaces"
import Cookies from 'js-cookie'

export default {
    state: {
        access: Cookies.get('access'),
        refresh: Cookies.get('refresh')
    },
    mutations: {
        SET_ACCESS(state: IAuthStore, access: string) {
        state.access = access
        },
        SET_REFRESH(state: IAuthStore, refresh: string) {
        state.refresh = refresh
        }
    },
    actions: {
        updateAccess({ commit }: { commit: Commit }, access: string) {
        commit('SET_ACCESS', access)
        Cookies.set('access', access, { expires: 1 })
        },
        updateRefresh({ commit }: { commit: Commit }, refresh: string) {
        commit('SET_REFRESH', refresh)
        Cookies.set('refresh', refresh, { expires: 1 })
        }
    },
    getters: {
        access: (state: IAuthStore) => state.access,
        refresh: (state: IAuthStore) => state.refresh
    }
}
