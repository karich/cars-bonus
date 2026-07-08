<script setup>
import { useAppStore } from "/stores/AppStore.js";
import { apiNew } from "@/constants";

const appStore = useAppStore();

definePageMeta({
	name: "cars",
});

// if (!appStore.officialBrands?.brands?.length) {
// 	fetchClientWrapper(`${apiNew}filters/brands?brand_tag_id=11`)
// 		.then((res) => res.json())
// 		.then((data) => (appStore.officialBrands = data));
// }

// if (!appStore.parallelBrands?.brands?.length) {
// 	fetchClientWrapper(`${apiNew}filters/brands?brand_tag_id=9`)
// 		.then((res) => res.json())
// 		.then((data) => (appStore.parallelBrands = data));
// }

let currentQuary = ref([]);

function callback(n) {
	currentQuary.value = n;
}
</script>

<template>
	<Breadcrumbs />
	<div class="container">
		<BasePageTitle />
	</div>
	<section class="section__colored">
		<FilterNew @showCars="callback" />
		<Brands />
		<!-- <OfficialBrands /> -->
	</section>
	<CarsListNew :currentQuary="currentQuary" />
	<ModalAFK />
	<SEO />
</template>

<style scoped lang="scss">
.section__colored {
	padding: 20px 0;
	display: grid;
	gap: 30px;
	margin-top: 0;
}
</style>
