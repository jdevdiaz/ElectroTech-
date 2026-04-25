<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const storeVentas = useVentas();
const router = useRouter();

const formValido = ref(false);
const cargando = ref(false);
const modalExito = ref(false);

const datos = ref({
  nombre: '',
  direccion: '',
  ciudad: '',
  tarjeta: '',
  expiracion: '',
  cvv: ''
});

const reglas = {
  requerido: v => !!v || 'Este campo es obligatorio',
  tarjeta: v => (v && v.length >= 16) || 'Tarjeta inválida (mínimo 16 dígitos)'
};

function procesarPago() {
  if (!formValido.value) return;
  
  cargando.value = true;
  
  // Simular llamada a pasarela de pago (2 segundos)
  setTimeout(() => {
    cargando.value = false;
    modalExito.value = true;
    storeVentas.vaciarCarrito();
  }, 2000);
}

function volverAlInicio() {
  modalExito.value = false;
  router.push('/');
}
</script>

<template>
  <div class="bg-grey-lighten-4 min-vh-100 py-6 py-md-10 px-4">
    <v-container max-width="1200">
      <!-- Encabezado -->
      <div class="mb-8 d-flex align-center">
        <v-btn icon="mdi-arrow-left" variant="text" @click="router.push('/')" class="mr-2 mr-md-4"></v-btn>
        <h1 class="text-h5 text-md-h4 font-weight-black text-grey-darken-4">Finalizar Compra</h1>
      </div>

      <v-row v-if="storeVentas.ventasall.length > 0">
        <!-- Formulario Izquierda -->
        <v-col cols="12" md="7" lg="8">
          <v-form v-model="formValido" @submit.prevent="procesarPago">
            
            <!-- Info Envío -->
            <v-card class="pa-6 rounded-xl mb-6" elevation="0" style="border: 1px solid rgba(0,0,0,0.04);">
              <h2 class="text-h6 font-weight-bold mb-4 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-truck-outline</v-icon>
                Información de Envío
              </h2>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="datos.nombre" label="Nombre completo" :rules="[reglas.requerido]" variant="outlined" density="comfortable" color="primary"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="datos.direccion" label="Dirección de entrega" :rules="[reglas.requerido]" variant="outlined" density="comfortable" color="primary"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="datos.ciudad" label="Ciudad" :rules="[reglas.requerido]" variant="outlined" density="comfortable" color="primary"></v-text-field>
                </v-col>
              </v-row>
            </v-card>

            <!-- Info Pago -->
            <v-card class="pa-6 rounded-xl" elevation="0" style="border: 1px solid rgba(0,0,0,0.04);">
              <div class="mb-6 d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-credit-card</v-icon>
                <h2 class="text-h6 font-weight-bold mb-0">Método de Pago</h2>
                <v-spacer></v-spacer>
                <!-- Logos de Tarjetas -->
                <v-icon color="#1434CB" class="mx-1" size="32">mdi-cc-visa</v-icon>
                <v-icon color="#EB001B" class="mx-1" size="32">mdi-cc-mastercard</v-icon>
                <v-icon color="#006FCF" class="mx-1" size="32">mdi-cc-amex</v-icon>
                <v-icon color="#003087" class="mx-1 d-none d-sm-flex" size="32">mdi-cc-paypal</v-icon>
              </div>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="datos.tarjeta" label="Número de tarjeta" :rules="[reglas.requerido, reglas.tarjeta]" variant="outlined" density="comfortable" color="primary" prepend-inner-icon="mdi-credit-card-outline" maxlength="19"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="datos.expiracion" label="Expiración (MM/AA)" :rules="[reglas.requerido]" variant="outlined" density="comfortable" color="primary" maxlength="5"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="datos.cvv" label="CVV" :rules="[reglas.requerido]" variant="outlined" density="comfortable" color="primary" maxlength="4" type="password"></v-text-field>
                </v-col>
              </v-row>

              <!-- Botón Pagar Móvil (se oculta en desktop) -->
              <div class="d-md-none mt-6">
                <v-btn
                  type="submit"
                  color="primary"
                  size="x-large"
                  block
                  class="font-weight-bold text-none rounded-lg"
                  elevation="2"
                  :loading="cargando"
                  :disabled="!formValido"
                >
                  Pagar ${{ storeVentas.totalPrecio.toLocaleString() }}
                </v-btn>
              </div>
            </v-card>
          </v-form>
        </v-col>

        <!-- Resumen Derecha -->
        <v-col cols="12" md="5" lg="4">
          <v-card class="pa-6 rounded-xl" elevation="0" style="border: 1px solid rgba(0,0,0,0.04); position: sticky; top: 100px;">
            <h2 class="text-h6 font-weight-bold mb-4">Resumen del pedido</h2>
            
            <v-list lines="two" bg-color="transparent" class="mb-4">
              <v-list-item
                v-for="item in storeVentas.ventasall"
                :key="item.id"
                class="px-0"
              >
                <template v-slot:prepend>
                  <v-avatar rounded size="60" class="bg-grey-lighten-4 border mr-3">
                    <v-img :src="item.imagen" style="mix-blend-mode: multiply;"></v-img>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-subtitle-2 font-weight-bold text-wrap" style="line-height: 1.2;">{{ item.nombre }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption mt-1">Cant: {{ item.cantidad }}</v-list-item-subtitle>
                <template v-slot:append>
                  <div class="font-weight-bold text-body-2">${{ (item.precio * item.cantidad).toLocaleString() }}</div>
                </template>
              </v-list-item>
            </v-list>

            <v-divider class="my-4"></v-divider>
            
            <div class="d-flex justify-space-between mb-2">
              <span class="text-grey-darken-1">Subtotal</span>
              <span class="font-weight-medium">${{ storeVentas.totalPrecio.toLocaleString() }}</span>
            </div>
            <div class="d-flex justify-space-between mb-4">
              <span class="text-grey-darken-1">Envío</span>
              <span class="font-weight-medium text-success">Gratis</span>
            </div>
            
            <v-divider class="mb-4"></v-divider>
            
            <div class="d-flex justify-space-between align-end">
              <span class="text-subtitle-1 font-weight-bold">Total</span>
              <span class="text-h5 font-weight-black text-primary">${{ storeVentas.totalPrecio.toLocaleString() }}</span>
            </div>

            <!-- Botón Pagar Desktop (se oculta en móvil) -->
            <v-btn
              color="primary"
              size="x-large"
              block
              class="d-none d-md-flex mt-6 font-weight-bold text-none rounded-lg"
              elevation="2"
              :loading="cargando"
              :disabled="!formValido"
              @click="procesarPago"
            >
              Procesar Pago
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Carrito vacío (Placeholder si entra sin items) -->
      <v-row v-else justify="center" align="center" style="min-height: 50vh;">
        <v-col cols="12" md="6" class="text-center">
          <v-icon size="100" color="grey-lighten-1" class="mb-6">mdi-cart-off</v-icon>
          <h2 class="text-h4 font-weight-black text-grey-darken-3 mb-2">Tu carrito está vacío</h2>
          <p class="text-body-1 text-grey-darken-1 mb-8">Debes agregar al menos un producto para proceder al pago.</p>
          <v-btn color="primary" size="large" class="font-weight-bold text-none rounded-pill px-8" @click="router.push('/')">
            Volver a la tienda
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Modal de Éxito -->
    <v-dialog v-model="modalExito" max-width="450" persistent>
      <v-card class="pa-6 rounded-xl text-center">
        <v-icon size="80" color="success" class="mx-auto mb-4">mdi-check-circle</v-icon>
        <v-card-title class="text-h4 font-weight-black text-success pt-0 px-0">
          ¡Pago Exitoso!
        </v-card-title>
        <v-card-text class="text-body-1 px-0 mt-2 text-grey-darken-2">
          Tu pedido ha sido procesado correctamente. En breve recibirás un correo con los detalles del envío y seguimiento.
        </v-card-text>
        <v-card-actions class="justify-center mt-4 pa-0">
          <v-btn
            color="primary"
            variant="flat"
            size="large"
            block
            class="text-none font-weight-bold rounded-lg"
            @click="volverAlInicio"
          >
            Volver a la tienda
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
