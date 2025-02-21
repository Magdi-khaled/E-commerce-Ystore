<script setup>
import { provide } from 'vue';
import { mapActions } from 'vuex/dist/vuex.cjs.js';
import { useStore } from 'vuex';

const store = useStore();

const handlePrice = (price, sale) => {
  if (sale === 0) return price.toFixed(2);
  return (price - (price * (sale / 100))).toFixed(2);
}
const handleQuantity = (type, item) => {
  if (type) {
    if (item.orderQuantity === item.quantity + 1) {
      // this.outStock = true;
      return;
    }
    item.orderQuantity++;
  }
  else {
    if (item.orderQuantity == 1) {
      store.dispatch('RemoveCartItem', item._id);

      // this.show = true;
      // setTimeout(() => { this.show = false }, 1500);
      return;
    }
    item.orderQuantity--;
    // this.outStock = false;
  }
}
provide('handlePrice', handlePrice);
provide('handleQuantity', handleQuantity);

</script>

<template>
  <router-view></router-view>
  <div id="loading" class="hidden">
    <div class="spinner"></div>
  </div>
</template>
