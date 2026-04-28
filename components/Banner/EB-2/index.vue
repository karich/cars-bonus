<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
  <section class="express__section section">
    <div class="container bottom__container">
      <h2>
        Экспресс-кредит на авто под <span>такси</span>
      </h2>
      <div class="express__benefits">
        <span>Ставка от {{ appStore.creditPercent }}%</span>
        <span>Первый взнос 0%</span>
        <span>КАСКО в подарок</span>
      </div>
      <FormBanner class="express__form express__taxi-form" />
    </div>
  </section>
</template>


<style scoped lang="scss">
.express__section {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  .bottom__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 30px;
    padding-right: 150px;

    @media screen and (max-width: 1023px) {
      gap: 0;
      padding-right: 20px;
    }

    @media screen and (max-width: 540px) {
      padding-right: 10px;
    }

    .express__form {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 15px 20px;
      padding-bottom: 0;

      @media screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
        padding: 0;
      }

      @media screen and (max-width: 540px) {
        gap: 10px 20px;
      }
    }

    h2 {
      position: relative;
      font-weight: 600;
      font-size: 30px;
      line-height: 42px;
      margin-top: 30px;
      text-transform: uppercase;

      @media screen and (max-width: 1023px) {
        font-size: 24px;
        line-height: 30px;
        margin-top: 0;
        margin-bottom: 20px;
      }

      @media screen and (max-width: 767px) {
        font-size: 19px;
        line-height: 32px;
        margin: 0;
      }

      @media screen and (max-width: 540px) {
        font-weight: 700;
        line-height: 30px;
        margin-bottom: 10px;
        max-width: 270px;
      }

      &::before {
        content: "";
        position: absolute;
        top: calc(50% - 2px);
        left: -265px;
        width: 250px;
        height: 4px;
        background: var(--main-black);

        @media screen and (max-width: 1600px) {
          content: none;
        }
      }

      & span {
        position: relative;
        font-weight: 600;
        display: inline-block;
        padding-right: 42px;

        @media screen and (max-width: 540px) {
          padding-right: 0;
        }
      }
    }

    .express__benefits {
      display: flex;
      width: 100%;
      gap: 20px;

      @media screen and (max-width: 1199px) {
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }

      span {
        position: relative;
        font-size: 20px;
        line-height: 35px;
        padding-left: 45px;

        @media screen and (max-width: 767px) {
          font-size: 16px;
          line-height: 25px;
          padding-left: 35px;
        }

        @media screen and (max-width: 540px) {
          font-weight: 500;
          font-size: 14px;
        }

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: url(/svg/star-black.svg) no-repeat center;
          background-size: contain;
          width: 35px;
          height: 35px;

          @media screen and (max-width: 767px) {
            width: 25px;
            height: 25px;
          }
        }
      }
    }

    .bottom__form {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 19px;
      width: 100%;
      margin-top: auto;
      margin-bottom: 78px;

      @media screen and (max-width: 1023px) {
        gap: 15px;
        margin-bottom: 40px;
      }

      @media screen and (max-width: 767px) {
        flex-direction: column;
        max-width: 300px;
        margin-left: auto;
        margin-bottom: 30px;
      }

      @media screen and (max-width: 540px) {
        max-width: 100%;
      }

      .bottom__form-input {
        width: 100%;
        height: 56px;
        color: var(--bg-light);
        background: transparent;
        border: 1px solid var(--bg-light);
        border-radius: 12px;
        padding: 0 20px;

        @media screen and (max-width: 767px) {
          max-width: 100%;
          height: 44px;
        }

        @media screen and (max-width: 540px) {
          background: #000;
        }
      }

      .bottom__form-input::-webkit-input-placeholder {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-input::-moz-placeholder {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-input::-ms-input-placeholder {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-input::placeholder {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-inputt:-moz-placeholder-shown {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-input:placeholder-shown {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-input:focus {
        color: var(--bg-light);
        opacity: 1;
      }

      .bottom__form-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 56px;
        font-weight: 500;
        font-size: 15px;
        line-height: 18px;
        background: var(--taxi);
        border: 1px solid var(--taxi);
        border-radius: 12px;
        transition: all 0.3s ease;

        @media screen and (max-width: 767px) {
          height: 44px;
          border-radius: 12px;
        }

        &:hover {
          color: var(--taxi);
          background: transparent;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.express__form.express__taxi-form {
  .form-input {
    color: var(--main-black);
    background: transparent;
    border: 1px solid var(--main-black);

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  }

  .form-input::-webkit-input-placeholder {
    color: var(--main-black);
    opacity: 1;
  }

  .form-input::-moz-placeholder {
    color: var(--main-black);
    opacity: 1;
  }

  .form-input::-ms-input-placeholder {
    color: var(--main-black);
    opacity: 1;
  }

  .form-input::placeholder {
    color: var(--main-black);
    opacity: 1;
  }

  .form-input:-moz-placeholder-shown {
    color: var(--main-black);
  }

  .form-input:placeholder-shown {
    color: var(--main-black);
  }

  .form-input:focus {
    color: var(--main-black);
  }

  .base-submit {
    background: var(--main-black);
    border: 2px solid var(--main-black);
  }

  .form__check {
    background: transparent;
    padding: 0;
  }
}
</style>