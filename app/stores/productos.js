import { defineStore } from 'pinia'

export const useStore = defineStore('productos', {
  state: () => {
    return {
      productos: [
        {
          id: 1,
          nombre: "Mouse",
          precio: 86000000,
          imagen: "https://media.falabella.com/falabellaCO/65682315_1/w=1200,h=1200,fit=pad"
        },
        {
          id: 2,
          nombre: "Portátil Lenovo Ideapad Slim 3",
          precio: 2399900,
          imagen: "https://media.falabella.com.co/falabellaCO/73221262_1/width=240,height=240,quality=70,format=webp,fit=pad"
        },
        {
          id: 3,
          nombre: "",
          precio: 86000000,
          imagen: ""
        },
        {
          id: 4,
          nombre: "",
          precio: 83000000,
          imagen: ""
        },
        {
          id: 5,
          nombre: "",
          precio: 86000000,
          imagen: ""
        },
        {
          id: 6,
          nombre: "",
          precio: 83000000,
          imagen: ""
        },
        {
          id: 7,
          nombre: "",
          precio: 86000000,
          imagen: ""
        },
        {
          id: 8,
          nombre: "",
          precio: 83000000,
          imagen: ""
        }
      ]
    }
  },

  getters: {
    productosall: (state) => state.productos,
  },
})