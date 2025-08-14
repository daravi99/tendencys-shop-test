
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []  
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.items.find(item => item.id === product.id);
      if (existingProduct) {
        
        existingProduct.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(product) {
      const productIndex = this.items.findIndex(item => item.id === product.id);
      if (productIndex > -1) {
        const product = this.items[productIndex];
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          this.items.splice(productIndex, 1);
        }
      }
    },
    updateQuantity(updatedProduct) {
      const productInCart = this.items.find(item => item.id === updatedProduct.id);

      if (productInCart) {
        const newQuantity = Math.max(1, Math.min(updatedProduct.quantity, updatedProduct.stock));

        productInCart.quantity = newQuantity;
      }
    },
  }
});
