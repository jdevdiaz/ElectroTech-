<script setup>
const storeVentas = useVentas();
</script>

<template>
  <!-- Overlay oscuro -->
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="storeVentas.panelAbierto"
        class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        @click="storeVentas.cerrarPanel"
      />
    </transition>

    <!-- Panel lateral -->
    <transition name="slide">
      <div
        v-if="storeVentas.panelAbierto"
        class="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700"
        >
          <h2 class="text-lg font-black text-slate-800 dark:text-white">
            Mi Carrito
          </h2>
          <button
            @click="storeVentas.cerrarPanel"
            class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
          >
            <!-- Icono X -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Lista de productos -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <!-- Carrito vacío -->
          <div
            v-if="storeVentas.ventasall.length === 0"
            class="flex flex-col items-center justify-center h-full gap-4 text-slate-400"
          >
            <svg
              class="w-16 h-16 opacity-30"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              viewBox="0 0 24 24"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p class="text-sm font-medium">Tu carrito está vacío</p>
          </div>

          <!-- Items -->
          <div
            v-for="item in storeVentas.ventasall"
            :key="item.id"
            class="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-3"
          >
            <!-- Imagen del producto -->
            <div
              class="w-16 h-16 rounded-lg bg-[#ccddea] flex-shrink-0 flex items-center justify-center overflow-hidden"
            >
              <img
                :src="item.imagen"
                :alt="item.nombre"
                class="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-bold text-slate-800 dark:text-white truncate"
              >
                {{ item.nombre }}
              </p>
              <p class="text-xs text-[#2772a0] font-bold mt-1">
                ${{ item.precio.toLocaleString() }}
              </p>

              <!-- Cantidad -->
              <div class="flex items-center gap-2 mt-2">
                <button
                  @click="storeVentas.disminuir(item.id)"
                  class="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white text-sm font-bold flex items-center justify-center hover:bg-[#ccddea] transition-colors"
                >
                  −
                </button>
                <span
                  class="text-sm font-bold text-slate-700 dark:text-white w-4 text-center"
                >
                  {{ item.cantidad }}
                </span>
                <button
                  @click="storeVentas.aumentar(item.id)"
                  class="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white text-sm font-bold flex items-center justify-center hover:bg-[#ccddea] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Eliminar -->
            <button
              @click="storeVentas.eliminar(item.id)"
              class="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Footer con total -->
        <div
          class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 space-y-4"
        >
          <div class="flex justify-between items-center">
            <span class="text-sm text-slate-500 dark:text-slate-400 font-medium"
              >Total</span
            >
            <span class="text-xl font-black text-[#2772a0]">
              ${{ storeVentas.totalPrecio.toLocaleString() }}
            </span>
          </div>
          <button
            class="w-full py-3 bg-[#2772a0] hover:bg-[#1a5a87] text-white font-bold rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
