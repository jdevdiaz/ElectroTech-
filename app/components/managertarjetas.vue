<script setup>
import { onMounted } from "vue";

const storeProductos = useStore();
const storeVentas = useVentas();

// Cargamos los productos al montar el componente
onMounted(() => {
  storeProductos.fetchProductos();
});
</script>

<template>
  <v-container>
    <!-- Estado de carga -->
    <v-row v-if="storeProductos.loading" justify="center" class="mt-10">
      <v-progress-circular indeterminate color="orange-darken-2" size="64" />
    </v-row>

    <!-- Estado de error -->
    <v-row v-else-if="storeProductos.error" justify="center" class="mt-10">
      <v-alert type="error" :text="storeProductos.error" />
    </v-row>

    <!-- Listado de productos -->
    <v-row v-else class="mt-3" justify="center">
      <tarjeta
        v-for="data in storeProductos.productosall"
        :key="data.id"
        :producto="data"
        @solicitarCompra="storeVentas.solicitarCompra"
      />
    </v-row>

    <!-- Modal de confirmación (ahora controlado por el store) -->
    <v-dialog v-model="storeVentas.modalAbierto" max-width="450">
      <v-card v-if="storeVentas.productoSeleccionado" class="pa-4">
        <v-card-title class="text-h5 text-center">
          Confirmar Pedido
        </v-card-title>

        <v-card-text>
          ¿Deseas agregar
          <strong>{{ storeVentas.productoSeleccionado.nombre }}</strong>
          al carrito por
          <strong
            >${{
              storeVentas.productoSeleccionado.precio.toLocaleString()
            }}</strong
          >?
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="storeVentas.cancelarCompra"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="orange-darken-2"
            variant="elevated"
            @click="storeVentas.confirmarCompra"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
