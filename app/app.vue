<script setup lang="ts">
import LayoutCarritoPanel from "./components/layout/CarritoPanel.vue";
</script>

<template>
  <v-app class="bg-background">
    <LayoutCabezote />

    <v-main>
      <NuxtPage />
    </v-main>

    <LayoutFooter />
    <LayoutCarritoPanel />
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

html, body, .v-application, .v-btn, .v-card-title, .v-card-subtitle, .v-list-item-title {
  font-family: 'Nunito', sans-serif !important;
  letter-spacing: normal !important;
}

.bg-background {
  background-color: #fafafb !important;
}
</style>
