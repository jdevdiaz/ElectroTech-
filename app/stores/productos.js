import { defineStore } from "pinia";
import productosData from "../data/productos.json";

export const useStore = defineStore("productos", {
  state: () => ({
    productos: [],
    loading: false,
    error: null,
    searchQuery: "",
    categoriaSeleccionada: null,
  }),

  getters: {
    productosall: (state) => {
      let result = state.productos;
      
      if (state.categoriaSeleccionada) {
        result = result.filter(p => p.categoria === state.categoriaSeleccionada);
      }
      
      if (state.searchQuery) {
        const lower = state.searchQuery.toLowerCase();
        result = result.filter((p) => p.nombre.toLowerCase().includes(lower));
      }
      
      return result;
    },
  },

  actions: {
    setCategoria(categoria) {
      if (this.categoriaSeleccionada === categoria) {
        this.categoriaSeleccionada = null; // Toggle off if clicked again
      } else {
        this.categoriaSeleccionada = categoria;
      }
    },

    async fetchProductos() {
      this.loading = true;
      this.error = null;

      try {
        // Simulamos una llamada a API con setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1200));

        this.productos = productosData;
      } catch (e) {
        this.error = "No se pudieron cargar los productos.";
      } finally {
        this.loading = false;
      }
    },
  },
});
