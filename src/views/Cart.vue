<template>
  <div>
    <div class="return-button-container">
      <button @click="goBack" class="return-button">Regresar</button>
      <h2>Tu Carrito</h2>
    </div>
    <div v-if="cart.items.length === 0">Tu carrito está vacío.</div>
    <div v-else class="cart-container">
      <div class="items-column">
        <CheckoutItem
          v-for="item in cart.items"
          :key="item.id"
          :item="item"
        />
        <hr>
      </div>
      <div class="total-column">
        <div class="total-box">
          <h2>Total:</h2>
          <h3>${{ total.toFixed(2) }} {{ cart.items[0].currency }}</h3>
          <button @click="openForm" class="cart-button">Pagar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '../store/cart';
import CheckoutItem from '../components/CheckoutItem.vue';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const router = useRouter();

const total = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const goBack = () => {
  router.go(-1); 
};

</script>
<style scoped>


.cart-button {
  margin-top: 16px;
  align-self: flex-end; 
  cursor: pointer;
}
</style>
