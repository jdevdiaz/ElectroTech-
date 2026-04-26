<script setup>
const storeVentas = useVentas();
const storeProductos = useStore();
</script>

<template>
  <v-app-bar
    elevation="0"
    class="px-4 border-b"
    style="background-color: rgba(255, 255, 255, 0.8) !important; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-color: rgba(0,0,0,0.06) !important; z-index: 100;"
  >
    <!-- Logo -->
    <div class="d-flex align-center flex-shrink-0" style="width: 200px;">
      <NuxtLink to="/" class="text-decoration-none d-flex align-center">
        <v-img
          src="/ELECTROTECH_Head.svg"
          alt="ElectroTech"
          height="240"
          width="180"
          contain
          class="cursor-pointer"
        />
      </NuxtLink>
    </div>

  
    <div class="d-none d-md-flex flex-grow-1 justify-center px-4">
      <v-text-field
        v-model="storeProductos.searchQuery"
        style="max-width: 1000px; width: 100%; font-size: 1.1rem;"
        density="comfortable"
        variant="solo"
        flat
        bg-color="search-bg"
        placeholder="¿Qué estás buscando hoy?"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        rounded="pill"
        color="primary"
      ></v-text-field>
    </div>

    <v-spacer class="d-md-none" /> 
    <!-- Actions -->
    <div class="d-flex align-center justify-end flex-shrink-0 ga-2" style="width: 250px;">
      <!-- Carrito -->
      <UiCarritoBtn />

      <!-- Login -->
      <v-btn icon color="primary" variant="text">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>
