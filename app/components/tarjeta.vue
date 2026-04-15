<template>
  <v-card
    class="mx-auto"
    width="300"
  >
    <v-img
      class="align-end text-white"
      height="200"
      :src="producto?.imagen"
      cover
    >
      <v-card-title>{{ producto?.nombre }}</v-card-title>
    </v-img>


    <v-card-actions>
      <v-btn @click="ventas()" color="orange" :text="producto?.precio">
      </v-btn>

     
    </v-card-actions>
  </v-card>
</template>
<script setup>
  const props = defineProps(['producto'])

  function ventas(){
   console.log(props.producto)
  }
</script>