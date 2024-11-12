// src/store/store.ts
import { createStore } from "vuex";

export interface State {
  isAuthenticated: boolean;
  token: string | null;
}

const store = createStore<State>({
  state: {
    isAuthenticated: false,
    token: null,
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
  },
  mutations: {
    SET_AUTH(state, token: string) {
      state.isAuthenticated = true;
      state.token = token;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  actions: {
    login({ commit }, token: string) {
      commit("SET_AUTH", token);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
});

export default store;
