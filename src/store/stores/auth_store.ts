import { Commit } from "vuex";
import { IAuthStore } from "../../interfaces/interfaces";

export default {
  state: {
    access: "",
    refresh: ""
  },
  mutations: {
    SET_ACCESS(state: IAuthStore, access: string) {
      state.access = access;
    },
    SET_REFRESH(state: IAuthStore, refresh: string) {
      state.refresh = refresh;
    }
  },
  actions: {
    updateAccess({ commit }: { commit: Commit }, access: string) {
      commit('SET_ACCESS', access);
    },
    updateRefresh({ commit }: { commit: Commit }, refresh: string) {
      commit('SET_REFRESH', refresh);
    }
  },
  getters: {
    access: (state: IAuthStore) => state.access,
    refresh: (state: IAuthStore) => state.refresh
  }
};
