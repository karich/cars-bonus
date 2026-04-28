<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
  <section class="section__map">
    <div class="map">
      <iframe :src="`${appStore?.yandexMap}`" width="100%" height="100%" frameborder="0">
      </iframe>
    </div>
  </section>
</template>



<style lang="scss" scoped>
.section__map {
  .map {
    width: 100%;
    height: 500px;

    @media screen and (max-width: 767px) {
      height: 300px;
    }
  }
}
</style>