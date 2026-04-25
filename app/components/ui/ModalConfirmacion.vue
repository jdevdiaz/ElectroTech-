<script setup>
const storeVentas = useVentas();
</script>

<template>
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
          color="primary"
          variant="flat"
          class="text-none font-weight-bold px-4"
          @click="storeVentas.confirmarCompra"
        >
          Sí, confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
