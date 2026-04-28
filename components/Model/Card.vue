<script setup>
import { useNewStore } from "/stores/NewStore.js";
import { useRoute } from "vue-router";
import { useAppStore } from "/stores/AppStore.js";

const newStore = useNewStore();
const appStore = useAppStore();
const $route = useRoute();

const modList = computed(() =>
  newStore.model.modifications?.filter((mod) => mod.car_complectations.length)
);

newStore.modification = modList.value?.[0]?.id;

const selectedCar = ref({
  mod: modList.value?.[0],
  comp: modList.value?.[0]?.car_complectations?.[0],
});

const car = computed(() => {
  return {
    price: selectedCar.value.comp.price,
    sale: newStore.model.sale,
    model: newStore.model.model,
    brand: newStore.model.brand,
    modification: selectedCar.value.mod.modification,
    complectation: selectedCar.value.comp.complectation,
    images: newStore.model.galleries,
  };
});

const loading = ref(true);
onMounted(() => {
  loading.value = false;
});

const show = ref(0);
</script>

<template>
  <section class="model__card">
    <div class="container">
      <BasePageTitle />
      <div class="model__container">
        <div class="model__left">
          <div class="model__garantee">
            <p v-if="
              newStore.model.warranty_year && newStore.model.warranty_km != 0
            ">
              Гарантия
              {{ getYear(newStore.model.warranty_year) }}<br>
              {{ newStore.model.warranty_km }} км
            </p>
            <p v-else>
              Гарантия 5 лет</br> 150 000 км
            </p>
          </div>
          <div class="model__img-block">
            <div class="model__img" v-for="(item, index) in newStore.model.colored_galleries" :key="item.color_id"
              v-show="show === index">
              <NuxtImg format="webp" :src="`${item.url}`"
                :alt="`Баннер ${newStore.model.brand} ${newStore.model.model}`" />
            </div>
            <div class="img__block-bottom">
              <div class="model__main-icons">
                <div class="model__main-icon" v-if="selectedCar.mod.max_speed">
                  <NuxtImg class="model__icon-img" src="/svg/param1.svg" alt="icon" />
                  <p>
                    {{ selectedCar.mod.max_speed }} км/ч<br>
                    <span>Скорость</span>
                  </p>
                </div>
                <div class="model__main-icon" v-if="selectedCar.mod.power">
                  <NuxtImg class="model__icon-img" src="/svg/param2.svg" alt="icon" />
                  <p>
                    {{ selectedCar.mod.power }} л.с.<br>
                    <span>Мощность</span>
                  </p>
                </div>
                <div class="model__main-icon" v-if="selectedCar.mod.consumption_combine">
                  <NuxtImg class="model__icon-img" src="/svg/param3.svg" alt="icon" />
                  <p>
                    {{ selectedCar.mod.consumption_combine }} л.<br>
                    <span>Расход</span>
                  </p>
                </div>
                <div class="model__main-icon" v-if="selectedCar.mod.from_0_to_100">
                  <NuxtImg class="model__icon-img" src="/svg/param4.svg" alt="icon" />
                  <p>{{ selectedCar.mod.from_0_to_100 }} сек.<br>
                    <span>Разгон</span>
                  </p>
                </div>
              </div>
              <div class="block__bottom-right">
                <div class="model__main-color">
                  <p class="car__name-color" v-for="(item, index) in newStore.model.colored_galleries"
                    :key="item.color_id" v-show="show === index">
                    {{ item.color.color }}
                  </p>
                  <div class="color__bar">
                    <div class="color__bar-item" v-for="(item, index) in newStore.model.colored_galleries"
                      :key="item.color_id" :style="item.color.hex_plus?.lenght > 1
                        ? `background: linear-gradient(90deg, ${item.color.hex} 50%, ${item.color.hex_plus} 50%);`
                        : `background: ${item.color.hex};`
                        " @click="(show = index), (newStore.color = index)">
                    </div>
                  </div>
                </div>
                <BannerTB1 />
              </div>
            </div>
          </div>
        </div>
        <div class="model__right">
          <div class="model__banner-form">
            <h2 class="model__form-title">{{ newStore.model.brand }} {{ newStore.model.model }}</h2>
            <p class="model__form-text">
              Получить индивидуальное предложение<br>
              на покупку <span>в кредит</span> от <span>{{ appStore.creditPercent }}%</span>
            </p>
            <FormBanner :car="car" class="model__form" />
            <div class="model__row-price">
              <p class="model__diff">
                от
                <span>{{ makeSpaces(newStore.model.min_price) }} ₽</span>
              </p>
              <del class="model__price" v-if="newStore.model.sale">
                от {{ makeSpaces(newStore.model.min_price + newStore.model.sale) }}
                ₽
              </del>
            </div>
            <p class="model__credit">
              в кредит
              <span>
                от {{ makeSpaces(appStore.calcMonthPriceModel(0, newStore.model.min_price)) }} ₽
              </span>
              в месяц
            </p>
          </div>
          <div class="model__buttons">
            <BaseButtonModal :car="car" :btn-label="'Купить в кредит'" :app-type="2"
              :modal-title="`Купить в кредит ${newStore.model.brand} ${newStore.model.model}`" :btn-class="`credit`" />
            <BaseButtonModal :car="car" :btn-label="'Обменять по Trade-In'" :app-type="8"
              :modal-title="`Обменять по Trade-In ${newStore.model.brand} ${newStore.model.model}`"
              :btn-class="`trade`" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.model__card {
  position: relative;
  overflow: hidden;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 30px;
  }

  .model__container {
    display: flex;
    justify-content: space-between;
    gap: 50px;

    @media screen and (max-width: 1199px) {
      gap: 30px;
    }

    @media screen and (max-width: 1023px) {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    @media screen and (max-width: 767px) {
      flex-direction: column;
    }

    .model__left {
      position: relative;
      z-index: 1;
      max-width: 700px;
      width: 100%;

      @media screen and (max-width: 767px) {
        max-width: 100%;
      }

      .model__garantee {
        background: var(--linear-button);
        border-radius: 50px;
        padding: 6px 24px;
        width: max-content;
        margin-left: auto;
        margin-bottom: 10px;

        & p {
          font-weight: 700;
          color: var(--bg-light);
          text-transform: uppercase;
          text-align: center;
          background: transparent;
        }
      }

      .model__img-block {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media screen and (max-width: 1023px) {
          align-items: center;
        }

        .model__img {
          max-width: 540px;
          width: auto;
          height: 240px;

          @media screen and (max-width: 767px) {
            max-width: 300px;
            height: auto;
          }

          img {
            width: 100%;
            min-height: 150px;
            height: 100%;
            object-fit: contain;
          }
        }

        .img__block-bottom {
          display: flex;
          justify-content: space-between;
          gap: 20px 0;
          width: 100%;

          @media screen and (max-width: 620px) {
            flex-direction: column-reverse;
            justify-content: center;
          }

          .model__main-icons {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            width: max-content;

            @media screen and (max-width: 620px) {
              display: grid;
              grid-template-columns: 1fr 1fr;
              width: 100%;
            }

            .model__main-icon {
              display: flex;
              align-items: center;
              gap: 10px;

              @media screen and (max-width: 620px) {
                width: 140px;
                margin: 0 auto;
              }

              .model__icon-img {
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

          .block__bottom-right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 35px;
            width: 100%;
            margin: 0 auto;

            @media screen and (max-width: 1023px) {
              align-items: initial;
            }

            @media screen and (max-width: 620px) {
              gap: 0;
            }

            .model__main-color {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 25px;

              @media screen and (max-width: 540px) {
                gap: 5px;
              }

              .color__bar {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;

                .color__bar-item {
                  width: 30px;
                  height: 30px;
                  cursor: pointer;
                  border-radius: 50%;
                  border: 1px solid #BEC0C4;
                }
              }

              .car__name-color {
                font-weight: 500;
                font-size: 16px;
                line-height: 18px;
                text-align: center;
              }
            }
          }
        }
      }
    }

    .model__right {
      position: relative;
      z-index: 1;
      max-width: 460px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      @media screen and (max-width: 1023px) {
        max-width: 700px;
      }

      .model__banner-form {
        background: var(--bg-light);
        box-shadow: 0px 4px 10px 0px #4d576b47;
        border-radius: var(--border-medium-radius);
        padding: 25px 30px;
        width: 100%;

        @media screen and (max-width: 1023px) {
          padding: 20px 15px;
        }

        @media screen and (max-width: 540px) {
          padding: 15px 10px;
        }

        @media screen and (max-width: 359px) {
          padding: 12px 8px;
        }

        .model__form-title {
          font-weight: 800;
          font-size: 28px;
          line-height: 32px;
          text-align: center;
          margin-bottom: 10px;

          @media screen and (max-width: 540px) {
            font-weight: 700;
            font-size: 22px;
            line-height: 28px;
          }
        }

        .model__form-text {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          text-align: center;

          @media screen and (max-width: 540px) {
            font-size: 14px;
            line-height: 18px;
          }

          & span {
            font-weight: 500;
            color: var(--main-color);
          }
        }

        .model__form {
          @media screen and (max-width: 540px) {
            gap: 12px;
            padding: 12px 0;
          }
        }

        .model__row-price {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 10px 20px;

          @media screen and (max-width: 359px) {
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            gap: 0;
          }

          .model__diff {
            font-weight: 800;
            font-size: 25px;
            line-height: 30px;

            & span {
              font-weight: 800;
              font-size: 28px;

              @media screen and (max-width: 359px) {
                color: var(--main-color);
              }
            }
          }

          .model__price {
            display: block;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            color: #787878;

            @media screen and (max-width: 359px) {
              font-weight: 500;
              font-size: 22px;
              line-height: 26px;
            }
          }
        }

        .model__credit {
          font-size: 16px;
          line-height: 18px;
          margin-top: 5px;

          & span {
            font-weight: 700;
            color: var(--main-color);
          }

          @media screen and (max-width: 359px) {
            text-align: center;
          }
        }
      }

      .model__buttons {
        display: flex;
        align-items: center;
        gap: 25px;
        width: 100%;
        margin-top: 20px;

        @media screen and (max-width: 1199px) {
          gap: 10px;
        }

        @media screen and (max-width: 1023px) {
          flex-direction: column;
          gap: 15px;
        }

        @media screen and (max-width: 767px) {
          flex-direction: row;
        }

        @media screen and (max-width: 425px) {
          flex-direction: column;
        }
      }
    }
  }
}
</style>
