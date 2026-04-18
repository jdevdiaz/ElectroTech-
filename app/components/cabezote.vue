<script setup>
const storeVentas = useVentas();
</script>

<template>
  <nav
    class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 shadow-sm"
  >
    <div
      class="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="ElectroTech"
          class="h-10 w-auto object-contain"
        />
      </div>

      <!-- Search -->
      <div class="flex-1 max-w-xl mx-8 hidden md:block">
        <div
          class="relative flex items-center w-full h-10 rounded-full bg-[#ccddea]/50 focus-within:ring-2 focus-within:ring-[#2772a0]/40 transition-shadow"
        >
          <!-- Icono lupa SVG -->
          <svg
            class="ml-3 w-4 h-4 text-[#2772a0] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            class="h-full w-full outline-none text-sm bg-transparent px-3 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            placeholder="Buscar productos..."
            type="text"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Carrito -->
        <carrito />

        <!-- Login -->
        <button
          class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#ccddea]/50 transition-colors text-[#2772a0] dark:text-sky-400"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
