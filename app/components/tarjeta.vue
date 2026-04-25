<script setup>
const props = defineProps(["producto"]);
const emit = defineEmits(["solicitarCompra"]);

function avisarCompra() {
  emit("solicitarCompra", props.producto);
}
</script>

<template>
  <v-card
    class="d-flex flex-column rounded-xl transition-swing h-100"
    elevation="1"
    hover
    border
  >
    <!-- Imagen -->
    <div class="pa-4 d-flex align-center justify-center" style="background-color: rgba(204, 221, 234, 0.4); height: 200px;">
      <v-img
        :src="producto?.imagen"
        :alt="producto?.nombre"
        class="w-100 h-100"
        style="mix-blend-mode: multiply;"
        contain
      ></v-img>
    </div>

    <!-- Cuerpo -->
    <v-card-item class="flex-grow-1 px-5 pt-5 pb-2">
      <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
        {{ producto?.nombre }}
      </v-card-title>
      <v-card-subtitle class="text-caption mt-2" style="white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        {{ producto?.descripcion ?? "Producto de alta calidad ElectroTech." }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-actions class="px-5 pb-5 pt-0 d-flex justify-space-between align-center mt-auto">
      <span class="text-h6 font-weight-black text-primary">
        ${{ producto?.precio.toLocaleString() }}
      </span>
      <v-btn
        color="#2772a0"
        variant="flat"
        icon="mdi-plus"
        size="small"
        class="rounded-lg"
        elevation="2"
        @click="avisarCompra"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
