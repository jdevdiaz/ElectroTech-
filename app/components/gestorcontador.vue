<template>
  <Contador
    :valor="miValor"
    @incrementar="manejarIncremento"
    @resetear="manejarReset"
  />
</template>

<script setup>
import { ref } from 'vue'


const miValor = ref(100)

// Handler para 'incrementar': recibe el nuevo valor del hijo
function manejarIncremento(nuevoValor) {
  miValor.value = nuevoValor
}

// Handler para 'resetear'
function manejarReset() {
  miValor.value = 0
}
</script>

