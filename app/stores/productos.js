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
            nombre: "Teclado Mecánico Redragon",
            precio: 180000,
            imagen: "https://m.media-amazon.com/images/I/71eapPCNHYL.jpg",
          },
          {
            id: 4,
            nombre: 'Monitor Samsung 24"',
            precio: 890000,
            imagen:
              "https://images.samsung.com/is/image/samsung/p6pim/co/ls24r350fhlxzl/gallery/co-t35f-ls24r350fhlxzl-530837687.jpg",
          },
          {
            id: 5,
            nombre: "Audífonos Sony WH-1000XM5",
            precio: 1200000,
            imagen: "https://m.media-amazon.com/images/I/61vJPgFqz-L.jpg",
          },
          {
            id: 6,
            nombre: "Webcam Logitech C920",
            precio: 420000,
            imagen: "https://m.media-amazon.com/images/I/61DKjDXFHHL.jpg",
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
