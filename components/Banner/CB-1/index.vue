<script setup>
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js'
import { useRoute } from 'vue-router';

const $route = useRoute()
const newStore = useNewStore();
const newCarStore = useNewCarStore();

const car = computed(() => {
  if ($route.name === 'brand') {
    return {
      brand: newStore?.brand?.brand,
    };
  } else if ($route.name === 'model') {
    return {
      brand: newStore?.model?.brand,
      model: newStore?.model?.model,
      price: newStore?.model?.min_price,
    };
  } else if ($route.name === 'car') {
    return {
      brand: newCarStore?.car?.brand,
      model: newCarStore?.car?.model,
      price: newCarStore?.car?.price - newCarStore?.car?.sale,
    };
  }
  return null;
});
</script>

<template>
  <section class="callback__section section">
    <div class="container">
      <div class="callback__content">
        <div class="callback__content-block">
          <h2 class="callback__title">
            Оставьте заявку и получите в подарок <span>комплект зимней резины!</span>
          </h2>
          <p class="callback__text">
            Менеджер перезвонит Вам через 15 минут для уточнения информации!
          </p>
          <BaseButtonModal :btnLabel="'Оставить заявку'" :btnMobileIcon="`fa-solid fa-arrow-right-long`"
            :modalTitle="`Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!`" :appType="6"
            btnClass="callback__form" :car="car" />
        </div>
      </div>
      <div class="callback__img">
        <NuxtImg format="webp" src="/images/callback__form-bg.webp" alt="car" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.callback__section {
  position: relative;
  width: 100%;
  height: 450px;
  background: linear-gradient(180deg, rgba(255, 244, 242, 0.4) -53.47%, #DFE8FE 100%);
  padding: 20px 0;

  @media screen and (max-width: 1023px) {
    height: 350px;
  }

  @media screen and (max-width: 540px) {
    height: auto;
  }

  & .container {
    position: relative;
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-light);
    border-radius: 30px;
    padding: 0;
    overflow: hidden;

    @media screen and (max-width: 1440px) {
      border-radius: 0;
    }

    @media screen and (max-width: 540px) {
      flex-direction: column-reverse;
    }

    .callback__content {
      position: absolute;
      left: -50px;
      width: 594px;
      height: 652px;
      background: var(--blue);
      transform: rotate(-165deg);
      z-index: 1;

      @media screen and (max-width: 1023px) {
        width: 480px;
        height: 580px;
      }

      @media screen and (max-width: 767px) {
        width: 430px;
        transform: rotate(-175deg);
      }

      @media screen and (max-width: 540px) {
        position: initial;
        width: calc(100% + 30px);
        height: 240px;
        padding: 45px 25px;
        margin-top: -25px;
        margin-bottom: -25px;
      }

      .callback__content-block {
        position: absolute;
        top: 180px;
        left: 50px;
        background: transparent;
        color: var(--bg-light);
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: rotate(165deg);

        @media screen and (max-width: 767px) {
          top: 170px;
          left: 20px;
          transform: rotate(175deg);
        }

        @media screen and (max-width: 540px) {
          position: initial;
        }

        .callback__title {
          max-width: 440px;
          width: 100%;
          font-size: 32px;
          line-height: 42px;
          margin-bottom: 23px;

          @media screen and (max-width: 1023px) {
            max-width: 330px;
            font-size: 24px;
            line-height: 32px;
          }

          @media screen and (max-width: 540px) {
            max-width: 100%;
            font-size: 22px;
            line-height: 30px;
          }

          @media screen and (max-width: 375px) {
            max-width: 300px;
          }

          & span {
            font-weight: 700;
            color: var(--main-color);
          }
        }

        .callback__text {
          max-width: 440px;
          width: 100%;
          font-size: 20px;
          line-height: 30px;
          margin-bottom: 45px;

          @media screen and (max-width: 1023px) {
            max-width: 330px;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 20px;
          }

          @media screen and (max-width: 540px) {
            display: none;
          }
        }
      }
    }

    .callback__img {
      position: relative;
      max-width: 910px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin-left: 490px;

      @media screen and (max-width: 1023px) {
        margin-left: 380px;
      }

      @media screen and (max-width: 767px) {
        margin-left: 360px;
      }

      @media screen and (max-width: 540px) {
        max-width: 100%;
        margin: 0;
      }

      & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 77% 0%;
        border-radius: 0 30px 30px 0;

        @media screen and (max-width: 1440px) {
          border-radius: 0;
        }

        @media screen and (max-width: 1023px) {
          object-position: 65% 0%;
        }

        @media screen and (max-width: 540px) {
          height: 260px;
        }
      }
    }
  }
}
</style>
