<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
  <section class="taxi__section section">
    <div class="container">
      <BasePageTitle />
      <div class="taxi__banner">
        <div class="taxi__banner-content">
          <h2 class="taxi__banner-title">
            Автомобили под такси из Китая!
          </h2>
          <p class="taxi__banner-text">
            Автомобили, проверенные временем
          </p>
          <ul class="taxi__banner-list">
            <li class="taxi__banner-item">
              Широкий выбор автомобилей;
            </li>
            <li class="taxi__banner-item">
              Разнообразие марок и моделей;
            </li>
            <li class="taxi__banner-item">
              Специальные условия по автокредиту;
            </li>
            <li class="taxi__banner-item">
              Удобная программа "Трейд-ин»;
            </li>
          </ul>
          <BaseButtonModal :btnLabel="`Оставить заявку`"
            :modalTitle="`Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!`" :appType="6"
            btnClass="taxi" />
        </div>
        <NuxtImg class="taxi__banner-img" format="webp" src="/images/taxi__form-bg.webp" alt="taxi banner" />
      </div>
      <!-- <div class="taxi__section-bottom">
        <h2>Оставить заявку на авто под такси в кредит от {{ appStore.creditPercent }}%</h2>
        <FormBannerCredit class="taxi__form-form" />
      </div> -->
    </div>
  </section>
</template>

<style scoped lang="scss">
.taxi__section {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  .container {
    @media screen and (max-width: 540px) {
      padding: 0;
    }

    .page__title {
      @media screen and (max-width: 540px) {
        padding: 0 10px;
      }
    }

    .taxi__banner {
      position: relative;
      height: 501px;
      border-radius: 46px;
      overflow: hidden;
      display: flex;
      align-items: center;

      @media screen and (max-width: 767px) {
        border-radius: 20px;
      }

      @media screen and (max-width: 540px) {
        display: flex;
        flex-direction: column-reverse;
        height: auto;
      }

      .taxi__banner-img {
        max-width: 750px;
        width: 100%;
        height: 100%;
        object-fit: cover;

        @media screen and (max-width: 540px) {
          position: initial;
          min-height: 200px;
        }
      }

      .taxi__banner-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        padding: 20px 38px;
        color: var(--bg-light);
        background: #121212;
        border-radius: 33px 0 0 33px;
        max-width: 650px;
        min-width: 600px;
        width: 100%;
        height: 100%;

        @media screen and (max-width: 1023px) {
          min-width: 410px;
          padding: 20px;
        }

        @media screen and (max-width: 540px) {
          border-radius: 0;
          padding: 30px 15px;
          width: 100%;
          min-width: auto;
        }

        @media screen and (max-width: 359px) {
          padding: 20px 10px;
        }

        .taxi__banner-title {
          font-weight: 700;
          font-size: 32px;
          line-height: 36px;
          margin-bottom: 15px;

          @media screen and (max-width: 540px) {
            font-size: 28px;
            line-height: 34px;
          }

          @media screen and (max-width: 490px) {
            max-width: 330px;
          }

          @media screen and (max-width: 374px) {
            font-size: 26px;
            max-width: 300px;
          }
        }

        .taxi__banner-text {
          font-size: 22px;
          line-height: 26px;
          margin-bottom: 30px;
          background: transparent;

          @media screen and (max-width: 1023px) {
            font-size: 20px;
          }

          @media screen and (max-width: 540px) {
            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            margin-bottom: 20px;
          }

          @media screen and (max-width: 374px) {
            font-size: 16px;
            line-height: 20px;
          }
        }

        .taxi__banner-list {
          display: grid;
          gap: 8px;
          text-align: left;
          margin-bottom: 30px;

          @media screen and (max-width: 767px) {
            gap: 12px;
          }

          @media screen and (max-width: 540px) {
            margin-bottom: 20px;
          }

          & li {
            position: relative;
            font-size: 16px;
            line-height: 24px;
            padding-left: 26px;

            @media screen and (max-width: 767px) {
              line-height: 20px;
            }

            &::before {
              content: "";
              position: absolute;
              top: 3px;
              left: 0;
              width: 16px;
              height: 16px;
              background: var(--main-black);
              border-radius: 50%;
              border: 3px solid var(--taxi);
            }
          }
        }
      }
    }
  }
}
</style>

<!-- <style lang="scss">
.taxi__section-bottom {
  position: relative;
  z-index: 2;
  background: var(--yellow);
  border-radius: 0 0 15px 15px;
  padding: 15px 40px;

  @media screen and (max-width: 1023px) {
    padding: 20px 15px;
  }

  & h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 10px;

    @media screen and (max-width: 767px) {
      font-weight: 500;
      font-size: 22px;
      margin-bottom: 14px;
    }
  }

  .taxi__form-form {
    grid-template-columns: 260px 260px 225px;
    padding: 0;

    @media screen and (max-width: 1023px) {
      grid-template-columns: 1fr 1fr 225px;
    }

    @media screen and (max-width: 767px) {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .base-submit {
      color: var(--taxi);
      background: var(--main-black);
      border-color: var(--main-black);

      @media screen and (max-width: 767px) {
        margin-top: 6px;
      }

      &:hover {
        color: var(--main-black);
        background: var(--taxi);
      }
    }

    .polititcs__info {
      grid-area: span 2 / span 3;
    }
  }
}
</style> -->
