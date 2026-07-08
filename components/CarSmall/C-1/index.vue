<script setup>
import Slider from "./Slider.vue";
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();

const props = defineProps(["car"]);
const car = computed(() => props.car);

const selectedImage = ref(0);
</script>

<template>
	<div class="car c-1" :class="{ 'current-car': car.id == $route.params.car }">
		<div class="card__garantee" v-if="car.warranty_year">
			Гарантия {{ getYear(car.warranty_year) }}
		</div>
		<div class="card__garantee" v-else>Гарантия 5 лет</div>

		<div class="car__img">
			<div class="car__slider">
				<div class="car__slider-wrapper" v-if="car.images.length">
					<NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
						<div class="slider__overflow">
							<div class="slider__overflow-list">
								<div
									class="slider__overflow-item"
									v-for="(slide, index) in car.images.slice(
										0,
										car.images.length > 10 ? 10 : car.images.length,
									)"
									:key="index"
									:style="{
										width:
											100 / (car.images.length > 10 ? 10 : car.images.length) +
											'%',
										height: '100%',
									}"
									@mouseenter="selectedImage = index"
									@mouseleave="selectedImage = 0"
									:class="{ active: selectedImage === index }"
								/>
							</div>
						</div>
					</NuxtLink>
					<div class="slider__item" v-if="car.images.length">
						<NuxtImg
							format="webp"
							:src="car.images[selectedImage].url"
							alt="car"
						/>
					</div>
					<div class="slider__item" v-else>
						<NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`"
							>Нет фото</NuxtLink
						>
					</div>
				</div>

				<div class="car__slider-wrapper" v-else>
					<NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
						<div class="slider__item second">
							<NuxtImg format="webp" :src="`${car.preview}`" alt="car" />
						</div>
					</NuxtLink>
				</div>

				<div class="car__slider-wrapper mobile" v-if="car.images.length">
					<Slider :carInfo="car" />
				</div>
				<div class="car__slider-wrapper mobile" v-else>
					<NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
						<div class="slider__item second">
							<NuxtImg
								lazy
								format="webp"
								quality="90"
								loading="lazy"
								:src="`${car.preview}`"
								alt="car"
							/>
						</div>
					</NuxtLink>
				</div>
			</div>
			<div class="car__stickers">
				<div class="sticker available">В наличии</div>
			</div>
		</div>

		<NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
			<div class="car__title">
				<h3 class="name">
					{{ cleanUpTitle(car.brand) }} {{ cleanUpTitle(car.model) }}
				</h3>
				<p class="complectation" v-if="car.complectation || car.modification">
					{{ car.complectation }} {{ car.modification }}
				</p>
				<!-- <p class="car__title-benefit">
          максимальная выгода <span>до {{ getNextMonday() }}*</span>
        </p> -->
			</div>
			<div class="car__price">
				<del class="car__price-old" v-if="car.sale">
					{{ makeSpaces(car.price) }} ₽
				</del>
				<p class="car__price-current">
					от {{ makeSpaces(car.price - car?.sale) }} ₽
				</p>
				<p class="car__price-month">
					в кредит
					<span>от {{ makeSpaces(appStore.calcMonthPrice(car)) }} ₽/мec.</span>
				</p>
			</div>
		</NuxtLink>
		<div class="car__controls">
			<BaseButtonModal
				:car="car"
				:btn-label="'Купить в кредит'"
				:app-type="2"
				:modal-title="`Купить в кредит ${cleanUpTitle(car.brand, car.model)}`"
				:btn-class="`credit`"
				category="new"
			/>

			<!-- <BaseButtonModal :car="car" :btn-label="'Заказать обратный звонок'" :app-type="6"
        :modal-title="`Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!`"
        :btn-class="`classic trade`" category="new" /> -->
		</div>
	</div>
</template>

<style scoped lang="scss">
.car {
	cursor: pointer;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	width: 100%;
	min-width: 280px;
	position: relative;
	border-radius: 28px;
	background: var(--bg-light);
	border: 1px solid transparent;
	box-shadow: 0px 2px 6px 0px #00000026;
	padding: 15px;
	padding-top: 30px;
	transition: all 0.3s ease;

	@media screen and (max-width: 540px) {
		padding: 10px;
		padding-top: 20px;
	}

	&:hover {
		border: var(--border);
		box-shadow: none;

		.car__img {
			margin-top: 10px;
			margin-bottom: 5px;
		}
	}

	.card__garantee {
		position: absolute;
		top: 15px;
		left: 15px;
		width: max-content;
		height: auto;
		font-weight: 500;
		font-size: var(--small-size);
		color: var(--bg-light);
		background: var(--linear-button);
		border-radius: 29px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		padding: 8px 10px;
		pointer-events: none;
		z-index: 10;

		@media screen and (max-width: 540px) {
			top: 10px;
			left: 10px;
		}
	}

	.car__title {
		.name {
			font-weight: 500;
			font-size: 24px;
			line-height: 26px;
			text-transform: capitalize;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 20px;
			margin-bottom: 10px;
		}

		.complectation {
			line-height: 24px;
			text-transform: uppercase;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 24px;
		}

		// .car__title-benefit {
		//   font-size: 15px;
		//   color: #6F6F6F;
		//   margin: 10px 0;

		//   & span {
		//     font-weight: 700;
		//     color: var(--main-black);
		//   }
		// }
	}

	.car__more-link {
		padding: 15px;
		background: var(--main-color);
		border: 1px solid var(--main-color);
		color: white;
		text-align: center;
		border-radius: 20px;
		width: auto;
		transition: 0.3s;

		&:hover {
			background: transparent;
			transition: 0.3s;
			color: var(--main-color);
		}
	}

	.car__price {
		display: flex;
		flex-direction: column;
		margin-bottom: 30px;

		.car__price-old {
			font-weight: 500;
			font-size: 18px;
			line-height: 22px;
			color: #a8a8a8;
		}

		.car__price-current {
			font-weight: 700;
			font-size: 30px;
			line-height: 42px;
		}

		.car__price-month {
			font-size: 16px;
			line-height: 22px;

			& span {
				font-weight: 500;
				color: var(--main-color);
			}
		}
	}

	.car__controls {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 11px;
	}

	.car__img {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin-bottom: 15px;
		transition: all 0.3s ease;

		.car__slider {
			height: 100%;

			.car__slider-wrapper {
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				height: 100%;

				@media screen and (max-width: 768px) {
					display: none;
					height: auto;
				}

				& a {
					display: flex;
					align-items: center;
					height: 100%;
				}

				.slider__item {
					height: 100%;
					width: 100%;
					margin: 0 auto;

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

				.second {
					height: 150px;
					img {
						object-fit: contain;
					}
				}

				.slider__overflow {
					width: 100%;
					height: 100%;
					position: absolute;
					background: transparent;

					.slider__overflow-list {
						display: flex;
						width: 100%;
						height: 100%;
						background: transparent;

						.slider__overflow-item {
							background: transparent;
						}

						.active {
							border-bottom: 5px solid var(--main-color);
						}
					}
				}
			}

			.car__slider-wrapper.mobile {
				display: none;

				@media screen and (max-width: 768px) {
					display: block;
				}
			}
		}

		.car__stickers {
			display: none;
			position: absolute;
			z-index: 10;
			top: 1px;
			left: 1px;
			background: transparent;

			.sticker {
				border-radius: 20px;
				background: white;
				text-align: center;
				z-index: 1;
				padding: 6px 8px;
				font-size: var(--small-size);
				line-height: normal;
			}

			.available {
				background: var(--secondary-color);
				color: white;
			}
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}

.current-car {
	display: none;
}

.recent {
	display: none;
	position: absolute;
	left: 15px;
	top: 15px;
	background: white;
	text-align: center;
	z-index: 100;
	padding: 8px 12px;
	border-radius: 20px;
}

.car__text {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
}
</style>
