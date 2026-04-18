import { defineStore } from "pinia";

export const useVentas = defineStore("ventas", {
  state: () => ({
    ventas: [],
    modalAbierto: false,
    productoSeleccionado: null,
  }),

  getters: {
    // Todos los items del carrito
    ventasall: (state) => state.ventas,

    // Total de unidades (para el badge del carrito)
    totalItems: (state) => {
      return state.ventas.reduce((acc, item) => acc + item.cantidad, 0);
    },

    // Precio total de la compra
    totalPrecio: (state) => {
      return state.ventas.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0,
      );
    },
  },

  actions: {
    // Abre el modal guardando el producto seleccionado
    solicitarCompra(producto) {
      this.productoSeleccionado = producto;
      this.modalAbierto = true;
    },

    // Cierra el modal y limpia la selección
    cancelarCompra() {
      this.modalAbierto = false;
      this.productoSeleccionado = null;
    },

    // Confirma y agrega al carrito (con lógica de quantity)
    confirmarCompra() {
      if (!this.productoSeleccionado) return;

      const existe = this.ventas.find(
        (item) => item.id === this.productoSeleccionado.id,
      );

      if (existe) {
        // Si ya existe, solo aumentamos la cantidad
        existe.cantidad++;
      } else {
        // Si es nuevo, lo agregamos con cantidad 1
        this.ventas.push({
          ...this.productoSeleccionado,
          cantidad: 1,
        });
      }

      this.cancelarCompra(); // Cierra el modal al confirmar
    },

    // Elimina un producto del carrito
    eliminar(productoId) {
      this.ventas = this.ventas.filter((item) => item.id !== productoId);
    },
  },
});
