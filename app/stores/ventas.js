import { defineStore } from "pinia";

export const useVentasStore = defineStore("ventas", {
  state: () => ({
    carrito: [],
    mostrarModal: false, // Controla la ventana emergente de "Compra Exitosa"
    productoReciente: null, // Para saber qué producto mostrar en el modal
  }),

  getters: {
    // Calcula el total automáticamente (Lógica Senior)
    totalPagar: (state) => state.carrito.reduce((acc, p) => acc + p.precio, 0),
    cantidadItems: (state) => state.carrito.length,
  },

  actions: {
    /**
     * Agrega un producto y dispara la interfaz
     */
    agregarAlCarrito(producto) {
      this.carrito.push(producto);
      this.productoReciente = producto;
      this.mostrarModal = true; // <--- Esto activará la ventana emergente

      // Opcional: Cerrar el modal automáticamente tras 3 segundos
      setTimeout(() => {
        this.mostrarModal = false;
      }, 3000);
    },

    cerrarModal() {
      this.mostrarModal = false;
    },
  },
});
