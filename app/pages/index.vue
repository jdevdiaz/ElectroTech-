<script setup>
import { onMounted } from "vue";

const storeProductos = useStore();
const storeVentas = useVentas();

onMounted(() => {
  storeProductos.fetchProductos();
});
</script>

<template>
  <div class="d-flex flex-column min-vh-100 bg-grey-lighten-4">
    <!-- HERO -->
    <HomeHero />

    <!-- LAYOUT: SIDEBAR + GRID -->
    <v-container fluid class="flex-grow-1 mx-auto w-100 pa-0" style="max-width: 1600px;">
      <v-row no-gutters class="h-100">
        <!-- Sidebar -->
        <v-col cols="12" lg="3" xl="2" class="d-none d-lg-block bg-grey-lighten-3 border-e">
          <LayoutCategoriasSidebar />
        </v-col>

        <!-- Grid de productos -->
        <v-col cols="12" lg="9" xl="10" id="catalogo">
          <div class="pa-6 pa-md-12 h-100 bg-grey-lighten-4">
            <div class="mb-6 mb-lg-10">
              <h2 class="text-h4 text-lg-h3 font-weight-black text-grey-darken-4 tracking-tight">Serie Pro</h2>
              <p class="text-body-2 text-lg-body-1 text-grey-darken-1 mt-2">
                Potencia sin compromisos para el profesional moderno.
              </p>
            </div>

            <!-- Horizontal Categories (Mobile Only) -->
            <HomeCategoriasFiltroMovil />

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
                <UiTarjeta
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
    <UiModalConfirmacion />
  </div>
</template>
