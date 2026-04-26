<template>
  <v-footer color="black" class="py-12 mt-16">
    <v-container class="d-flex flex-column align-center text-center">
      <v-img src="/ElectroTech.svg" max-width="180" class="mb-6" style="filter: brightness(0) invert(1); opacity: 0.8;"></v-img>
      <p class="text-body-1 text-grey-darken-1 mb-6 max-w-md">La mejor tienda de electrónica de córdoba, diseñada con precisión absoluta para el mundo moderno.</p>
      
      <div class="d-flex ga-4 mb-8">
        <v-btn icon="mdi-github" variant="text" color="grey-lighten-1" href="https://github.com/jdevdiaz" target="_blank"></v-btn>
        <v-btn icon="mdi-instagram" variant="text" color="grey-lighten-1" href="https://instagram.com/jesus_carax" target="_blank"></v-btn>
        <v-btn icon="mdi-linkedin" variant="text" color="grey-lighten-1" href="https://www.linkedin.com/in/jes%C3%BAs-d%C3%ADaz-223261304/" target="_blank"></v-btn>
      </div>

      <v-divider class="w-100 mb-6 border-opacity-25" color="grey-darken-3"></v-divider>
      
      <div class="text-caption text-grey-darken-2 font-weight-bold tracking-widest text-uppercase">
        &copy; {{ new Date().getFullYear() }} ElectroTech Inc. Todos los derechos reservados.
      </div>
    </v-container>
  </v-footer>
</template>
