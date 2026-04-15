<template>
    <div>
       <div :class="fondo"
        :style="{ backgroundColor: props.color }">
       {{ color }}
       </div>
      
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(['color'])

const fondo = ref('circulodesactivado')
/*
watch(props, (newValue, oldValue) => {
  switch (newValue.color) {
    case "1":
        fondo.value = "circuloamarillo"
        break;
     case "2":
        fondo.value = "circuloazul"
        break;   
      case "3":
        fondo.value = "circulorojo"
        break;    
  
    default:
         fondo.value = "circulodesactivado"
        break;
  }
        
})*/
</script>

<style>
  .circulodesactivado{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: rgb(52, 51, 51);
  }
   .circuloamarillo{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: rgb(244, 244, 5);
  }
   .circuloazul{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: rgb(6, 83, 247);
  }
   .circulorojo{
    border-radius: 50%;
    width: 100px;
    height: 100px;
    background-color: rgb(246, 5, 5);
  }

  

</style>