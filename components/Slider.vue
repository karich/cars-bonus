<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();

const currentSlide = ref(0);

const slides = ref([
    {
      title: `АВТО<span>КРЕДИТ</span>`,
      text: "Ваш новый автомобиль уже сегодня!",
      image: "images/slider/slider_bonus1.webp",
      list1: `Ставка<br><span>от 0.01% годовых</span>`,
      list2: `Решение банка<br><span>за 30 минут</span>`,
      list3: `Первый взнос<br><span>от 0%</span>`,
      list4: `Более 50 банков<br><span>партнеров</span>`,
      list5: `Оформление<br><span>по 2 документам</span>`,
      list6: `КАСКО не обязательно<br><span>на первый год</span>`,
      list_img1: `svg/icon_bonus1.svg`,
      list_img2: `svg/icon_bonus2.svg`,
      list_img3: `svg/icon_bonus3.svg`,
      list_img4: `svg/icon_bonus4.svg`,
      list_img5: `svg/icon_bonus5.svg`,
      list_img6: `svg/icon_bonus6.svg`,
      link: '/credit',
      link_text: 'Оформить автокредит',
      right_img: '/svg/right_slider1.svg',
      right_text: `МЕЧТА БЛИЖЕ...<br><span>ЧЕМ ВЫ ДУМАЕТЕ</span>`
    },
    {
      title: `ТРЕЙД-<span>ИН</span>`,
      text: "Выгодно обменяй старый авто на новый!",
      image: "images/slider/slider_bonus2.webp",
      list1: `Выгодная оценка<br><span>вашего автомобиля</span>`,
      list2: `Оценка и обмен<br><span>за 30 минут</span>`,
      list3: `Доплата наличными<br><span>или в кредит</span>`,
      list4: `Юридическая чистота<br><span>и безопасность сделки</span>`,
      list5: `Помощь в формлении<br><span>всех документов</span>`,
      list6: `Специальные условия<br><span>для клиентов</span>`,
      list_img1: `svg/icon_bonus1.svg`,
      list_img2: `svg/icon_bonus2.svg`,
      list_img3: `svg/icon_bonus7.svg`,
      list_img4: `svg/icon_bonus4.svg`,
      list_img5: `svg/icon_bonus5.svg`,
      list_img6: `svg/icon_bonus6.svg`,
      link: '/trade-in',
      link_text: 'Оформить автокредит',
      right_img: '/svg/right_slider2.svg',
      right_text: `ОБМЕНЯЙТЕ<br><span>НА ЛУЧШЕЕ УЖЕ СЕГОДНЯ</span>`
    },
  {
    title: `<span>Каталог</span><br>китайские авто `,
    text: "Большой выбор китайских авто!",
    image: "images/slider/slider_bonus3.webp",
    link: '/cars/china',
    link_text: 'В каталог китайских авто',
    right_img: '/svg/right_slider3.svg',
    right_text: `ОБМЕНЯЙТЕ<br><span>НА ЛУЧШЕЕ УЖЕ СЕГОДНЯ</span>`
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
      <Slide v-for="(slide, index) in slides" :key="index" :class=" { 'carousel__item-top': index == 2 }">
        <NuxtImg format="webp" class="slide__img" :src="slide.image" alt="car" />
        <div class="carousel__item">
          <h2 class="slide__title" v-htmlSanitizer="slide.title"></h2>
          <p class="slide__text">
            {{ slide.text }}
          </p>
          <ul :class="[ 'slide__list', { 'slide__list-none': index == 2 } ]">
            <li>
              <NuxtImg :src="slide.list_img1" alt="icon"/>
              <p v-htmlSanitizer="slide.list1"></p>
            </li>
            <li>
              <NuxtImg :src="slide.list_img2" alt="icon"/>
              <p v-htmlSanitizer="slide.list2"></p>
            </li>
            <li>
              <NuxtImg :src="slide.list_img3" alt="icon"/>
              <p v-htmlSanitizer="slide.list3"></p>
            </li>
            <li>
              <NuxtImg :src="slide.list_img4" alt="icon"/>
              <p v-htmlSanitizer="slide.list4"></p>
            </li>
            <li>
              <NuxtImg :src="slide.list_img5" alt="icon"/>
              <p v-htmlSanitizer="slide.list5"></p>
            </li>
            <li>
              <NuxtImg :src="slide.list_img6" alt="icon"/>
              <p v-htmlSanitizer="slide.list6"></p>
            </li>
          </ul>
          <div class="link__block">
            <NuxtLink :to="slide.link" class="link__link">
              {{ slide.link_text }}
            </NuxtLink>
            <div class="link__promo" >
              <NuxtImg src="/svg/icon_bonus8.svg" alt="icon"/>
              <p class="link__promo-text">
                Надежно, быстро, выгодно!
              </p>
            </div>
          </div>
          <div class="right__block">
              <NuxtImg :src="slide.right_img" alt="ucon"/>
              <p v-htmlSanitizer="slide.right_text"></p>
          </div>
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
    overflow: hidden;
    justify-content: initial;
    border: var(--border);

    @media screen and (max-width: 540px) {
      display: flex;
      flex-direction: column;
      height: max-content;
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
       display: none;
      }
    }

    .carousel__item {
      text-align: left;
      padding: 97px 60px;

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
        font-weight: 800;
        font-style: ExtraBold;
        font-size: 64px;
        line-height: 50px;
        margin-bottom: 16px;

        @media screen and (max-width: 540px) {
          margin-top: 10px;
          margin-bottom: 20px;

          font-size: 32px;
          line-height: 36px;
        }

        &:deep(span){
          font-weight: 800;
          font-size: 64px;
          line-height: 50px;
          background: linear-gradient(180deg, #F82923 0%, #5A1512 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;

          @media screen and (max-width: 540px) {
            font-size: 32px;
            line-height: 36px;
          }
        }
      }

      .slide__text {
        font-weight: 400;
        font-size: 22px;
        line-height: 100%;
        margin-bottom: 26px;

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
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px 20px;
        max-width: 632px;
        margin-bottom: 40px;
        gap: 18px;

        @media screen and (max-width: 1023px) {
          grid-template-columns: repeat(2, 1fr);
          max-width: 300px;
          margin-bottom: 20px;
        }

        @media screen and (max-width: 767px) {
          margin-top: 10px;
        }

        @media screen and (max-width: 540px) {
          max-width: 100%;
        }

        @media screen and (max-width: 425px) {
          gap: 7px;
        }

        & li {
          display: flex;
          flex-wrap: nowrap;
          gap: 7px;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          width: max-content;

          @media screen and (max-width: 425px) {
            gap: 7px;
            font-size: 12px;
          }

          img{
            height: 44px;

            @media screen and (max-width: 1023px) {
              height: 30px;
            }

            @media screen and (max-width: 1023px) {
              height: 16px;
            }
          }

          &:deep(span){
            font-weight: 600;
            font-size: 14px;
            line-height: 18px;
            color: #b41f1a;
          }
        }
      }

      .slide__list-none{
        display: none;
      }

      .link__block{
        display: flex;
        gap: 30px;

        @media screen and (max-width:1023px) {
          flex-direction: column;
        }

        .link__link{
          font-weight: 500;
          font-style: Medium;
          font-size: 16px;
          line-height: 100%;
          color: white;
          background: linear-gradient(180deg, #CB4B46 0%, #B31814 100%);
          padding: 15px 26px;
          border-radius: 50px;
          width: max-content;
        }

        .link__promo{
          display: flex;
          gap: 7px;
          align-items: center;

          img{
            width: 20px;
          }

          .link__promo-text{ 
            font-weight: 300;
            font-size: 13px;
            line-height: 18px;
          }
        }
      }

      .right__block{
        display: flex;
        gap: 7px;
        background: linear-gradient(180deg, #CB4B46 0%, #B31814 100%);
        border: 1px solid #FFFFFF;
        border-radius: 50px;
        position: absolute;
        right: 20px;
        bottom: 20px;
        padding: 10px 20px;
        align-items: center;
        z-index: 2;
        width: max-content;

        
        @media screen and (max-width:540px) {
          right: 10px;
        }

        @media screen and (max-width:540px) {
          position: relative;
          bottom: 0;
          margin-top: 20px;
        }

        img{
          width: 33px;
        }

        p{
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          color: #FFFFFF;

          @media screen and (max-width:645px) {
            font-size: 14px;
          }

          &:deep(span){
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            background: transparent;

            @media screen and (max-width:645px) {
              font-size: 14px;
            }
          }

        }
      }
    }
  }

  .carousel__item-top{
    align-items: start;

    .link__block{
      flex-direction: column;
    }
  }
}
</style>
