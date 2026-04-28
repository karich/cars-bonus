<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
  <section class="models__section section">
    <div class="container">
      <div class="section__header">
        <BaseSectionTitle :title="`Популярные модели`" />
      </div>
      <div class="section__body">
        <div class="models__wrapper">
          <div class="models__list">
            <CarSmallNM1 v-for="model in newStore.models" :key="model.id" :model="model" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.models__wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.models__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-bottom: 10px;

  @media screen and (max-width: 1439px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>