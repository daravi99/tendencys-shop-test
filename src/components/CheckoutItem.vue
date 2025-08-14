<template>
    <div>
        <div v-if="loading && !item">Cargando...</div>
        <div v-else-if="item">
            <hr>
            <div class="cart-item">
                <div class="image-container">
                    <img :src="item.image" alt="Product Image" class="cart-image" />
                </div>
                <div class="product-detail">
                    <h3>{{ item.name }}</h3>
                    <p>${{ item.price.toFixed(2) }} {{ item.currency}}</p>
                    <hr style="border-top: 1px solid #80ac42;">
                    <div class="cart-actions adders">
                        <div v-if="isLastItem" @click="removeFromCart" class="action-text">
                            <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </div>
                        <div v-else @click="removeFromCart" class="action-text">-</div>
                        <div class="quantity-display">{{ currentQuantity }}</div>
                        <div @click="addToCart" class="action-text" >+</div>
                    </div>
                    <hr style="border-top: 1px solid #80ac42;">
                </div>    
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../store/cart';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const loading = ref(true);
const cart = useCartStore();

const isInCart = computed(() => {

  return cart.items.some(item => item.id === props.item?.id);
});


const isLastItem = computed(() => {
  const itemInCart = cart.items.find(item => item.id === props.item?.id);
  return itemInCart && itemInCart.quantity === 1;
});

const currentQuantity = computed(() => {
  const itemInCart = cart.items.find(item => item.id === props.item?.id);
  return itemInCart ? itemInCart.quantity : 0;
});

const outOfStock = computed(() => {
  return props.item?.quantity <= 0; 
});

const exceedsInventory = computed(() => {
  const itemInCart = cart.items.find(item => item.id === props.item?.id);
  return itemInCart && itemInCart.quantity > props.item?.quantity - 1;
});


const addToCart = () => {
  if (exceedsInventory.value) return;
  cart.addToCart(props.item); 
};
const currentQuantityInput = ref(currentQuantity.value);

watch(currentQuantity, (newQuantity) => {
  currentQuantityInput.value = newQuantity;
});

const removeFromCart = () => {
  cart.removeFromCart(props.item); 
};


const updateQuantity = () => {

  if (currentQuantityInput.value < 1) {
    currentQuantityInput.value = 0;
  }
  if (currentQuantityInput.value > props.item.quantity) {
    currentQuantityInput.value = props.item.quantity;
  }

  const updateditem = { ...props.item, quantity: currentQuantityInput.value };
  cart.updateQuantity(updateditem);
};

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
  padding: 5px;
}
</style>

