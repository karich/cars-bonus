<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();

const brandShow = ref(false);

function showAll() {
	brandShow.value = !brandShow.value;
}
</script>

<template>
	<ul class="footer__brand-list">
		<li
			class="footer__brand-item"
			v-for="brand in appStore.newBrands"
			:key="brand.id"
			:class="{ 'footer__item-show': brandShow }"
		>
			<NuxtLink class="footer__brand-link" :to="`/cars/${brand.url_brand}`">
				<p>{{ brand.brand.toLowerCase() }}</p>
				<span>{{ brand.cars_count }}</span>
			</NuxtLink>
		</li>
	</ul>
	<button class="footer__brand-btn" @click="showAll()">
		{{ brandShow ? "Скрыть" : "Ещё" }}
	</button>
</template>

<style scoped lang="scss">
.footer__brand-list {
	display: block;
	columns: 3;
	column-gap: 34px;
	column-rule: 1px solid #f3f6f933;
	padding: 0 80px;
	margin: 0 80px;
	border-left: 1px solid #f3f6f933;
	border-right: 1px solid #f3f6f933;

	@media screen and (max-width: 1439px) {
		padding: 0 30px;
		margin: 0 30px;
	}

	@media screen and (max-width: 1199px) {
		columns: 4;
		padding: 0;
		margin: 0;
		border: none;
	}

	@media screen and (max-width: 1023px) {
		columns: 3;
	}

	.footer__brand-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
		min-width: max-content;
		padding: 6px 0;

		& p {
			font-weight: 500;
			line-height: 18px;
			text-transform: capitalize;
		}

		& span {
			font-weight: 700;
			line-height: 18px;
			color: var(--main-color);
		}

		// @media screen and (max-width: 1023px) {
		//   &:nth-child(n + 19) {
		//     display: none;
		//   }
		// }

		// @media screen and (max-width: 767px) {
		//   &:nth-child(n + 13) {
		//     display: none;
		//   }
		// }
	}

	// .footer__item-show {
	//   @media screen and (max-width: 1023px) {
	//     &:nth-child(n + 19) {
	//       display: block;
	//     }
	//   }

	//   @media screen and (max-width: 767px) {
	//     &:nth-child(n + 13) {
	//       display: block;
	//     }
	//   }
	// }
}

.footer__brand-btn {
	display: none;

	// @media screen and (max-width: 1023px) {
	//   display: block;
	//   width: 100%;
	//   height: 40px;
	//   color: var(--bg-light);
	//   background: var(--secondary-color);
	//   margin-top: 15px;
	// }
}
</style>
