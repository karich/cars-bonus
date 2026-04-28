<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
  <section class="taxi__banner section">
    <div class="container">
      <NuxtImg class="taxi__banner-img" format="webp" src="/images/taxi__form-bg.webp" alt="car" />
      <div class="taxi__section-content">
        <h2 class="content__main-title">
          Не нашли нужную модель под такси?<br>
          Спросите эксперта!
        </h2>
        <div class="content__main-bottom">
          <p class="content__main-text">Менеджер перезвонит Вам в течение 15 минут</p>
          <FormBannerCredit class="content__main-form" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.taxi__banner {
  height: 450px;
  padding: 10px 0;

  @media screen and (max-width: 1023px) {
    height: 400px;
  }

  @media screen and (max-width: 540px) {
    height: auto;
    box-shadow: 0px -2px 2px 0px #4D576B1A, 0px 4px 4px 0px #4D576B17;
    padding: 0;
  }

  .container {
    position: relative;
    height: 100%;

    @media screen and (max-width: 767px) {
      padding: 0;
    }

    &::before {
      @media screen and (max-width: 540px) {
        content: "";
        position: absolute;
        top: 20px;
        left: 0;
        max-width: 590px;
        width: 100%;
        height: 100%;
        background: url(/svg/taxi-bg.svg) no-repeat center / contain;
        pointer-events: none;
        transform: rotate(-80deg);
      }

      @media screen and (max-width: 375px) {
        top: -55px;
      }
    }

    .taxi__banner-img {
      display: none;
      width: 100%;
      height: 310px;
      object-fit: cover;
      object-position: 100% 50%;

      @media screen and (max-width: 540px) {
        display: block;
      }

      @media screen and (max-width: 375px) {
        height: 215px;
      }
    }

    .taxi__section-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      padding-left: 50px;
      border-radius: var(--border-medium-radius);
      box-shadow: 0px -2px 2px 0px #4D576B1A, 0px 4px 4px 0px #4D576B17;

      @media screen and (max-width: 1199px) {
        padding-left: 30px;
      }

      @media screen and (max-width: 767px) {
        padding-left: 20px;
        border-radius: 0;
      }

      @media screen and (max-width: 540px) {
        padding: 0 10px 20px;
        background: var(--bg-light);
        box-shadow: none;
      }

      .content__main-title {
        position: relative;
        font-weight: 600;
        font-size: 34px;
        line-height: 40px;
        margin-bottom: 14px;
        max-width: 530px;

        @media screen and (max-width: 1023px) {
          font-size: 24px;
          line-height: 28px;
          margin-bottom: 10px;
          max-width: 360px;
        }

        @media screen and (max-width: 540px) {
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 6px;
        }

        & br {
          display: none;

          @media screen and (max-width: 540px) {
            display: block;
          }

          @media screen and (max-width: 425px) {
            display: none;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.content__main-bottom {
  .content__main-text {
    font-size: 20px;
    line-height: 26px;
    color: #6F6F6F;
    margin-bottom: 20px;

    @media screen and (max-width: 1023px) {
      font-size: 16px;
      line-height: 20px;
    }

    @media screen and (max-width: 767px) {
      font-size: 15px;
      color: var(--main-black);
    }

    @media screen and (max-width: 359px) {
      max-width: 270px;
    }
  }

  .content__main-form {
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 15px;
    max-width: 340px;

    @media screen and (max-width: 540px) {
      max-width: 100%;
    }

    & .form-input {
      border: 1px solid #E6E6E6;
      box-shadow: 0px 1px 17.3px 0px #0000000F;
      border-radius: 6px;
    }

    & .base-submit {
      color: var(--main-black);
      background: var(--taxi);
      border-color: var(--taxi);
      border-radius: 10px;
    }
  }
}
</style>
