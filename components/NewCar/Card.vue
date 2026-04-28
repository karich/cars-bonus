<script setup>
import { useNewCarStore } from "/stores/NewCarStore.js";
import { useAppStore } from "/stores/AppStore.js";

const appStore = useAppStore();
const carStore = useNewCarStore();

const car = ref([]);
car.value = carStore.car;

const sale = ref(car.value.sale);

onMounted(() => {
  yandexEcommerce("detail", car.value);
});

/*
viewed(car.value)

function viewed(car) {
    if (!appStore.checkViewed(car)) appStore.addViewed(car)
}

function favorite(car) {
    appStore.checkFavorite(car) ? appStore.removeFavorite(car) : appStore.addFavorite(car)
}

function comparison(car) {
    appStore.checkComparison(car) ? appStore.removeComparison(car) : appStore.addComparison(car)
}
*/

watch(
  () => carStore.car,
  (currentData) => {
    car.value = currentData;
  }
);

function updateSale(value) {
  sale.value = value;
}

const loading = ref(true);
onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <section class="car-card section">
    <div class="container">
      <BasePageTitle />
      <ClientOnly v-if="!loading">
        <div class="car-card__body">
          <div class="car-card__body-info">
            <h2 class="car-card__title-mob">{{ carStore.car.brand }} {{ carStore.car.model }} [{{ carStore.car.id }}]
            </h2>
            <ul class="car-card__params-list">
              <li class="car-card__param" v-if="car.color">
                <div class="car-card__param-title">Цвет:</div>
                <div class="car-card__param-value">{{ car.color }}</div>
              </li>
              <li class="car-card__param">
                <div class="car-card__param-title">Статус:</div>
                <div class="car-card__param-value">В наличии</div>
              </li>
              <li class="car-card__param" v-if="car.modification.modification">
                <div class="car-card__param-title">Модификация:</div>
                <div class="car-card__param-value">
                  {{ car.modification.modification }}
                </div>
              </li>
              <li class="car-card__param" v-if="car.complectation.complectation">
                <div class="car-card__param-title">Комплектация:</div>
                <div class="car-card__param-value">
                  {{ car.complectation.complectation }}
                </div>
              </li>
              <li class="car-card__param" v-if="car.drive">
                <div class="car-card__param-title">Привод:</div>
                <div class="car-card__param-value">{{ car.drive }}</div>
              </li>
            </ul>
            <ul class="car-card__icons">
              <li class="car-card__icon" v-if="car.modification.max_speed">
                <NuxtImg class="car-card__img" src="/svg/param1.svg" alt="icon" />
                <p>
                  {{ car.modification.max_speed }} км/ч<br>
                  <span>Скорость</span>
                </p>
              </li>
              <li class="car-card__icon" v-if="car.modification.from_0_to_100">
                <NuxtImg class="car-card__img" src="/svg/param2.svg" alt="icon" />
                <p>
                  {{ car.modification.from_0_to_100 }} сек.<br>
                  <span>Разгон</span>
                </p>
              </li>
              <li class="car-card__icon" v-if="car.modification.power">
                <NuxtImg class="car-card__img" src="/svg/param3.svg" alt="icon" />
                <p>
                  {{ car.modification.power }} л.с.<br>
                  <span>Мощность</span>
                </p>
              </li>
              <li class="car-card__icon" v-if="car.modification.consumption_combine">
                <NuxtImg class="car-card__img" src="/svg/param4.svg" alt="icon" />
                <p>
                  {{ car.modification.consumption_combine }} л.<br>
                  <span>Расход</span>
                </p>
              </li>
            </ul>
            <div class="car-card__prices">
              <div class="card-card__prices-content">
                <div class="car-card__price">
                  <p class="current">
                    от {{ makeSpaces(car.price - sale) }} ₽
                  </p>
                  <del class="old" v-if="car.sale && sale > 0">
                    {{ makeSpaces(car.price) }} ₽
                  </del>
                </div>
                <p class="payment">
                  в кредит от
                  <span>{{ makeSpaces(appStore.calcMonthPrice(car)) }} ₽</span>
                  в месяц
                </p>
              </div>
            </div>
            <div class="car-card__buttons">
              <BaseButtonModal :car="car" :btn-label="'Обменять по Trade-In'" :app-type="8"
                :modal-title="`Обменять по Trade-In ${car.brand} ${car.model}`" :btn-class="`trade`" category="new" />
              <BaseButtonModal :car="car" :btn-label="'Купить в кредит'" :app-type="2"
                :modal-title="`Купить в кредит ${car.brand} ${car.model}`" :btn-class="`credit`" category="new" />
            </div>
          </div>
          <div class="car-card__body-slider">
            <NewCarSlider :images="car.images.length ? car.images : carStore.galleries"
              :class="car.images.length ? '' : 'second'" :imagesType="car.images.length ? true : false"
              :preview="car.preview" />
          </div>
        </div>
      </ClientOnly>

      <div class="car-card__body" v-else>
        <div>
          <div class="skeleton text" />
          <div class="skeleton text" />
          <div class="skeleton text" />
          <div class="skeleton text" />
          <div class="skeleton text" />
          <div class="skeleton text" />
        </div>
        <div>
          <div class="skeleton image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.car-card {
  padding-bottom: 12px;
  padding-top: 0;

  .car-card__body {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    grid-template-areas: "info slider";
    gap: 20px;

    @media screen and (max-width: 1023px) {
      display: flex;
      flex-direction: column-reverse;
    }

    @media screen and (max-width: 768px) {
      padding: 0;
      gap: 15px;
    }

    .skeleton.image {
      height: 350px;
      border-radius: 16px;
    }

    .car-card__body-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      grid-area: info;
      width: 100%;
      background: var(--bg-light);
      box-shadow: 0px 4px 10px 0px rgba(77, 87, 107, 0.2784313725);
      border-radius: var(--border-medium-radius);
      padding: 25px;

      @media screen and (max-width: 1200px) {
        padding: 20px;
      }

      @media screen and (max-width: 540px) {
        padding: 20px 10px;
      }

      .car-card__title-mob {
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        text-transform: uppercase;
        margin-bottom: 30px;

        @media screen and (max-width: 767px) {
          font-size: 22px;
          line-height: 26px;
          margin-bottom: 20px;
        }
      }

      .car-card__params-list {
        position: relative;
        display: grid;
        gap: 10px;

        .car-card__param {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          line-height: 20px;

          @media screen and (max-width: 375px) {
            font-size: 14px;
          }

          .car-card__param-value {
            order: 2;
            font-weight: 500;
          }
        }
      }

      .car-card__icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px 25px;
        width: 100%;
        min-width: max-content;
        margin: 25px 0;

        @media screen and (max-width: 640px) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .car-card__icon {
          display: flex;
          align-items: center;
          gap: 10px;

          @media screen and (max-width: 640px) {
            max-width: 140px;
            width: 100%;
            margin: 0 auto;
          }

          .car-card__img {
            width: 42px;
            height: 42px;
            object-fit: contain;
          }

          p {
            font-weight: 500;
            text-transform: uppercase;

            & span {
              font-weight: 500;
              color: var(--main-color);
            }
          }
        }
      }

      .car-card__prices {
        display: grid;
        grid-template-columns: 1fr auto;

        @media screen and (max-width: 400px) {
          align-items: center;
        }

        .card-card__prices-button {
          height: max-content;
          padding: 18px;
          width: max-content;
          background: white;
          border-radius: 16px;
          transition: 0.1s;
          cursor: pointer;

          i {
            transition: 0.1s;
          }
        }

        .card-card__prices-button.active {
          background: var(--main-color);
          color: white;
          transition: 0.1s;

          i {
            transition: 0.1s;
          }
        }

        .card-card__prices-content {
          display: flex;
          flex-direction: column;
          gap: 7px;

          .car-card__price {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            gap: 10px;
            margin-bottom: 5px;

            .current {
              font-weight: 800;
              font-size: 28px;
              line-height: 32px;
            }

            .old {
              font-size: 16px;
              line-height: 20px;
              color: #787878;
            }
          }

          .payment {
            font-size: 16px;
            line-height: 20px;

            span {
              font-weight: 600;
              color: var(--main-color);
            }
          }
        }
      }

      .car-card__buttons {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr;
        margin-top: 25px;

        @media screen and (max-width: 425px) {
          grid-template-columns: 1fr;
        }
      }
    }

    .car-card__body-slider {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 1023px) {
        overflow: hidden;
        padding-bottom: 10px;
      }

      .car-card__body-slider-images {
        display: flex;
        gap: 12px;
        padding-top: 10px;

        @media screen and (max-width: 768px) {
          display: none;
        }

        img {
          width: 150px;

          &:first-child {
            border-bottom-left-radius: 15px;
          }

          &:last-child {
            border-bottom-right-radius: 15px;
          }
        }
      }
    }
  }
}
</style>
