// src/store/store.d.ts
import { Store } from "vuex";
import { State } from "./store"; // Importar el tipo del estado si es necesario

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>; // Asegura que el store es del tipo adecuado
  }
}
