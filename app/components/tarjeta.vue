<script setup>
const props = defineProps(["producto"]);
const emit = defineEmits(["solicitarCompra"]);

function avisarCompra() {
  emit("solicitarCompra", props.producto);
}
</script>

<template>
  <article
    class="bg-white dark:bg-slate-800 border border-transparent hover:border-[#2772a0]/30 rounded-xl overflow-hidden flex flex-col transition-all duration-300 group"
  >
    <!-- Imagen con mix-blend-multiply para eliminar fondo blanco -->
    <div
      class="relative h-48 bg-[#ccddea]/30 flex items-center justify-center p-6 group-hover:bg-[#ccddea]/50 transition-colors"
    >
      <img
        :src="producto?.imagen"
        :alt="producto?.nombre"
        class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <!-- Cuerpo -->
    <div class="p-5 flex flex-col flex-1">
      <h3 class="text-base font-bold text-slate-800 dark:text-white mb-1">
        {{ producto?.nombre }}
      </h3>
      <p
        class="text-xs text-slate-500 dark:text-slate-400 flex-1 mb-4 line-clamp-2"
      >
        {{ producto?.descripcion ?? "Producto de alta calidad ElectroTech." }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        <span class="text-lg font-black text-[#2772a0]">
          ${{ producto?.precio.toLocaleString() }}
        </span>
        <button
          @click="avisarCompra"
          class="w-9 h-9 rounded-lg bg-[#2772a0] hover:bg-[#1a5a87] text-white flex items-center justify-center text-xl font-light transition-all hover:scale-105 active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  </article>
</template>
