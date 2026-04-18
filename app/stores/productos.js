import { defineStore } from "pinia";

export const useStore = defineStore("productos", {
  state: () => ({
    productos: [],
    loading: false,
    error: null,
  }),

  getters: {
    productosall: (state) => state.productos,
  },

  actions: {
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
            imagen:
              "https://media.falabella.com/falabellaCO/65682315_1/w=1200,h=1200,fit=pad",
          },
          {
            id: 2,
            nombre: "Portátil Lenovo Ideapad Slim 3",
            precio: 2399900,
            imagen:
              "https://media.falabella.com.co/falabellaCO/73221262_1/width=240,height=240,quality=70,format=webp,fit=pad",
          },
          {
            id: 3,
            nombre: "Combo Teclado Y Mouse Gamer Jaltech Retroiluminado Gt300c",
            precio: 75900,
            imagen:
              "https://media.falabella.com/falabellaCO/119351473_01/w=1200,h=1200,fit=pad",
          },
          {
            id: 4,
            nombre:
              'Monitor Gamer 32 Viewsonic Curvo Full Mhd 180hz 1ms Vx3218 Black"',
            precio: 890000,
            imagen:
              "https://media.falabella.com/falabellaCO/151489247_01/w=1200,h=1200,fit=pad",
          },
          {
            id: 5,
            nombre: " auriculares usb",
            precio: 120000,
            imagen:
              "https://media.falabella.com/falabellaCO/119443688_01/w=1200,h=1200,fit=pad",
          },
          {
            id: 6,
            nombre: "Webcam Camara Web Linkon Fullhd 1080p Usb Microfono ",
            precio: 84990,
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
