<script setup>
const storeVentas = useVentas();
</script>

<template>
  <v-btn
    icon
    color="#2772a0"
    variant="text"
    @click="storeVentas.abrirPanel"
  >
    <v-badge
      v-if="storeVentas.totalItems > 0"
      :content="storeVentas.totalItems"
      color="error"
    >
      <v-icon>mdi-cart-outline</v-icon>
    </v-badge>
    <v-icon v-else>mdi-cart-outline</v-icon>
  </v-btn>
</template>
