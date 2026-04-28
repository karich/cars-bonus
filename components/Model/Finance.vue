<script setup>
import { useNewStore } from "/stores/NewStore.js";
const newStore = useNewStore();

import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();

const modList = computed(() =>
  newStore.model.modifications?.filter((mod) => mod.car_complectations.length)
);
newStore.modification = modList.value?.[0]?.id;

const currentMod = computed(() =>
  findMod(newStore.modification, newStore.model.modifications)
);

const loading = ref(true);
onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <section class="model-finance section">
    <div class="container">
      <ClientOnly v-if="!loading">
        <div class="model-finance__wrapper">
          <div class="model-finance__body">
            <FormModel :model="newStore.model" :modification="currentMod" category="new" />
          </div>
          <div class="model-finance__header section__header">
            <div class="model-finance__info">
              <p class="finance__content-text">
                <span>{{
                  cleanUpTitle($route.params.brand).toUpperCase()
                }}
                  Finance</span>
                – это выгодная кредитная программа, позволяющая нашим клиентам
                реализовать мечту об автомобиле. Предлагаемые процентные ставки
                начинаются всего от <b>{{ appStore.creditPercent }}%</b>, а
                ежемесячные платежи установлены на минимальном уровне. Процесс
                оформления кредита сделан простым и оперативным, с возможностью
                получения кредита в тот же день. Программа создана дилерским
                центром <b>«{{ appStore.siteName }}»</b> при поддержке таких
                банков, как "ЛокоБанк", "Альфа-Банк" и "СовкомБанк".
              </p>
              <h3 class="finance__content-title">Льготные условия</h3>
              <p class="finance__content-text">
                Программа Finance стремится предоставить каждому клиенту
                минимально возможные процентные ставки и низкие ежемесячные
                платежи. Благодаря её гибкости, автокредит доступен широкому
                кругу клиентов на самых привлекательных условиях.
              </p>
              <h3 class="finance__content-title">Без первоначального взноса</h3>
              <p class="finance__content-text">
                Для получения кредита не требуется первоначальный взнос, что
                является уникальным предложением по сравнению с большинством
                банков. Автоцентр <b>«{{ appStore.siteName }}»</b>
                предлагает своим клиентам первый взнос в виде беспроцентной
                рассрочки.
              </p>
              <h3 class="finance__content-title">Скидки и подарки</h3>
              <p class="finance__content-text">
                При оформлении автокредита по программе Finance вы получите
                значительную <b>скидку в размере 10%</b> на выбранный
                автомобиль, а также возможность выбора одного из трёх
                <b>подарков</b>: страхование КАСКО/ОСАГО, зимние шины или
                автомобильный коврик.
              </p>
            </div>
          </div>
        </div>
      </ClientOnly>

      <div class="model-finance__wrapper" v-else>
        <div class="model-finance__header section__header">
          <div class="skeleton text" />
        </div>

        <div class="model-finance__body">
          <div class="skeleton image" />
          <div class="skeleton text" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.model-finance {
  .model-finance__wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 30px;

    @media screen and (max-width: 1023px) {
      gap: 20px;
    }

    @media screen and (max-width: 767px) {
      flex-direction: column;
    }

    .model-finance__body {
      width: 50%;
      height: max-content;
      background: #f3f3f3;
      border-radius: var(--border-medium-radius);
      padding: 20px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }

      @media screen and (max-width: 540px) {
        padding: 20px 10px;
      }
    }

    .model-finance__header {
      width: 48%;
      padding-top: 300px;

      @media screen and (max-width: 1023px) {
        padding-top: 460px;
      }

      @media screen and (max-width: 767px) {
        padding-top: 0;
        width: 100%;
      }

      .model-finance__info {
        p {
          font-size: 16px;
          line-height: 22px;
          padding-bottom: 10px;
        }

        span {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
