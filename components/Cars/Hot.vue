<script setup>
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const models = ref([])

fetchClientWrapper(`${apiNew}filters/models?model_tag_id=2`)
  .then(res => res.json())
  .then(data => models.value = data.models)

</script>

<template>
  <section class="section cars-hot">
    <div class="container">
      <div class="cars-hot__wrapper">
        <div class="cars-hot__header">
          <BaseTitle :title="`Вас может заинтересовать`" />
        </div>

        <div class="cars-hot__body cars-template">
          <div class="car" v-for="model in models">
            <CarSmallNM1 :model="model" />
          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<style lang="scss" scoped></style>