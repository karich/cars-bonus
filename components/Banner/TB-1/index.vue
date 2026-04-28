<script setup>
import { useAppStore } from "/stores/AppStore.js";
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const $route = useRoute();

const benefitsList = computed(() => {
  if ($route.name == 'model') {
    return [
      {
        title: '18 банков на выбор',
        icon: '/svg/benefit1.svg'
      },
      {
        title: 'В подарок зимняя резина',
        icon: '/svg/benefit2.svg'
      },
      {
        title: '-10% госпрограмма',
        icon: '/svg/benefit3.svg'
      },
      {
        title: `от ${appStore.creditPercent}% кредит`,
        icon: '/svg/benefit4.svg'
      },
    ]
  }
})
</script>

<template>
  <div class="model__benefits">
    <ul class="benefits__list">
      <li class="benefit__item" v-for="(benefit, index) in benefitsList" :key="benefit.index">
        <div class="benefit__img">
          <NuxtImg :src="benefit?.icon" :alt="benefit?.title" />
        </div>
        <p class="benefit__text">
          {{ benefit?.title }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.model__benefits {
  .benefits__list {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    @media screen and (max-width: 620px) {
      display: none;
    }

    .benefit__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      min-width: 99px;
      width: 99px;

      .benefit__img {
        & img {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }
      }

      .benefit__text {
        text-align: center;
      }
    }
  }
}
</style>