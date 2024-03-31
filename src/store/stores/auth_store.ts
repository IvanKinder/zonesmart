import { Commit } from "vuex"
import { IAuthStore } from "../../interfaces/interfaces"
import Cookies from 'js-cookie'

export default {
    state: {
        access: Cookies.get('kinder-access'),
        refresh: Cookies.get('kinder-refresh')
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
        Cookies.set('kinder-access', access, { expires: 1 })
        },
        updateRefresh({ commit }: { commit: Commit }, refresh: string) {
        commit('SET_REFRESH', refresh)
        Cookies.set('kinder-refresh', refresh, { expires: 1 })
        }
    },
    getters: {
        access: (state: IAuthStore) => state.access,
        refresh: (state: IAuthStore) => state.refresh
    }
}
