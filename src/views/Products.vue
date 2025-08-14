<template>
  <div>
    <h2>PRODUCTOS</h2>
    <div v-if="loading && products.length === 0">Cargando...</div>
    <div v-else>
      <div class="product-list">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div v-if="loading" class="loading-indicator">Cargando...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useCartStore } from '../store/cart';
import axios from 'axios';


const products = ref([]);
const loading = ref(false);
const page = ref(1);
const limit = 10;

const cart = useCartStore();

const fetchProducts = async (pageNumber) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const mockData = Array.from({ length: limit }, (_, i) => ({
      id: pageNumber * limit + i + 1,
      name: `Producto ${pageNumber * limit + i + 1}`,
      description: "descripcion",
      price: (Math.random() * 100),
      image: 'https://m.media-amazon.com/images/I/61yEHZXdi6L.jpg',
      quantity: 3,
      dimensions:{
        width: 10,
        height: 10,
        length: 10,
        weigth: 20
      },
      units:{
        width: 'cm',
        height: 'cm',
        length: 'cm',
        weigth: 'kg'
      },
      currency: 'MXN'
    }));

    products.value = [...products.value, ...mockData];
    
    page.value++;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

const addToCart = (product) => {
  cart.addToCart(product);
};


const handleScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
  if (bottom && !loading.value) {
    fetchProducts(page.value);
  }
};


onMounted(() => {
  fetchProducts(page.value); 
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
