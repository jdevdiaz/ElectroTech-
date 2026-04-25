<script setup lang="ts">
import CarritoPanel from "./components/carritoPanel.vue";
</script>

<template>
  <v-app class="bg-grey-lighten-4">
    <cabezote />

    <v-main>
      <v-container class="pa-4">
        <section id="catalogo">
          <managertarjetas />
        </section>
      </v-container>
    </v-main>

    <carrito-panel />
  </v-app>
</template>
