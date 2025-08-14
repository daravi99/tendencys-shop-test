<template>
  <div>
    <div v-if="product">
      <div class="return-button-container">
        <button @click="goBack" class="return-button">Regresar</button>
      </div>
      <div class="product-list">
        <div class="image-container">
          <img :src="product.image" alt="Product Image" class="product-image" />
        </div>
        <div class="product-detail">
          <h2>{{ product.name }}</h2>
          <hr>
          <h3>${{ product.price.toFixed(2) }} {{ product.currency}}</h3>
          <p>{{ product.description }}</p>
          <p>Inventario disponible: {{ product.quantity }} </p>
          <div v-if="isInCart" class="cart-actions adders">
            <div v-if="isLastItem" @click="removeFromCart" class="action-text">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </div>
            <div v-else @click="removeFromCart" class="action-text">-</div>
            <input
              v-model.number="currentQuantityInput"
              @input="updateQuantity"
              type="number"
              :min="0"
              :max="product.quantity"
              class="quantity-input"
            />
            <div @click="addToCart" class="action-text" :class="{ disabled: exceedsInventory}" >+</div>
          </div>
          <div v-else class="cart-actions">
            <button @click="addToCart" class="cart-button" :disabled="outOfStock">{{outOfStock ? 'Agotado' : 'Agregar al carrito' }}</button>
          </div>
          <hr>
          <div>
              <h3>Dimensiones</h3>
              <p>Largo: {{ product.dimensions.length }} {{ product.units.length }}</p>
              <p>Alto: {{ product.dimensions.height }} {{ product.units.height }}</p>
              <p>Ancho: {{ product.dimensions.width }} {{ product.units.width }}</p>
              <p>Peso: {{ product.dimensions.weigth }} {{ product.units.weigth }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Cargando...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cart';

const product = ref(null);
const loading = ref(true);
const cart = useCartStore();
const router = useRouter();

const isInCart = computed(() => {

  return cart.items.some(item => item.id === product.value?.id);
});

const isLastItem = computed(() => {
  const productInCart = cart.items.find(item => item.id === product.value?.id);
  return productInCart && productInCart.quantity === 1;
});

const currentQuantity = computed(() => {
  const productInCart = cart.items.find(item => item.id === product.value?.id);
  return productInCart ? productInCart.quantity : 0;
});

const outOfStock = computed(() => {
  return product.value?.quantity <= 0; 
});

const exceedsInventory = computed(() => {
  const productInCart = cart.items.find(item => item.id === product.value?.id);
  return productInCart && productInCart.quantity > product.value?.quantity - 1;
});

const goBack = () => {
  router.go(-1); 
};

const mockProductData = {
  id: 11,
  name: "Producto 11",
  description: "descripcion",
  price: 19.99,
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
};

const fetchProduct = async () => {
  setTimeout(() => {
    product.value = mockProductData;
    loading.value = false;
  }, 1000);
};

const addToCart = () => {
  if (exceedsInventory.value) return;
  cart.addToCart(product.value); 
};
const currentQuantityInput = ref(currentQuantity.value);

watch(currentQuantity, (newQuantity) => {
  currentQuantityInput.value = newQuantity;
});

const removeFromCart = () => {
  cart.removeFromCart(product.value); 
};


const updateQuantity = () => {

  if (currentQuantityInput.value < 1) {
    currentQuantityInput.value = 0;
  }
  if (currentQuantityInput.value > product.value.quantity) {
    currentQuantityInput.value = product.value.quantity;
  }

  const updatedProduct = { ...product.value, quantity: currentQuantityInput.value };
  cart.updateQuantity(updatedProduct);
};

onMounted(fetchProduct);
</script>

<style scoped>
.disabled {
  pointer-events: none;
  background-color: gray;
}
.quantity-input {
  width: 33%;
  text-align: center;
  padding: 5px;
  margin: 0 10px;
}
.adders{
  border: 2px solid #80ac42;
  border-radius: 5px;
  padding: 5px;
}
</style>

