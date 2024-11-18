// src/store/store.ts
import { createStore } from "vuex";

export interface State {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null; // Agrega userId al estado
}

const store = createStore<State>({
  state: {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"), // Si se guarda en localStorage
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
    getUserId(state): string | null {
      return state.userId;
    },
  },
  mutations: {
    SET_AUTH(state, { token, userId }: { token: string; userId: string }) {
      state.isAuthenticated = true;
      state.token = token;
      state.userId = userId; // Guarda el userId en el estado
      localStorage.setItem("token", token); // Guarda el token en localStorage
      localStorage.setItem("userId", userId); // Guarda el userId en localStorage
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null; // Limpia el userId al hacer logout
      localStorage.removeItem("token"); // Elimina el token de localStorage
      localStorage.removeItem("userId"); // Elimina el userId de localStorage
    },
  },
  actions: {
    login({ commit }, { token, userId }: { token: string; userId: string }) {
      commit("SET_AUTH", { token, userId });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
});

export default store;
