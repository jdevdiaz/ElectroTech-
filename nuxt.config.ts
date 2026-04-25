import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "vuetify-nuxt-module"],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'electroTheme',
        themes: {
          electroTheme: {
            dark: false,
            colors: {
              primary: '#6366f1', // Indigo suave y agradable
              secondary: '#10b981', 
              accent: '#f472b6', 
              background: '#fafafb',
              surface: '#ffffff',
              'hero-bg': '#eef2ff', // Indigo ultra claro
              'search-bg': '#f3f4f6'
            }
          }
        }
      }
    }
  }
});
