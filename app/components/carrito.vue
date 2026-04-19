<script setup>
const storeVentas = useVentas();
</script>

<template>
  <button
    @click="storeVentas.abrirPanel"
    class="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#ccddea]/50 transition-colors text-[#2772a0] dark:text-sky-400"
  >
    <svg
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
    <span
      v-if="storeVentas.totalItems > 0"
      class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
    >
      {{ storeVentas.totalItems }}
    </span>
  </button>
</template>
