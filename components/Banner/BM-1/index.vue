<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
  <section class="section__banner section__colored">
    <div class="container">
      <BasePageTitle />
      <div class="main__banner">
        <div class="main__banner-content">
          <p class="main__banner-subtitle">Горячее предложение</p>
          <h2 class="main__banner-title">Автокредит от {{ appStore.creditPercent }}%<br> без первого взноса</h2>
          <p class="main__banner-text">
            Получите максмальные преимущества при покупке нового авто!
          </p>
          <!-- <NuxtLink to="/credit" class="main__banner-link">
            Узнать подробнее
          </NuxtLink> -->
          <BaseButtonModal :btnLabel="'Узнать подробнее'" :btnMobileIcon="`fa-solid fa-arrow-right-long`"
            :modalTitle="`Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!`" :appType="2"
            btnClass="main__banner-link" />
        </div>
        <div class="main__banner-image">
          <div class="banner__image-block">
            <NuxtImg format="webp" src="/images/main__car1.webp" alt="car" />
            <NuxtImg format="webp" src="/images/main__car2.webp" alt="car" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section__banner {
  margin-top: -100px;
  padding-top: 150px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding-top: 120px;
  }

  @media screen and (max-width: 540px) {
    padding-bottom: 0;
  }

  .container {
    position: relative;
    padding-right: 0;

    @media screen and (max-width: 540px) {
      padding: 0;
    }

    .page__title {
      padding: 0 10px;
    }

    .main__banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 50px 0;

      @media screen and (max-width: 767px) {
        padding: 20px 0;
        gap: 10px;
      }

      @media screen and (max-width: 540px) {
        position: relative;
        flex-direction: column-reverse;
        padding: 0 10px;
      }

      .main__banner-content {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;

        @media screen and (max-width: 540px) {
          position: absolute;
          top: 10px;
          left: 10px;
        }

        @media screen and (max-width: 375px) {
          color: var(--bg-light);
        }

        .main__banner-subtitle {
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: var(--main-color);
          margin-bottom: 7px;
          background: transparent;

          @media screen and (max-width: 540px) {
            color: var(--blue);
          }

          @media screen and (max-width: 375px) {
            color: var(--bg-light);
          }
        }

        .main__banner-title {
          position: relative;
          font-weight: 800;
          font-size: 24px;
          line-height: 30px;
          text-transform: uppercase;
          padding-left: 23px;
          margin-bottom: 13px;

          @media screen and (max-width: 768px) {
            padding: 0;
          }

          @media screen and (max-width: 767px) {
            font-size: 17px;
            line-height: 26px;
          }

          @media screen and (max-width: 540px) {
            font-size: 20px;
          }

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: 0;
            height: 0;
            border-top: 13px solid transparent;
            border-left: 13px solid var(--main-color);
            border-bottom: 13px solid transparent;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            @media screen and (max-width: 1023px) {
              width: 5px;
            }

            @media screen and (max-width: 768px) {
              content: none;
            }
          }
        }

        .main__banner-text {
          font-size: 18px;
          line-height: 34px;
          color: #6F6F6F;
          background: transparent;
          margin-bottom: 50px;
          max-width: 365px;

          @media screen and (max-width: 1023px) {
            font-size: 14px;
            line-height: 22px;
            margin-bottom: 20px;
            max-width: 285px;
          }

          @media screen and (max-width: 540px) {
            font-size: 16px;
            color: var(--blue);
            max-width: 325px;
          }

          @media screen and (max-width: 375px) {
            font-size: 14px;
            color: var(--bg-light);
            max-width: 280px;
          }
        }

        // .main__banner-link {
        //   font-weight: 700;
        //   font-size: 16px;
        //   line-height: 20px;
        //   color: var(--bg-light);
        //   background: var(--main-color);
        //   border: 1px solid var(--main-color);
        //   border-radius: var(--border-button-radius);
        //   box-shadow: 0px 20px 30px 0px #FF563A26;
        //   padding: 15px;
        //   max-width: 170px;
        //   transition: all 0.3s ease;

        //   @media screen and (max-width: 540px) {
        //     background: var(--blue);
        //     border: 1px solid var(--blue);
        //   }

        //   @media screen and (max-width: 375px) {
        //     position: absolute;
        //     bottom: 30px;
        //   }

        //   &:hover {
        //     color: var(--main-color);
        //     background: var(--bg-light);

        //     @media screen and (max-width: 540px) {
        //       color: var(--bg-light);
        //       background: var(--main-color);
        //       border: 1px solid var(--main-color);
        //     }
        //   }
        // }
      }

      .main__banner-image {
        position: relative;
        max-width: 688px;
        width: 100%;
        height: 278px;

        @media screen and (max-width: 1199px) {
          max-width: 480px;
          height: 200px;
        }

        @media screen and (max-width: 540px) {
          max-width: 100%;
          height: 470px;
          pointer-events: none;
        }

        @media screen and (max-width: 375px) {
          height: 390px;
          z-index: 1;
        }

        &::before {
          content: "";
          position: absolute;
          top: -90px;
          right: 38px;
          width: 390px;
          height: 390px;
          background: linear-gradient(180deg, #FFBFB5 0%, #FF735C 100%);
          border-radius: 50px 50px 0 0;
          transform: rotate(-5deg);
          pointer-events: none;
          z-index: 1;

          @media screen and (max-width: 1199px) {
            width: 320px;
            height: 320px;
          }

          @media screen and (max-width: 767px) {
            top: -50px;
            width: 220px;
            height: 240px;
            border-radius: 20px;
          }

          @media screen and (max-width: 540px) {
            top: -10px;
            left: -20px;
            right: initial;
            width: 370px;
            height: 100%;
            transform: rotate(-3deg);
          }

          @media screen and (max-width: 375px) {
            top: 0;
            right: initial;
            left: -10px;
            width: 110%;
            background: url(/images/main__banner-bg.webp) no-repeat 50% 5% / cover;
            border-radius: 0;
            transform: rotate(0deg);
          }
        }

        &::after {
          content: "";
          position: absolute;
          bottom: -50px;
          right: 0;
          width: 100%;
          height: 70px;
          background: #fff1ef;
          pointer-events: none;
          z-index: 2;

          @media screen and (max-width: 767px) {
            content: none;
          }
        }

        .banner__image-block {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          z-index: 3;

          & img:first-child {
            position: relative;
            width: auto;
            height: 207px;
            object-fit: contain;
            z-index: 2;

            @media screen and (max-width: 1199px) {
              height: 147px;
            }

            @media screen and (max-width: 767px) {
              display: none;
            }
          }

          & img:last-child {
            position: absolute;
            top: 0;
            right: 0;
            width: auto;
            height: 197px;
            object-fit: contain;
            z-index: 1;

            @media screen and (max-width: 1199px) {
              height: 137px;
            }

            @media screen and (max-width: 540px) {
              height: 203px;
              top: initial;
              bottom: 0;
              right: initial;
              left: 0;
            }

            @media screen and (max-width: 375px) {
              right: -10px;
              left: initial;
            }
          }
        }
      }
    }
  }
}
</style>
