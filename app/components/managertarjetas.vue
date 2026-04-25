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
  <div class="d-flex flex-column min-vh-100 bg-grey-lighten-4">
    <!-- HERO -->
    <v-sheet color="#ccddea" class="py-12 py-md-16 px-6 px-md-12 px-lg-24">
      <v-container fluid class="max-w-screen-2xl mx-auto pa-0">
        <v-row align="center" justify="space-between">
          <!-- Texto -->
          <v-col cols="12" lg="6" class="d-flex flex-column align-start ga-6">
            <v-chip color="#2772a0" text-color="white" class="font-weight-bold text-uppercase" size="small">
              New Arrival
            </v-chip>
            <h1 class="text-h3 text-lg-h2 font-weight-black text-primary leading-tight">
              Precisión.<br />Sin compromiso.
            </h1>
            <p class="text-body-1 text-grey-darken-2" style="max-width: 400px;">
              La próxima generación de electrónica de alto rendimiento para
              quienes exigen lo excepcional.
            </p>
            <v-btn color="#2772a0" size="x-large" class="text-none font-weight-bold mt-2" elevation="2">
              Explorar catálogo
            </v-btn>
          </v-col>

          <!-- Carrusel -->
          <v-col cols="12" lg="6" class="d-flex align-center justify-center" style="height: 320px;">
            <v-img
              :src="imagenes[indiceActual]"
              :key="indiceActual"
              alt="Producto destacado"
              class="w-100 h-100 transition-swing"
              style="mix-blend-mode: multiply;"
              contain
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- LAYOUT: SIDEBAR + GRID -->
    <v-container fluid class="pa-0 flex-grow-1 d-flex max-w-screen-2xl mx-auto w-100">
      <!-- Sidebar -->
      <v-sheet
        width="240"
        class="d-none d-lg-flex flex-column bg-grey-lighten-3 border-e pt-8 flex-shrink-0"
        min-height="100%"
      >
        <div class="px-4 mb-6">
          <h2 class="text-h6 font-weight-bold text-primary">Catálogo</h2>
          <p class="text-caption text-grey-darken-1 mt-1">Precisión técnica</p>
        </div>
        <v-list bg-color="transparent" class="px-2" nav>
          <v-list-item link rounded="e-xl" class="mb-1" color="primary" active>
            <template v-slot:prepend><span class="mr-3">💻</span></template>
            <v-list-item-title class="font-weight-medium text-primary">Portátiles</v-list-item-title>
          </v-list-item>
          <v-list-item link rounded="e-xl" class="mb-1">
            <template v-slot:prepend><span class="mr-3">🖱️</span></template>
            <v-list-item-title class="font-weight-medium text-grey-darken-1">Accesorios</v-list-item-title>
          </v-list-item>
          <v-list-item link rounded="e-xl" class="mb-1">
            <template v-slot:prepend><span class="mr-3">🎧</span></template>
            <v-list-item-title class="font-weight-medium text-grey-darken-1">Audio</v-list-item-title>
          </v-list-item>
          <v-list-item link rounded="e-xl" class="mb-1">
            <template v-slot:prepend><span class="mr-3">🎮</span></template>
            <v-list-item-title class="font-weight-medium text-grey-darken-1">Gaming</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>

      <!-- Grid de productos -->
      <v-main class="pa-6 pa-md-10 flex-grow-1">
        <div class="mb-8">
          <h2 class="text-h4 font-weight-black text-grey-darken-4 tracking-tight">Serie Pro</h2>
          <p class="text-body-2 text-grey-darken-1 mt-1">
            Potencia sin compromisos para el profesional moderno.
          </p>
        </div>

        <!-- Loading -->
        <div v-if="storeProductos.loading" class="d-flex justify-center align-center" style="height: 256px;">
          <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
        </div>

        <!-- Error -->
        <div v-else-if="storeProductos.error" class="text-center text-error py-12 text-h6">
          {{ storeProductos.error }}
        </div>

        <!-- Productos -->
        <v-row v-else>
          <v-col
            v-for="data in storeProductos.productosall"
            :key="data.id"
            cols="12"
            md="6"
            xl="4"
          >
            <tarjeta
              :producto="data"
              @solicitarCompra="storeVentas.solicitarCompra"
            />
          </v-col>
        </v-row>
      </v-main>
    </v-container>

    <!-- MODAL de confirmación -->
    <v-dialog v-model="storeVentas.modalAbierto" max-width="450" persistent>
      <v-card class="pa-4 rounded-xl">
        <v-card-title class="text-center text-h5 font-weight-black pt-4">
          Confirmar Pedido
        </v-card-title>
        
        <v-card-text class="text-center text-body-1 py-4">
          ¿Deseas agregar
          <strong>{{ storeVentas.productoSeleccionado?.nombre }}</strong>
          al carrito por
          <strong class="text-primary">${{ storeVentas.productoSeleccionado?.precio.toLocaleString() }}</strong>?
        </v-card-text>
        
        <v-card-actions class="justify-end pa-4 pt-0 gap-2">
          <v-btn
            variant="outlined"
            color="grey-darken-1"
            class="text-none font-weight-medium px-4"
            @click="storeVentas.cancelarCompra"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="#2772a0"
            variant="flat"
            class="text-none font-weight-bold px-4"
            @click="storeVentas.confirmarCompra"
          >
            Sí, confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
