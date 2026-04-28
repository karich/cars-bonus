<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
const currentModel = computed(() => newStore.model)

const tradeSwitch = ref(true)
const creditSwitch = ref(true)
const salonSwitch = ref(true)

const rawSale = computed(() => currentModel.value.sale);

const rawTrade = computed(() => rawSale.value * appStore.tradeCalcPercent);
const rawCredit = computed(() => rawSale.value * appStore.creditCalcPercent);
const rawSalon = computed(() => rawSale.value * appStore.salonCalcPercent);

const tradeSale = computed(() => Math.round(rawTrade.value));
const creditSale = computed(() => Math.round(rawCredit.value));

const salonSale = computed(() => {
  const total = Math.round(rawSale.value);
  const sumTwo = tradeSale.value + creditSale.value;
  return total - sumTwo;
});

const totalSale = computed(() => {
  let total = 0;
  if (tradeSwitch.value) total += tradeSale.value
  if (creditSwitch.value) total += creditSale.value
  if (salonSwitch.value) total += salonSale.value
  newStore.modelSale = total
  return total
})

const props = defineProps({
  model: {
    type: Object,
    default: {}
  },
  modification: {
    type: Object,
    default: {}
  },
});

const mod = computed(() => findMod(newStore.modification, newStore.model.modifications));
const modList = computed(() => newStore.model.modifications.filter((mod) => mod.car_complectations.length));
const selectedComplectationId = ref(null);

function selectComplectation(id) {
  selectedComplectationId.value = id;

  const complectations = document.querySelectorAll('.complectations__item');
  complectations.forEach((item) => {
    item.classList.remove('active');
  });
  document.querySelector(`.complectations__item[data-id="${id}"]`).classList.add('active');
}
</script>

<template>
  <section class="complectations" v-if="currentMod?.car_complectations.length">
    <div class="complectations__wrapper">
      <div class="complectations__body">

        <div class="complectations-calculator">
          <div class="complectations-calculator__item trade" :class="{ 'active': tradeSwitch }">
            <div clas="complectations-calculator__switch">
              <div class="switch">
                <input type="checkbox" id="switch" :checked="tradeSwitch" @change="tradeSwitch = !tradeSwitch" />
                <label for="switch"></label>
              </div>
            </div>
            <div class="complectations-calculator__text" :class="{ 'active': tradeSwitch }">
              <span class="text">Trade-In</span>
              <span class="money">{{ makeSpaces(tradeSale) }} ₽</span>

            </div>
          </div>

          <div class="complectations-calculator__item credit" :class="{ 'active': creditSwitch }">
            <div clas="complectations-calculator__switch">
              <div class="switch">
                <input type="checkbox" id="credit" :checked="creditSwitch" @change="creditSwitch = !creditSwitch" />
                <label for="credit"></label>
              </div>
            </div>
            <div class="complectations-calculator__text" :class="{ 'active': creditSwitch }">
              <span class="text">В кредит</span>
              <span class="money">{{ makeSpaces(creditSale) }} ₽</span>
            </div>
          </div>

          <div class="complectations-calculator__item salon" :class="{ 'active': salonSwitch }">
            <div clas="complectations-calculator__switch">
              <div class="switch">
                <input type="checkbox" id="salon" :checked="salonSwitch" @change="salonSwitch = !salonSwitch" />
                <label for="salon"></label>
              </div>
            </div>
            <div class="complectations-calculator__text" :class="{ 'active': salonSwitch }">
              <span class="text">От автосалона</span>
              <span class="money">{{ makeSpaces(salonSale) }} ₽</span>
            </div>
          </div>

          <div class="complectations-calculator__item total"
            :class="{ 'activeTotal': tradeSwitch || creditSwitch || salonSwitch }">
            <div class="complectations-calculator__text">
              <p class="complectations-calculator__money">
                Максимальная выгода<br> при покупке до {{ getNextMonday() }}
              </p>
              <span>{{ makeSpaces(totalSale) }} ₽</span>
            </div>
          </div>
        </div>

        <BaseSectionTitle :title="`Доступные комплектации`" />

        <div class="choice__block" v-if="modList.length > 1">
          <p class="choice__block-title">Выбрать модификацию</p>
          <ul class="choice__list">
            <li class="choice__item" v-for="option in modList" :key="option.id"
              @click="newStore.modification = option.id" :class="{ 'active': newStore.modification === option.id }">
              {{ option.modification }}
            </li>
          </ul>
        </div>

        <div class="choice__block">
          <p class="choice__block-title">Выбрать комплектацию</p>
          <ul class="choice__list">
            <li class="choice__item" v-for="item in currentMod.car_complectations" :key="item.id"
              @click="selectComplectation(item.id)" :class="{ 'active': selectedComplectationId === item.id }"
              :data-id="item.id">
              {{ item.complectation }} {{ makeSpaces(item.price) }} ₽
            </li>
          </ul>
        </div>

        <BaseSectionTitle :title="`Авто в этой комплектации в наличии`" />

        <div class="complectations__list">
          <div class="complectations__item" v-for="item in mod?.car_complectations" :key="item.id"
            :class="{ active: newStore.modification === mod.id || selectedComplectationId === item.id }"
            :data-id="item.id">
            <div class="complectations__content">
              <BaseButtonModal :btn-label="'Подробнее'" :app-type="2" :btn-class="`comp`" :modalType="`modalComp`"
                :comp="item"
                :car="{ price: item.price, sale: totalSale, images: newStore.model.galleries, model: newStore.model.model, brand: newStore.model.brand }" />
              <div class="complectations__item-img">
                <div class="complectations__item-title">
                  {{ item.complectation }} {{ mod.modification }}
                </div>
                <NuxtImg lazy format="webp" quality="90" loading="lazy"
                  :src="currentModel.colored_galleries[newStore.color]?.url" alt="icon"
                  v-if="currentModel.colored_galleries.length" />
              </div>
              <div class="complectations__item-price">
                <div class="complectations__item-prices">
                  <del class="old" v-if="currentModel.sale && totalSale">
                    {{ makeSpaces(item.price) }} ₽
                  </del>
                  <span class="current"><span v-if="currentModel.sale && totalSale">от </span>
                    {{ makeSpaces(item.price - totalSale) }} ₽</span>
                </div>
                <div class="complectations__item-month-price">
                  от {{ makeSpaces(appStore.calcMonthPriceModel(totalSale, item.price)) }} ₽/мес*
                </div>
              </div>
            </div>
            <div class="complectations__item-buttons">
              <BaseButtonModal :btn-label="'Купить в кредит'" :app-type="2" :btn-class="`credit`"
                :car="{ price: item.price, sale: totalSale, images: newStore.model.galleries, model: newStore.model.model, brand: newStore.model.brand }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.complectations__body {
  .complectations-calculator {
    position: relative;
    display: grid;
    gap: 30px;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1.3fr;
    margin: 50px 0;

    @media screen and (max-width: 1400px) {
      gap: 15px;
      margin: 30px 0;
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 540px) {
      grid-template-columns: 1fr;
      gap: 20px;
      background: transparent;
      box-shadow: none;
      margin: 20px 0;
    }

    .complectations-calculator__item {
      position: relative;
      display: flex;
      gap: 15px;
      align-items: center;
      padding: 15px 20px;
      border-radius: 20px;
      background: #A6A6A6;
      border: 1px solid #A6A6A6;
      height: 100%;
      overflow: hidden;
      min-width: 225px;
      min-height: 80px;

      @media screen and (max-width: 540px) {
        padding: 10px;
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -215px;
        transform: translateY(-50%);
        width: 300px;
        height: 300px;
        background: var(--bg-light);
        border-radius: 50%;
        pointer-events: none;
      }

      .complectations-calculator__text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        margin: 0 auto;

        .money {
          font-size: var(--large-size);
          font-weight: 500;
          color: var(--bg-light);
        }

        .text {
          line-height: 22px;
          font-weight: 500;
          color: #A6A6A6;
          background: var(--bg-light);
          border-radius: 12px;
          text-align: center;
          padding: 0 5px;
        }

        .complectations-calculator__money {
          font-weight: 500;
          color: var(--bg-light);

          & span {
            display: inline-block;
            font-weight: 600;
            font-size: 19px;
          }

          .date {
            font-weight: 300;
          }
        }
      }

      div {
        background: transparent;
      }
    }

    .complectations-calculator__item.active {
      background: var(--linear-button);
      border: 1px solid var(--main-color);

      .money {
        color: var(--bg-light);
      }

      .text {
        color: var(--main-color);
      }
    }

    .complectations-calculator__item.total {
      position: initial;
      flex-wrap: nowrap;
      justify-content: center;
      font-size: var(--big-size);
      background: #333333;
      box-shadow: none;
      border: none;

      &::before {
        content: none;
      }

      .complectations-calculator__text {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2px 22px;
        margin: 0 auto;

        @media screen and (max-width: 540px) {
          flex-direction: column;
          gap: 5px;
          text-align: center;
        }

        .complectations-calculator__money {
          font-size: 16px;
        }
      }

      & span {
        color: var(--bg-light);

        @media screen and (max-width: 540px) {
          font-weight: 700;
          font-size: 26px;
          line-height: 30px;
          color: var(--main-color);
        }
      }
    }

    .complectations-calculator__item.activeTotal {
      border: none;

      &:hover {
        box-shadow: none;
      }
    }
  }

  .choice__block {
    display: grid;
    gap: 12px;
    margin-bottom: 20px;

    .choice__block-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }

    .choice__list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 20px;

      @media screen and (max-width: 540px) {
        flex-wrap: nowrap;
        gap: 10px;
        overflow: auto;
        padding-bottom: 15px;
      }

      .choice__item {
        font-weight: 500;
        border-radius: 8px;
        border: 1px solid #333333;
        padding: 13px 22px;
        cursor: pointer;

        @media screen and (max-width: 540px) {
          padding: 8px;
          min-width: max-content;
        }
      }

      .choice__item.active {
        color: var(--bg-light);
        background: var(--linear-button);
        border: 1px solid transparent;
      }
    }
  }

  .complectations__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding-bottom: 20px;

    @media screen and (max-width: 1439px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1023px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .complectations__item {
      position: relative;
      display: none;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-light);
      box-shadow: 0px 4px 10px 0px rgba(77, 87, 107, 0.2784313725);
      border-radius: var(--border-medium-radius);
      overflow: hidden;

      .complectations__content {
        width: 100%;
        padding: 17px 14px 14px;

        .complectations__item-img {
          display: grid;
          gap: 10px;

          .complectations__item-title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            text-transform: uppercase;
          }

          & img {
            width: 100%;
            height: 100px;
            object-fit: contain;
            margin: 10px auto;
          }
        }

        .complectations__item-price {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;

          .complectations__item-prices {
            display: flex;
            flex-direction: column;

            .current {
              font-weight: 600;
              font-size: 20px;
              line-height: 24px;
              color: var(--main-color);

              & span {
                font-weight: 600;
              }
            }

            .old {
              font-size: 16px;
              line-height: 20px;
              color: #787878;
            }
          }

          .complectations__item-month-price {
            font-weight: 500;
          }
        }
      }

      .complectations__item-buttons {
        width: 100%;
        padding: 14px;
        padding-top: 0;
      }
    }

    .active {
      display: flex;
    }
  }
}
</style>

<style lang="scss">
.complectations__content {
  &:hover {
    .comp {
      color: #333333;
      background: #ffffffba;
      backdrop-filter: blur(3px);
      opacity: 1;
    }
  }
}

.complectations__item-buttons {
  .credit {
    padding: 14px 8px;
  }
}
</style>