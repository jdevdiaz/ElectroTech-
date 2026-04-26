import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useVentas = defineStore("ventas", () => {
  // Estado persistido con cookie
  // Usamos maxAge para asegurar que la cookie dure más de una sesión
  const ventas = useCookie("cart_items", { 
    default: () => [], 
    watch: true,
    maxAge: 60 * 60 * 24 * 7 // 1 semana
  });

  const modalAbierto = ref(false);
  const panelAbierto = ref(false);
  const productoSeleccionado = ref(null);

  // Getters
  const ventasall = computed(() => ventas.value);
  const totalItems = computed(() =>
    ventas.value.reduce((acc, item) => acc + item.cantidad, 0)
  );
  const totalPrecio = computed(() =>
    ventas.value.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  );

  // Acciones
  const solicitarCompra = (producto) => {
    productoSeleccionado.value = producto;
    modalAbierto.value = true;
  };

  const cancelarCompra = () => {
    modalAbierto.value = false;
    productoSeleccionado.value = null;
  };

  const confirmarCompra = () => {
    if (!productoSeleccionado.value) return;

    const existe = ventas.value.find(
      (item) => item.id === productoSeleccionado.value.id
    );

    if (existe) {
      existe.cantidad++;
    } else {
      ventas.value.push({ ...productoSeleccionado.value, cantidad: 1 });
    }
    
    // Forzamos la actualización de la cookie reasignando el array
    ventas.value = [...ventas.value];
    cancelarCompra();
  };

  const aumentar = (productoId) => {
    const item = ventas.value.find((i) => i.id === productoId);
    if (item) {
      item.cantidad++;
      ventas.value = [...ventas.value];
    }
  };

  const disminuir = (productoId) => {
    const item = ventas.value.find((i) => i.id === productoId);
    if (!item) return;

    if (item.cantidad > 1) {
      item.cantidad--;
      ventas.value = [...ventas.value];
    } else {
      eliminar(productoId);
    }
  };

  const eliminar = (productoId) => {
    ventas.value = ventas.value.filter((item) => item.id !== productoId);
  };

  const vaciarCarrito = () => {
    ventas.value = [];
  };

  const abrirPanel = () => {
    panelAbierto.value = true;
  };

  const cerrarPanel = () => {
    panelAbierto.value = false;
  };

  return {
    ventas,
    modalAbierto,
    panelAbierto,
    productoSeleccionado,
    ventasall,
    totalItems,
    totalPrecio,
    solicitarCompra,
    cancelarCompra,
    confirmarCompra,
    aumentar,
    disminuir,
    eliminar,
    vaciarCarrito,
    abrirPanel,
    cerrarPanel,
  };
});
