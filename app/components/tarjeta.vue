<script setup>
const props = defineProps(["producto"]);
const emit = defineEmits(["solicitarCompra"]);

function avisarCompra() {
  emit("solicitarCompra", props.producto);
}
</script>

<template>
  <v-card class="mx-auto ma-4" width="400" elevation="2">
    <v-img
      class="align-end text-white"
      height="300"
      :src="producto?.imagen"
      cover
    >
      <v-card-title class="bg-black-lighten-2 w-100">
        {{ producto?.nombre }}
      </v-card-title>
    </v-img>

    <v-card-actions>
      <v-btn
        @click="avisarCompra"
        color="orange-darken-2"
        variant="elevated"
        block
      >
        Comprar: ${{ producto?.precio.toLocaleString() }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
