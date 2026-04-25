<script setup>
const storeProductos = useStore();

const categorias = [
  { name: 'Portátiles', icon: '💻' },
  { name: 'Accesorios', icon: '🖱️' },
  { name: 'Audio', icon: '🎧' },
  { name: 'Gaming', icon: '🎮' }
];
</script>

<template>
  <div class="d-lg-none mb-6 pb-2 overflow-x-auto" style="white-space: nowrap; -webkit-overflow-scrolling: touch;">
    <v-chip
      v-for="cat in categorias"
      :key="cat.name"
      :color="storeProductos.categoriaSeleccionada === cat.name ? 'primary' : 'grey-darken-2'"
      :variant="storeProductos.categoriaSeleccionada === cat.name ? 'flat' : 'outlined'"
      class="mr-2 font-weight-bold"
      size="large"
      @click="storeProductos.setCategoria(cat.name)"
    >
      <span class="mr-2">{{ cat.icon }}</span> {{ cat.name }}
    </v-chip>
  </div>
</template>
