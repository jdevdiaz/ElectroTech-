import { defineStore } from "pinia";

export const useProductosStore = defineStore("productos", {
  state: () => ({
    // El estado inicial es vacío (el camión no ha llegado)
    productos: [],
    loading: false, // Para mostrar un spinner o mensaje de "Cargando"
  }),

  actions: {
    /**
     * Simula la llegada de datos desde un servidor.
     * Aquí es donde "llenamos los estantes".
     */
    async fetchProductos() {
      this.loading = true;
      try {
        // Simulamos una demora de red de 1 segundo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Aquí defines tus productos con los datos que tengas
        this.productos = [
          {
            id: 1,
            nombre: "Laptop Gamer Xtreme", // De tus reportes de ventas
            precio: 3500000,
            imagen: "/assets/images/products/product1.jpg", // Ruta de tu plantilla
            descripcion: "Alto rendimiento para ingenieros.",
          },
          {
            id: 2,
            nombre: "Mouse Óptico",
            precio: 50000,
            imagen: "/assets/images/products/product2.jpg",
            descripcion: "Precisión total.",
          },
        ];
      } finally {
        this.loading = false;
      }
    },
  },
});
