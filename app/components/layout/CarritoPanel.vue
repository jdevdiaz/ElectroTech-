<script setup>
import { useRouter } from 'vue-router';
const storeVentas = useVentas();
const router = useRouter();

function irAlCheckout() {
  storeVentas.cerrarPanel();
  router.push('/checkout');
}
</script>

<template>
  <v-navigation-drawer
    v-model="storeVentas.panelAbierto"
    location="right"
    temporary
    width="400"
    style="max-width: 100vw;"
    class="d-flex flex-column"
  >
    <!-- Header -->
    <v-toolbar color="transparent" density="compact" flat class="px-2">
      <v-toolbar-title class="font-weight-bold text-h6">Mi Carrito</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="storeVentas.cerrarPanel" variant="text" color="grey-darken-1">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider></v-divider>

    <!-- Content -->
    <div v-if="storeVentas.ventasall.length === 0" class="d-flex flex-column align-center justify-center flex-grow-1 h-100 pa-4">
      <v-icon size="64" color="grey-lighten-2">mdi-cart-outline</v-icon>
      <p class="text-subtitle-1 mt-4 text-grey">Tu carrito está vacío</p>
    </div>

    <v-list v-else lines="three" class="pa-4 flex-grow-1 overflow-y-auto">
      <v-card
        v-for="item in storeVentas.ventasall"
        :key="item.id"
        class="mb-4 bg-grey-lighten-4"
        elevation="0"
        border
      >
        <div class="d-flex pa-3 overflow-hidden">
          <v-img
            :src="item.imagen"
            width="80"
            height="80"
            class="rounded bg-white flex-shrink-0"
            style="mix-blend-mode: multiply;"
            contain
          ></v-img>
          
          <div class="ml-4 flex-grow-1 overflow-hidden d-flex flex-column justify-space-between">
            <div class="d-flex justify-space-between align-start w-100">
              <div class="text-subtitle-2 font-weight-bold text-truncate flex-grow-1 mr-2">{{ item.nombre }}</div>
              <v-btn icon="mdi-delete" variant="text" size="small" color="grey-lighten-1" class="flex-shrink-0" @click="storeVentas.eliminar(item.id)"></v-btn>
            </div>
            
            <div class="text-body-2 text-primary font-weight-bold">
              ${{ item.precio.toLocaleString() }}
            </div>
            
            <div class="d-flex align-center mt-2">
              <v-btn icon="mdi-minus" size="x-small" variant="tonal" rounded="sm" @click="storeVentas.disminuir(item.id)"></v-btn>
              <span class="mx-3 font-weight-bold text-body-2">{{ item.cantidad }}</span>
              <v-btn icon="mdi-plus" size="x-small" variant="tonal" rounded="sm" @click="storeVentas.aumentar(item.id)"></v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-list>

    <!-- Footer -->
    <template v-slot:append>
      <div class="pa-4 bg-white border-t">
        <div class="d-flex justify-space-between align-center mb-4">
          <span class="text-subtitle-1 text-grey-darken-1 font-weight-medium">Total</span>
          <span class="text-h5 font-weight-bold text-primary">
            ${{ storeVentas.totalPrecio.toLocaleString() }}
          </span>
        </div>
        <v-btn
          color="primary"
          block
          size="x-large"
          class="font-weight-bold rounded-lg text-none"
          elevation="2"
          @click="irAlCheckout"
          :disabled="storeVentas.ventasall.length === 0"
        >
          Proceder al pago
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
