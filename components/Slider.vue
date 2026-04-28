<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();

const currentSlide = ref(0);

const slides = ref([
  {
    title: "Новинки DONGFENG в России!",
    text: "Современный дизайн и оснащение",
    image: "images/slider/main1.webp",
    list1: "простор и комфорт",
    list2: "экономия топлива",
    list3: "богатое оснащение",
    list4: "безопасность",
  },
  {
    title: "GEELY ATLAS NEW в наличии",
    text: "Автомобили, проверенные временем",
    image: "images/slider/main2.webp",
    list1: "современный дизайн",
    list2: "простор и комфорт",
    list3: "богатое оснащение",
    list4: "безопасность",
  },
  {
    title: "LADA VESTA NEW в наличии",
    text: "Улучшенная управляемость и вместительность",
    image: "images/slider/main3.webp",
    list1: "практичность",
    list2: "доступная цена",
    list3: "обновленный интерьер",
    list4: "проходимость",
  },
]);

const loading = ref(true);
onMounted(() => {
  loading.value = false;
});

function prev() {
  currentSlide.value--;
  if (currentSlide.value < 0) {
    currentSlide.value = slides.value.length - 1;
  }
}
function next() {
  currentSlide.value++;
  if (currentSlide.value > slides.value.length - 1) {
    currentSlide.value = 0;
  }
}
</script>
<!-- :autoplay="6000" -->
<template>
  <section class="main__slider">
    <div class="container">
      <BasePageTitle />
    </div>
    <Carousel id="gallery" :pauseAutoplayOnHover="true" :transition="300" :items-to-show="1" :wrap-around="true"
      v-model="currentSlide" :mouseDrag="true">
      <Slide v-for="(slide, index) in slides" :key="index">
        <NuxtImg format="webp" class="slide__img" :src="slide.image" alt="car" />
        <div class="carousel__item">
          <h2 class="slide__title">{{ slide.title }}</h2>
          <p class="slide__text">
            {{ slide.text }}
          </p>
          <ul class="slide__list">
            <li>{{ slide.list1 }}</li>
            <li>{{ slide.list2 }}</li>
            <li>{{ slide.list3 }}</li>
            <li>{{ slide.list4 }}</li>
          </ul>
          <BaseButtonModal :btnLabel="'Оставить заявку'"
            :modalTitle="`Оставьте заявку и наш специалист перезвонит Вам в течение 15 минут!`" :appType="6"
            btnClass="main__slider-btn" />
        </div>
      </Slide>

      <template #addons>
        <button class="carousel__prev" @click="prev"></button>
        <button class="carousel__next" @click="next"></button>
        <Pagination />
      </template>
    </Carousel>
  </section>
</template>

<style scoped lang="scss">
.main__slider {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;

  .carousel__slide {
    position: relative;
    height: 513px;
    border-radius: 36px;
    overflow: hidden;
    justify-content: initial;
    border: var(--border);

    @media screen and (max-width: 1023px) {
      border-radius: 30px;
    }

    @media screen and (max-width: 540px) {
      display: flex;
      flex-direction: column;
      border-radius: 15px;
    }

    .slide__img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 68% 50%;
      z-index: -1;

      @media screen and (max-width: 540px) {
        position: initial;
        object-position: 100% 50%;
      }
    }

    .carousel__item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: left;
      padding: 0 40px;
      background: #FFFFFFE5;
      border-radius: 0 33px 33px 0;
      height: calc(100% - 60px);

      @media screen and (max-width: 1023px) {
        padding: 0 20px;
      }

      @media screen and (max-width: 767px) {
        max-width: 450px;
      }

      @media screen and (max-width: 540px) {
        max-width: 100%;
        padding: 0 10px;
      }

      .slide__title {
        font-weight: 700;
        font-size: 38px;
        line-height: 44px;
        text-transform: uppercase;
        margin-top: 40px;
        margin-bottom: 30px;

        @media screen and (max-width: 1023px) {
          font-size: 24px;
          line-height: 32px;
        }

        @media screen and (max-width: 540px) {
          margin-top: 30px;
          margin-bottom: 20px;
        }

        @media screen and (max-width: 425px) {
          font-size: 22px;
          margin-top: 20px;
          margin-bottom: 10px;
          max-width: 210px;
        }
      }

      .slide__text {
        font-weight: 500;
        font-size: 24px;
        line-height: 26px;
        background: transparent;
        margin-bottom: 30px;

        @media screen and (max-width: 1023px) {
          font-size: 21px;
        }

        @media screen and (max-width: 767px) {
          margin-bottom: 15px;
        }

        @media screen and (max-width: 540px) {
          font-size: 18px;
          line-height: 24px;
          margin-bottom: 0;
        }

        @media screen and (max-width: 374px) {
          font-size: 20px;
        }
      }

      .slide__list {
        display: flex;
        flex-wrap: wrap;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px 20px;
        max-width: 400px;
        margin-bottom: 40px;

        @media screen and (max-width: 1023px) {
          max-width: 300px;
          margin-bottom: 20px;
        }

        @media screen and (max-width: 767px) {
          margin-top: 10px;
        }

        @media screen and (max-width: 540px) {
          max-width: 100%;
        }

        @media screen and (max-width: 374px) {
          gap: 7px 20px;
        }

        & li {
          position: relative;
          font-size: 16px;
          line-height: 26px;
          padding-left: 30px;
          background: transparent;

          &::before {
            content: "";
            position: absolute;
            top: 3px;
            left: 0;
            width: 20px;
            height: 20px;
            background: url(/svg/main-list.svg) no-repeat center / contain;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.main__slider {
  .carousel__slide:nth-child(4) {
    .carousel__item {
      .slide__title {
        @media screen and (max-width: 425px) {
          max-width: 250px;
        }
      }
    }
  }
}
</style>
