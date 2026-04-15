
<template>
  <div>
    <p>Valor: {{ props.valor }}</p>
    <button @click="alIncrementar">+1</button>
    <button @click="alResetear">Reset</button>
  </div>
</template>


<script setup>


// 1. Recibir props del padre
const props = defineProps({
  valor: Number
})

// 2. Declarar los eventos que puede emitir
const emit = defineEmits(['incrementar', 'resetear'])

// 3. Funciones que emiten eventos al padre
function alIncrementar() {
  
  emit('incrementar', props.valor + 1)
  // ↑ nombre del evento  ↑ dato que enviamos al padre
}

function alResetear() {
  emit('resetear')
  // este evento no envía datos extra
}
</script>
