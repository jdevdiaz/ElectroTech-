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
              ElectroTech
            </v-chip>
            <h1 class="text-h3 text-lg-h2 font-weight-black text-primary leading-tight">
              Precisión.<br />Sin compromiso.
            </h1>
            <p class="text-body-1 text-grey-darken-2" style="max-width: 400px;">
              La próxima generación de electrónica de alto rendimiento para
              quienes exigen lo excepcional.
            </p>
            <v-btn href="#catalogo" color="#2772a0" size="x-large" class="text-none font-weight-bold mt-2" elevation="2">
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
    <v-container fluid class="flex-grow-1 mx-auto w-100 pa-0" style="max-width: 1600px;">
      <v-row no-gutters class="h-100">
        <!-- Sidebar -->
        <v-col cols="12" lg="3" xl="2" class="d-none d-lg-block bg-grey-lighten-3 border-e">
          <v-sheet
            class="d-flex flex-column bg-transparent pt-8 h-100"
          >
            <div class="px-6 mb-6">
              <h2 class="text-h6 font-weight-bold text-primary">Catálogo</h2>
              <p class="text-caption text-grey-darken-1 mt-1">Precisión técnica</p>
            </div>
            <v-list bg-color="transparent" class="px-4" nav>
              <v-list-item
                v-for="cat in [
                  { name: 'Portátiles', icon: '💻' },
                  { name: 'Accesorios', icon: '🖱️' },
                  { name: 'Audio', icon: '🎧' },
                  { name: 'Gaming', icon: '🎮' }
                ]"
                :key="cat.name"
                link
                rounded="lg"
                class="mb-1"
                :color="storeProductos.categoriaSeleccionada === cat.name ? 'primary' : undefined"
                :active="storeProductos.categoriaSeleccionada === cat.name"
                @click="storeProductos.setCategoria(cat.name)"
              >
                <template v-slot:prepend><span class="mr-3">{{ cat.icon }}</span></template>
                <v-list-item-title
                  :class="storeProductos.categoriaSeleccionada === cat.name ? 'font-weight-bold text-primary' : 'font-weight-medium text-grey-darken-1'"
                >
                  {{ cat.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <!-- Grid de productos -->
        <v-col cols="12" lg="9" xl="10" id="catalogo">
          <div class="pa-6 pa-md-12 h-100 bg-grey-lighten-4">
            <div class="mb-10">
              <h2 class="text-h3 font-weight-black text-grey-darken-4 tracking-tight">Serie Pro</h2>
              <p class="text-body-1 text-grey-darken-1 mt-2">
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
                sm="6"
                xl="4"
              >
                <tarjeta
                  :producto="data"
                  @solicitarCompra="storeVentas.solicitarCompra"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
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
