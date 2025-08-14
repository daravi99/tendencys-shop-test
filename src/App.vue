<template>
  <div>
    <Header />
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from './store/cart';
import Header from './components/Header.vue'
const cart = useCartStore();
</script>
