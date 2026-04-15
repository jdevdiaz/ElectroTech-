<template>
    <v-row class="mt-3">
       <tarjeta
         v-for="data in listado" :key="data.nombre"
        :producto="data">
       </tarjeta>
    </v-row>
</template>
<script setup>
 const productos = useStore()
 const listado = productos.productosall
 </script>