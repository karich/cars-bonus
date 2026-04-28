<script setup>
import { useAppStore } from "/stores/AppStore.js";
import { useRoute } from "vue-router";

const appStore = useAppStore();
const $route = useRoute();

const showOfficial = ref(false);
const showParallel = ref(false);

function toggleOfficial() {
	showOfficial.value = !showOfficial.value;
}

function toggleParallel() {
	showParallel.value = !showParallel.value;
}
</script>

<template>
	<section class="brands__section section">
		<div class="container">
			<div class="brands__wrapper">
				<div
					class="brand__list-block"
					v-if="appStore?.officialBrands?.brands?.length"
				>
					<BaseSectionTitle :title="`Официальное дилерство`" />
					<ul class="brand__list">
						<li
							class="brand__item"
							v-for="brand in appStore?.officialBrands.brands"
							:key="brand.id"
							:class="{ 'brand__item--show': showOfficial }"
						>
							<router-link :to="`/cars/${brand.url_brand}`" class="brand__link">
								<div class="brand__info">
									<NuxtImg
										format="webp"
										class="brand__logo"
										:src="`${brand.logo}`"
										:alt="`${brand.brand}`"
									/>
									<div class="brand__count-block">
										<p>{{ brand.brand.toLowerCase() }}</p>
										<span>{{ brand.cars_count }} авто</span>
									</div>
								</div>
							</router-link>
						</li>
					</ul>
					<button class="brand__list-btn" @click="toggleOfficial()">
						<p>{{ showOfficial ? "Скрыть" : "Все марки авто" }}</p>
						<i
							class="fa-solid"
							:class="showOfficial ? 'fa-arrow-up' : 'fa-arrow-down'"
						></i>
					</button>
				</div>
				<div
					class="brand__list-block"
					v-if="
						$route.name !== 'index' && appStore?.parallelBrands?.brands?.length
					"
				>
					<BaseSectionTitle :title="`Параллельный импорт и авто под заказ`" />
					<ul class="brand__list">
						<li
							class="brand__item"
							v-for="brand in appStore?.parallelBrands.brands"
							:key="brand.id"
							:class="{ 'brand__item--show': showParallel }"
						>
							<router-link :to="`/cars/${brand.url_brand}`" class="brand__link">
								<div class="brand__info">
									<NuxtImg
										format="webp"
										class="brand__logo"
										:src="`${brand.logo}`"
										:alt="`${brand.brand}`"
									/>
									<div class="brand__count-block">
										<p>{{ brand.brand.toLowerCase() }}</p>
										<span>{{ brand.cars_count }} авто</span>
									</div>
								</div>
							</router-link>
						</li>
					</ul>
					<button class="brand__list-btn" @click="toggleParallel()">
						<p>{{ showParallel ? "Скрыть" : "Все марки авто" }}</p>
						<i
							class="fa-solid"
							:class="showParallel ? 'fa-arrow-up' : 'fa-arrow-down'"
						></i>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.brands__section {
	.section__header {
		display: flex;
		align-items: center;
		gap: 30px;
		flex-wrap: wrap;

		@media (max-width: 767px) {
			gap: 10px;
		}
	}

	.brand__list-block {
		margin-top: 40px;

		@media screen and (max-width: 767px) {
			margin-top: 30px;
		}

		.brand__list {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			gap: 15px 20px;

			@media screen and (max-width: 1199px) {
				gap: 10px 15px;
			}

			@media screen and (max-width: 1023px) {
				grid-template-columns: repeat(4, 1fr);
				gap: 10px;
			}

			@media screen and (max-width: 767px) {
				grid-template-columns: repeat(3, 1fr);
				gap: 5px;
			}

			@media screen and (max-width: 540px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media screen and (max-width: 375px) {
				gap: 10px 15px;
			}

			.brand__item {
				max-width: 262px;
				width: 100%;
				height: 62px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border: 1px solid #d7d7d7;
				border-radius: var(--border-small-radius);
				padding: 11px 15px;
				transition: all 0.3s ease;

				@media screen and (max-width: 1199px) {
					padding: 10px;
				}

				@media screen and (max-width: 375px) {
					padding: 10px 5px;
				}

				.brand__link {
					width: 100%;
					height: 100%;

					.brand__info {
						display: flex;
						justify-content: space-between;
						align-items: center;
						gap: 5px;
						width: 100%;
						height: 100%;

						@media screen and (max-width: 375px) {
							flex-direction: row-reverse;
						}

						.brand__logo {
							width: 40px;
							height: 40px;
							object-fit: contain;

							@media screen and (max-width: 375px) {
								width: 35px;
								height: 35px;
							}
						}

						.brand__count-block {
							display: flex;
							flex-direction: column;

							@media screen and (max-width: 375px) {
								align-items: flex-end;
							}

							& p {
								font-size: 16px;
								line-height: 20px;
								text-transform: uppercase;

								@media screen and (max-width: 375px) {
									font-weight: 600;
									font-size: 13px;
								}
							}

							& span {
								display: block;
								font-size: 16px;
								line-height: 20px;
								color: #797979;

								@media screen and (max-width: 375px) {
									font-weight: 600;
									font-size: 13px;
								}
							}
						}
					}
				}

				&:nth-child(n + 7) {
					@media screen and (max-width: 540px) {
						display: none;
					}
				}
			}

			.brand__item--show {
				&:nth-child(n + 7) {
					display: block;
				}
			}
		}

		.brand__list-btn {
			display: none;
			width: 100%;
			height: 44px;
			font-weight: 400;
			font-size: 16px;
			line-height: 20px;
			color: var(--bg-light);
			background: var(--main-color);
			border: 1px solid var(--main-color);
			border-radius: 14px;
			margin-top: 15px;
			transition: all 0.3s ease;

			@media screen and (max-width: 540px) {
				display: block;
			}

			& p {
				background: transparent;
			}
		}
	}

	.brand__list-block:first-child {
		margin-top: 0;
	}
}
</style>