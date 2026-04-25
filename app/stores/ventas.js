import { defineStore } from "pinia";

export const useVentas = defineStore("ventas", {
  state: () => ({
    ventas: useCookie("cart_items", { default: () => [], watch: true }),
    modalAbierto: false,
    panelAbierto: false, // ← nuevo
    productoSeleccionado: null,
  }),

  getters: {
    ventasall: (state) => state.ventas,
    totalItems: (state) =>
      state.ventas.reduce((acc, item) => acc + item.cantidad, 0),
    totalPrecio: (state) =>
      state.ventas.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
  },

  actions: {
    solicitarCompra(producto) {
      this.productoSeleccionado = producto;
      this.modalAbierto = true;
    },

    cancelarCompra() {
      this.modalAbierto = false;
      this.productoSeleccionado = null;
    },

    confirmarCompra() {
      if (!this.productoSeleccionado) return;
      const existe = this.ventas.find(
        (item) => item.id === this.productoSeleccionado.id,
      );
      if (existe) {
        existe.cantidad++;
      } else {
        this.ventas.push({ ...this.productoSeleccionado, cantidad: 1 });
      }
      this.ventas = [...this.ventas]; // Forzar actualización de la cookie
      this.cancelarCompra();
    },

    // Aumentar cantidad desde el panel
    aumentar(productoId) {
      const item = this.ventas.find((i) => i.id === productoId);
      if (item) {
        item.cantidad++;
        this.ventas = [...this.ventas];
      }
    },

    // Disminuir — si llega a 0 se elimina
    disminuir(productoId) {
      const item = this.ventas.find((i) => i.id === productoId);
      if (!item) return;
      if (item.cantidad > 1) {
        item.cantidad--;
        this.ventas = [...this.ventas];
      } else {
        this.eliminar(productoId);
      }
    },

    eliminar(productoId) {
      this.ventas = this.ventas.filter((item) => item.id !== productoId);
    },

    vaciarCarrito() {
      this.ventas = [];
    },

    abrirPanel() {
      this.panelAbierto = true;
    },

    cerrarPanel() {
      this.panelAbierto = false;
    },
  },
});
