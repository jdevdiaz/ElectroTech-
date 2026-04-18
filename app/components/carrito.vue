<script setup>
// 1. Importamos computed para la reactividad inteligente
import { computed } from 'vue'

// 2. Accedemos al store de ventas (Nuxt lo auto-importa)
const storeVentas = useVentas()

// 3. Creamos la propiedad computada que cuenta los productos
// Cada vez que storeVentas.ventas cambie, este número se actualiza solo.
const cantidad = computed(() => {
  return storeVentas.ventasall.length
})
</script>

<template>
  <v-badge
    color="red"
    :content="cantidad"
    :model-value="cantidad > 0"
    overlap
  >
    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-badge>
</template>