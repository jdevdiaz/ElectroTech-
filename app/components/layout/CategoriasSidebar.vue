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
  <v-sheet class="d-flex flex-column bg-transparent pt-8 h-100">
    <div class="px-6 mb-6">
      <h2 class="text-h6 font-weight-bold text-primary">Catálogo</h2>
      <p class="text-caption text-grey-darken-1 mt-1">Precisión técnica</p>
    </div>
    <v-list bg-color="transparent" class="px-4" nav>
      <v-list-item
        v-for="cat in categorias"
        :key="cat.name"
        link
        rounded="lg"
        class="mb-1"
        :color="storeProductos.categoriaSeleccionada === cat.name ? 'primary' : undefined"
        :active="storeProductos.categoriaSeleccionada === cat.name"
        @click="storeProductos.setCategoria(cat.name)"
      >
        <template v-slot:prepend><span class="mr-3">{{ cat.icon }}</span></template>
        <v-list-item-title
          :class="storeProductos.categoriaSeleccionada === cat.name ? 'font-weight-bold text-primary' : 'font-weight-medium text-grey-darken-1'"
        >
          {{ cat.name }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>
