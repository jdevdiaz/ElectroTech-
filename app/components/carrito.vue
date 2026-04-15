  <template>
    <div>

    <v-btn class="text-none" stacked>
      <v-badge location="top right" color="primary" :content="listadoventas.length" >
             <v-icon icon="mdi-cart"></v-icon>
          </v-badge>
    </v-btn>
    </div>
  </template>
  <script setup>
 const ventas = useVentas()
 const listadoventas = ventas.ventasall
 </script>