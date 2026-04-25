import { defineStore } from "pinia";

export const useStore = defineStore("productos", {
  state: () => ({
    productos: [],
    loading: false,
    error: null,
    searchQuery: "",
    categoriaSeleccionada: null,
  }),

  getters: {
    productosall: (state) => {
      let result = state.productos;
      
      if (state.categoriaSeleccionada) {
        result = result.filter(p => p.categoria === state.categoriaSeleccionada);
      }
      
      if (state.searchQuery) {
        const lower = state.searchQuery.toLowerCase();
        result = result.filter((p) => p.nombre.toLowerCase().includes(lower));
      }
      
      return result;
    },
  },

  actions: {
    setCategoria(categoria) {
      if (this.categoriaSeleccionada === categoria) {
        this.categoriaSeleccionada = null; // Toggle off if clicked again
      } else {
        this.categoriaSeleccionada = categoria;
      }
    },

    async fetchProductos() {
      this.loading = true;
      this.error = null;

      try {
        // Simulamos una llamada a API con setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1200));

        this.productos = [
          {
            id: 1,
            nombre: "Mouse Logitech MX Master 3",
            precio: 320000,
            categoria: "Accesorios",
            imagen:
              "https://media.falabella.com/falabellaCO/65682315_1/w=1200,h=1200,fit=pad",
          },
          {
            id: 2,
            nombre: "Portátil Lenovo Ideapad Slim 3",
            precio: 2399900,
            categoria: "Portátiles",
            imagen:
              "https://media.falabella.com.co/falabellaCO/73221262_1/width=240,height=240,quality=70,format=webp,fit=pad",
          },
          {
            id: 3,
            nombre: "Combo Teclado Y Mouse Gamer Jaltech Retroiluminado Gt300c",
            precio: 75900,
            categoria: "Gaming",
            imagen:
              "https://media.falabella.com/falabellaCO/119351473_01/w=1200,h=1200,fit=pad",
          },
          {
            id: 4,
            nombre:
              'Monitor Gamer 32 Viewsonic Curvo Full Mhd 180hz 1ms Vx3218 Black"',
            precio: 890000,
            categoria: "Gaming",
            imagen:
              "https://media.falabella.com/falabellaCO/151489247_01/w=1200,h=1200,fit=pad",
          },
          {
            id: 5,
            nombre: " Auriculares usb",
            precio: 120000,
            categoria: "Audio",
            imagen:
              "https://media.falabella.com/falabellaCO/119443688_01/w=1200,h=1200,fit=pad",
          },
          {
            id: 6,
            nombre: "Webcam Camara Web Linkon Fullhd 1080p Usb Microfono ",
            precio: 84990,
            categoria: "Accesorios",
            imagen:
              "https://media.falabella.com/falabellaCO/119399366_01/w=1200,h=1200,fit=pad",
          },
        ];
      } catch (e) {
        this.error = "No se pudieron cargar los productos.";
      } finally {
        this.loading = false;
      }
    },
  },
});
