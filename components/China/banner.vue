<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
  <section class="china__section section">
    <div class="container">
      <BasePageTitle />
      <div class="china__banner">
        <NuxtImg class="china__banner-img" format="webp" src="/images/china__banner.webp" alt="china banner" />
        <div class="china__banner-content">
          <h2 class="china__banner-title">
            Новые автомобили из Китая!
          </h2>
          <p class="china__banner-text">
            Автомобили, проверенные временем
          </p>
          <ul class="china__banner-list">
            <li class="china__banner-item">
              Широкий выбор автомобилей;
            </li>
            <li class="china__banner-item">
              Разнообразие марок и моделей;
            </li>
            <li class="china__banner-item">
              Специальные условия по автокредиту;
            </li>
            <li class="china__banner-item">
              Удобная программа "Трейд-ин»;
            </li>
          </ul>
          <BaseButtonModal :btnLabel="`Оставить заявку`"
            :modalTitle="`Оставьте заявку и наш специалист перезвонит Вам в течение 15 минут!`" :appType="6"
            btnClass="china__banner-btn" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.china__section {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;

  .container {
    @media screen and (max-width: 540px) {
      padding: 0;
    }

    .page__title {
      @media screen and (max-width: 540px) {
        padding: 0 10px;
      }
    }

    .china__banner {
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
        flex-direction: column;
        align-items: initial;
        height: auto;
      }

      .china__banner-img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 70% 50%;
        z-index: -1;

        @media screen and (max-width: 1199px) {
          object-position: 65% 50%;
        }

        @media screen and (max-width: 540px) {
          position: initial;
          min-height: 200px;
          object-position: 68% 50%;
        }
      }

      .china__banner-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px 40px;
        background: #FFFFFFE5;
        border-radius: 0 33px 33px 0;
        width: max-content;
        height: max-content;

        @media screen and (max-width: 1023px) {
          padding: 20px 15px;
        }

        @media screen and (max-width: 540px) {
          border-radius: 0;
          padding: 30px 15px;
          width: 100%;
        }

        @media screen and (max-width: 359px) {
          padding: 20px 10px;
        }

        .china__banner-title {
          font-weight: 700;
          font-size: 32px;
          line-height: 44px;
          margin-bottom: 10px;

          @media screen and (max-width: 540px) {
            font-size: 28px;
            line-height: 34px;
          }

          @media screen and (max-width: 440px) {
            max-width: 300px;
          }
        }

        .china__banner-text {
          font-size: 22px;
          line-height: 26px;
          margin-bottom: 30px;
          background: transparent;

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

        .china__banner-list {
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
            color: #333333;

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
              background: var(--main-color);
              border-radius: 50%;
              border: 3px solid var(--bg-light);
            }
          }
        }
      }
    }
  }
}
</style>
