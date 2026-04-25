<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- CARRUSEL ---
const imagenes = [
  "https://media.falabella.com/falabellaCO/65682315_1/w=1200,h=1200,fit=pad",
  "https://media.falabella.com.co/falabellaCO/73221262_1/width=240,height=240,quality=70,format=webp,fit=pad",
  "https://media.falabella.com/falabellaCO/119351473_01/w=1200,h=1200,fit=pad",
  "https://media.falabella.com/falabellaCO/151489247_01/w=1200,h=1200,fit=pad",
  "https://media.falabella.com/falabellaCO/119443688_01/w=1200,h=1200,fit=pad",
];

const indiceActual = ref(0);
let intervalo = null;

onMounted(() => {
  intervalo = setInterval(() => {
    indiceActual.value = (indiceActual.value + 1) % imagenes.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalo);
});
</script>

<template>
  <v-sheet class="py-10 py-md-16 px-6 px-md-12 px-lg-24" style="background: radial-gradient(circle at top right, #eef2ff 0%, #fafafb 70%); border-bottom: 1px solid rgba(0,0,0,0.02);">
    <v-container fluid class="max-w-screen-2xl mx-auto pa-0">
      <v-row align="center" justify="space-between">
        <!-- Texto -->
        <v-col cols="12" lg="6" class="d-flex flex-column align-start ga-6 mt-md-8">
          <v-chip color="grey-darken-4" text-color="white" class="font-weight-black text-uppercase tracking-widest px-4" size="small">
            ElectroTech Pro
          </v-chip>
          <h1 class="text-h3 text-lg-h2 font-weight-black text-grey-darken-4 leading-tight" style="line-height: 1.1 !important; letter-spacing: -1.5px !important;">
            Poder absoluto.<br/>
            <span class="text-primary">Belleza minimalista.</span>
          </h1>
          <p class="text-body-1 text-lg-h6 text-grey-darken-1 max-w-md">
            La próxima generación de electrónica de alto rendimiento para
            quienes exigen lo excepcional.
          </p>
          <v-btn href="#catalogo" color="grey-darken-4" size="x-large" class="text-none font-weight-bold mt-4 rounded-xl px-8" elevation="4">
            Explorar colección
          </v-btn>
        </v-col>

        <!-- Carrusel -->
        <v-col cols="12" lg="6" class="d-flex align-center justify-center" style="height: 240px;">
          <div class="animacion-flotar w-100 h-100" style="mix-blend-mode: multiply;">
            <v-img
              :src="imagenes[indiceActual]"
              :key="indiceActual"
              alt="Producto destacado"
              class="w-100 h-100 transition-swing"
              contain
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>
@keyframes flotar {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

.animacion-flotar {
  animation: flotar 4s ease-in-out infinite;
}
</style>
