<script setup>
const storeVentas = useVentas();
</script>

<template>
  <v-app-bar
    color="white"
    elevation="1"
    class="px-4"
  >
    <!-- Logo -->
    <v-img
      src="/ElectroTech.svg"
      alt="ElectroTech"
      max-height="40"
      max-width="150"
      class="mr-4"
      content-class="object-contain"
    />

    <v-spacer class="d-none d-md-flex" />

    <!-- Search -->
    <v-text-field
      class="d-none d-md-flex flex-grow-1 mx-8"
      style="max-width: 600px;"
      density="compact"
      variant="solo-filled"
      bg-color="#ccddea50"
      placeholder="Buscar productos..."
      prepend-inner-icon="mdi-magnify"
      single-line
      hide-details
      rounded="pill"
      color="#2772a0"
    ></v-text-field>

    <v-spacer class="d-none d-md-flex" />

    <!-- Actions -->
    <div class="d-flex align-center ga-2">
      <!-- Carrito -->
      <carrito />

      <!-- Login -->
      <v-btn icon color="#2772a0" variant="text">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>
