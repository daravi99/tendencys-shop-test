<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Logo" class="logo-img" />
      </router-link>
    </div>
    
    <div class="cart-container">
      <router-link to="/cart">
        <button class="cart-button">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            Carrito ({{ cartItemCount }})
        </button>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '../store/cart'; 
import { computed } from 'vue';

const cart = useCartStore();


const cartItemCount = computed(() => cart.items.length);
</script>
