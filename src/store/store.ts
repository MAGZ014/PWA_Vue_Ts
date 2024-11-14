// src/store/store.ts
import { createStore } from "vuex";

export interface State {
  isAuthenticated: boolean;
  token: string | null;
}

const store = createStore<State>({
  state: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
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
      localStorage.setItem("token", token); // Guarda el token en localStorage
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token"); // Elimina el token de localStorage
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
