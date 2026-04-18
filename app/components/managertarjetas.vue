<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const storeProductos = useStore();
const storeVentas = useVentas();

onMounted(() => {
  storeProductos.fetchProductos();
});

// --- CARRUSEL ---
const imagenes = [
  "https://media.falabella.com/falabellaCO/65682315_1/w=1200,h=1200,fit=pad",
  "https://media.falabella.com.co/falabellaCO/73221262_1/width=240,height=240,quality=70,format=webp,fit=pad",
  "https://media.falabella.com/falabellaCO/119351473_01/w=1200,h=1200,fit=pad",
  "https://media.falabella.com/falabellaCO/151489247_01/w=1200,h=1200,fit=pad",
  "https://media.falabella.com/falabellaCO/119443688_01/w=1200,h=1200,fit=pad",
];

const indiceActual = ref(0);
let intervalo = null;

onMounted(() => {
  intervalo = setInterval(() => {
    indiceActual.value = (indiceActual.value + 1) % imagenes.length;
  }, 3000);
});

// Limpieza obligatoria para evitar memory leaks
onUnmounted(() => {
  clearInterval(intervalo);
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
    <!-- HERO -->
    <section
      class="w-full bg-[#ccddea] dark:bg-slate-800 px-6 md:px-12 lg:px-24 pt-12 pb-16"
    >
      <div
        class="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-12"
      >
        <!-- Texto -->
        <div class="w-full lg:w-1/2 flex flex-col items-start gap-6">
          <span
            class="px-3 py-1 rounded-full bg-[#2772a0] text-white text-xs font-bold tracking-widest uppercase"
          >
            New Arrival
          </span>
          <h1
            class="text-5xl lg:text-6xl font-black tracking-tighter text-[#2772a0] dark:text-white leading-tight"
          >
            Precisión.<br />Sin compromiso.
          </h1>
          <p
            class="text-base text-slate-600 dark:text-slate-300 max-w-md leading-relaxed"
          >
            La próxima generación de electrónica de alto rendimiento para
            quienes exigen lo excepcional.
          </p>
          <button
            class="px-8 py-4 bg-[#2772a0] hover:bg-[#1a5a87] text-white rounded-lg font-bold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Explorar catálogo
          </button>
        </div>

        <!-- Carrusel -->
        <div
          class="w-full lg:w-1/2 h-64 lg:h-80 flex items-center justify-center"
        >
          <img
            :src="imagenes[indiceActual]"
            :key="indiceActual"
            alt="Producto destacado"
            class="w-full h-full object-contain drop-shadow-xl transition-all duration-700"
          />
        </div>
      </div>
    </section>

    <!-- LAYOUT: SIDEBAR + GRID -->
    <div class="flex flex-1 max-w-screen-2xl mx-auto w-full">
      <!-- Sidebar -->
      <aside
        class="hidden lg:flex flex-col gap-1 p-4 w-60 flex-shrink-0 bg-slate-100 dark:bg-slate-900 min-h-full pt-8 border-r border-slate-200 dark:border-slate-700"
      >
        <div class="px-4 mb-6">
          <h2 class="text-lg font-bold text-[#2772a0] dark:text-white">
            Catálogo
          </h2>
          <p class="text-xs text-slate-500 mt-1">Precisión técnica</p>
        </div>
        <a
          class="flex items-center gap-3 px-4 py-3 bg-[#ccddea] text-[#2772a0] rounded-r-full font-medium text-sm cursor-pointer"
        >
          💻 Portátiles
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#2772a0] hover:pl-5 transition-all text-sm cursor-pointer font-medium"
        >
          🖱️ Accesorios
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#2772a0] hover:pl-5 transition-all text-sm cursor-pointer font-medium"
        >
          🎧 Audio
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#2772a0] hover:pl-5 transition-all text-sm cursor-pointer font-medium"
        >
          🎮 Gaming
        </a>
      </aside>

      <!-- Grid de productos -->
      <main class="flex-1 p-6 md:p-10 bg-[#ccddea]/20 dark:bg-slate-950">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2
              class="text-2xl font-black text-slate-800 dark:text-white tracking-tight"
            >
              Serie Pro
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Potencia sin compromisos para el profesional moderno.
            </p>
          </div>
        </div>

        <!-- Loading -->
        <div
          v-if="storeProductos.loading"
          class="flex justify-center items-center h-64"
        >
          <div
            class="w-10 h-10 border-4 border-[#2772a0] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>

        <!-- Error -->
        <div
          v-else-if="storeProductos.error"
          class="text-center text-red-500 py-12"
        >
          {{ storeProductos.error }}
        </div>

        <!-- Productos -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <tarjeta
            v-for="data in storeProductos.productosall"
            :key="data.id"
            :producto="data"
            @solicitarCompra="storeVentas.solicitarCompra"
          />
        </div>
      </main>
    </div>

    <!-- MODAL de confirmación -->
    <Teleport to="body">
      <div
        v-if="storeVentas.modalAbierto"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="storeVentas.cancelarCompra"
      >
        <div
          class="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
        >
          <h3
            class="text-xl font-black text-slate-800 dark:text-white mb-2 text-center"
          >
            Confirmar Pedido
          </h3>
          <p class="text-slate-600 dark:text-slate-300 text-center mb-6">
            ¿Deseas agregar
            <strong>{{ storeVentas.productoSeleccionado?.nombre }}</strong>
            al carrito por
            <strong class="text-[#2772a0]"
              >${{
                storeVentas.productoSeleccionado?.precio.toLocaleString()
              }}</strong
            >?
          </p>
          <div class="flex gap-3 justify-end">
            <button
              @click="storeVentas.cancelarCompra"
              class="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="storeVentas.confirmarCompra"
              class="px-5 py-2 rounded-lg bg-[#2772a0] hover:bg-[#1a5a87] text-white text-sm font-bold transition-all hover:scale-[1.02]"
            >
              Sí, confirmar
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
