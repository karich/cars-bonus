<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const items = ref([
  {
    id: 1,
    subtitle: `Госпрограмма`,
    title: `Семейный автомобиль`,
    image: '/images/banner/sp1/sp1-1.webp',
    description: `В Вашей семье есть, как минимум, один несовершеннолетний ребенок, что Вы можете подтвердить официальными документами.`,
  },
  {
    id: 2,
    subtitle: `Госпрограмма`,
    title: `Первый автомобиль`,
    image: '/images/banner/sp1/sp1-2.webp',
    description: `Вы не имели ранее какой-либо автомобиль и не оформляли какой-либо автокредит.`,
  },
  {
    id: 3,
    subtitle: `Выгодный TRADE-IN`,
    title: `Оценка по рынку`,
    image: '/images/banner/sp1/sp1-3.webp',
    link: '/trade-in',
  },
  {
    id: 4,
    subtitle: `Ставка по кредиту`,
    title: `от ${appStore.creditPercent}%`,
    image: '/images/banner/sp1/sp1-4.webp',
    link: '/credit',
  },
])
</script>

<template>
  <section class="banner-sp1 section">
    <div class="container">
      <div class="sp1__body">
        <div class="sp1__items">
          <BannerSP1Item v-for="item in items" :key="item.id" :item="item" />
        </div>
        <!-- <BannerTB1 v-if="$route.name !== 'credit'" /> -->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-sp1 {
  overflow: auto;
  margin-top: 0;

  .sp1__body {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px 55px;

    @media screen and (max-width: 1199px) {
      gap: 30px;
    }

    @media screen and (max-width: 1023px) {
      flex-direction: column;
    }

    .sp1__items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      width: 100%;

      @media screen and (max-width: 1199px) {
        flex-wrap: nowrap;
        overflow: auto;
        padding-bottom: 20px;
      }

      @media screen and (max-width: 540px) {
        gap: 10px;
      }
    }
  }
}

.page__text {
  .banner-sp1 {
    & .container {
      padding: 0;
    }
  }
}

.page__text-trade {
  .sp1__body {
    flex-direction: column-reverse;
    align-items: flex-start;

    @media screen and (max-width: 1024px) {
      align-items: center;
    }
  }
}
</style>