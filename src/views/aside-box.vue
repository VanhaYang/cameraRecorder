<template>
  <div v-for="(i, index) in store.local" :key="index">
    <cameraView></cameraView>
  </div>
</template>
<script setup>
// import Camera from './camera.js';
import cameraView from './camera-view.vue';
import { useCameraStore } from '@/stores/localCamera';
// import { onMounted, ref } from 'vue';
let store = useCameraStore();
console.log(store.local);
// onMounted(() => {
//   console.log(useCameraStore());
//   list.value = useCameraStore().getLocal;
//   console.log();
//   console.log(list.value);
// });
</script>
