<script setup lang="ts">
import CarritoPanel from "./components/carritoPanel.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-slate-900">
    <header>
      <cabezote />
    </header>

    <main class="container mx-auto p-4">
      <section id="catalogo">
        <managertarjetas />
      </section>
    </main>
    <carrito-panel />
  </div>
</template>
