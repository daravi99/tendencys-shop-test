<template>
  <div class="product-card">
    <router-link :to="`/products/${product.id}`">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <h3>{{ product.name }}</h3>
    </router-link>
    <p>${{ product.price.toFixed(2) }} {{ product.currency }}</p>
    <div v-if="isInCart" class="cart-actions">
        <div v-if="isLastItem" @click="removeFromCart" class="action-text"><font-awesome-icon icon="fa-solid fa-trash-can" /></div>
        <div v-else @click="removeFromCart" class="action-text">-</div>
        <div class="quantity-display">{{ currentQuantity }}</div>
        <div @click="addToCart" class="action-text" :class="{ disabled: exceedsInventory}">+</div>
    </div>
    <div v-else class="cart-actions">
      <button @click="addToCart" class="cart-button" :disabled="outOfStock">Agregar al carrito</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useCartStore } from '../store/cart';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cart = useCartStore();

const isInCart = computed(() => {
  return cart.items.some(item => item.id === props.product.id);
});

const exceedsInventory = computed(() => {
  const productInCart = cart.items.find(item => item.id === props.product?.id);
  return productInCart && productInCart.quantity > props.product?.quantity - 1;
});

const outOfStock = computed(() => {
  return props.product?.quantity <= 0; 
});

const isLastItem = computed(() => {
  const productInCart = cart.items.find(item => item.id === props.product.id);
  return productInCart && productInCart.quantity === 1;
});

const currentQuantity = computed(() => {
  const productInCart = cart.items.find(item => item.id === props.product.id);
  return productInCart ? productInCart.quantity : 0;  
});

const addToCart = () => {
  if (exceedsInventory.value) return;
  cart.addToCart(props.product);
};
const removeFromCart = () => {
  cart.removeFromCart(props.product);
};

</script>
<style scoped>
.disabled {
  pointer-events: none;
  background-color: gray;
}
.adders{
  border: 2px solid #80ac42;
  border-radius: 5px;
  padding: 5px;
}
</style>
