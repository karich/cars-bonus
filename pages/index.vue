<script setup>

import { useAppStore } from "/stores/AppStore.js";
import { apiNew } from "@/constants";

const appStore = useAppStore();

definePageMeta({
  name: 'index',
  layout: 'home'
});

if (!appStore.officialBrands?.brands?.length) {
	fetchClientWrapper(`${apiNew}filters/brands?exclude=9`)
		.then((res) => res.json())
		.then((data) => (appStore.officialBrands = data));
}

let currentCarsData = ref([])

function callback(n) {
    return currentCarsData.value = n
}
</script>

<template>
  <Slider />
  <section class="section__colored">
    <FilterNew @showCars="callback" />
    <OfficialBrands />
  </section>
  <CarsListNew :currentQuary="currentCarsData" />
  <BannerSP1 />
  <CarsHot />
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