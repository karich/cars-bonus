<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { apiNew } from '@/constants';

definePageMeta({
  name: 'china',
})

if (appStore.chinaBrands.length == 0) {

  const chinaBrands = await fetchServerWrapper(`${apiNew}filters/brands?brand_tag_id=3`);
  console.log(chinaBrands);


  appStore.chinaBrands = chinaBrands.data.value
}

let currentQuary = ref([])

function callback(n) {
  currentQuary.value = n
}
</script>

<template>
  <Breadcrumbs />
  <ChinaBanner />
  <section class="section__colored">
    <FilterNew @showCars="callback" />
    <Brands />
  </section>
  <CarsListNew :currentQuary="currentQuary" />
  <BannerEB1 />
  <ChinaModels />
  <PageContent />
  <ModalAFK />
  <SEO />
</template>

<style lang="scss" scoped>
.section__colored {
  padding: 20px 0;
  display: grid;
  gap: 30px;
}
</style>