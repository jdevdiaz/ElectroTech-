<script setup>
const props = defineProps(["producto"]);
const emit = defineEmits(["solicitarCompra"]);

function avisarCompra() {
  emit("solicitarCompra", props.producto);
}
</script>

<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card
      v-bind="hoverProps"
      class="d-flex flex-column rounded-xl transition-swing h-100"
      :elevation="isHovering ? 10 : 0"
      style="border: 1px solid rgba(0,0,0,0.03);"
    >
      <!-- Imagen -->
      <div class="position-relative pa-4 d-flex align-center justify-center" style="background-color: rgba(204, 221, 234, 0.3); height: 220px; overflow: hidden;">
        <v-img
          :src="producto?.imagen"
          :alt="producto?.nombre"
          class="w-100 h-100"
          style="mix-blend-mode: multiply; transition: transform 0.3s ease;"
          :style="{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }"
          contain
        ></v-img>
      </div>

      <!-- Cuerpo Principal -->
      <v-card-item class="flex-grow-1 px-5 pt-4 pb-2">
        <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
          {{ producto?.nombre }}
        </v-card-title>
        
        <div class="text-caption mt-2 text-grey-darken-1 transition-swing" :style="{ opacity: isHovering ? 1 : 0.6 }" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          {{ producto?.descripcion ?? "Producto de alta calidad ElectroTech, rendimiento garantizado." }}
        </div>
      </v-card-item>

      <v-card-actions class="px-5 pb-5 pt-0 d-flex justify-space-between align-center mt-auto">
        <span class="text-h6 font-weight-black text-primary">
          ${{ producto?.precio.toLocaleString() }}
        </span>
        <v-btn
          color="primary"
          variant="flat"
          icon="mdi-plus"
          size="small"
          class="rounded-lg transition-swing"
          :elevation="isHovering ? 4 : 1"
          @click="avisarCompra"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
