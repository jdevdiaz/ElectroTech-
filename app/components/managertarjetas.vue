<script setup>
import { ref } from 'vue'

// 1. Acceso a los stores (Nuxt los gestiona automáticamente)
const storeProductos = useStore()
const storeVentas = useVentas()

const listado = storeProductos.productosall

// --- ESTADO REACTIVO PARA EL DIÁLOGO ---
// 'isDialogOpen' controla si el modal se ve o no
const isDialogOpen = ref(false)
// 'selectedProduct' guarda la moto que el usuario eligió confirmar
const selectedProduct = ref(null)

// 2. Función que se activa cuando la tarjeta "grita" @solicitarCompra
const handleSolicitarCompra = (producto) => {
  selectedProduct.value = producto // Guardamos el producto recibido del hijo
  isDialogOpen.value = true        // Abrimos el diálogo
}

// 3. Función que finaliza la compra
const confirmarCompra = () => {
  if (selectedProduct.value) {
    storeVentas.guardar(selectedProduct.value) // Guardamos en Pinia
    isDialogOpen.value = false                // Cerramos el diálogo
    console.log("Compra confirmada:", selectedProduct.value.nombre)
  }
}
</script>

<template>
  <v-container>
    <v-row class="mt-3" justify="center">
      <tarjeta 
        v-for="data in listado" 
        :key="data.id" 
        :producto="data"
        @solicitarCompra="handleSolicitarCompra"
      />
    </v-row>

    <v-dialog v-model="isDialogOpen" max-width="450">
      <v-card v-if="selectedProduct" class="pa-4">
        <v-card-title class="text-h5 text-center">
          Confirmar Pedido
        </v-card-title>
        
        <v-card-text>
          ¿Estás seguro de que deseas agregar la <strong>{{ selectedProduct.nombre }}</strong> al carrito por 
          <strong>${{ selectedProduct.precio.toLocaleString() }}</strong>?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="isDialogOpen = false">
            No, cancelar
          </v-btn>
          <v-btn color="orange-darken-2" variant="elevated" @click="confirmarCompra">
            Sí, confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>