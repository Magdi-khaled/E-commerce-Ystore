<script setup>
import { provide } from 'vue';

const handlePrice = (price, sale) => {
  if (sale === 0) return price.toFixed(2);
  return (price - (price * (sale / 100))).toFixed(2);
}
provide('handlePrice', handlePrice);
</script>

<template>
  <router-view></router-view>
  <div id="loading" class="hidden">
    <div class="spinner"></div>
  </div>
</template>
