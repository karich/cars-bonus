<script setup>
import { useAppStore } from "/stores/AppStore.js";
import { useNewStore } from "/stores/NewStore.js";

const appStore = useAppStore();
const newStore = useNewStore();

const lastModel = newStore.models[newStore.models.length - 1];
const loading = ref(true);

const car = computed(() => {
  return {
    brand: newStore?.brand?.brand,
  }
});

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <section class="brand__section section">
    <div class="container">
      <BasePageTitle :data-text="`${newStore?.brand?.brand}`" />
      <div class="brand__banner">
        <div class="brand__banner-content">
          <p class="brand__banner-text">
            Акция продлится до {{ getNumericDate() }}.<br>
            Успей приобрести автомобиль своей мечты!
          </p>
          <p class="brand__banner-sale">
            Всего от <span>{{ makeSpaces(newStore.models[0].min_price) }} ₽</span>
          </p>
          <div class="brand__banner-bottom">
            <p>Только <span>до {{ getNumericDate() }}!</span> Скидки до <span>{{ makeSpaces(newStore.brand.max_sale) }}
                ₽</span><br> на все автомобили {{ newStore.brand.brand.toUpperCase() }}!</p>
          </div>
        </div>
        <div class="brand__img">
          <NuxtImg placeholder="/svg/spinner.svg" v-if="lastModel && lastModel.preview" format="webp"
            :src="`${lastModel.preview}`" alt="car" />
        </div>
      </div>
      <div class="brand__banner-form">
        <h2>Получить индивидуальное предложение на покупку в кредит от {{ appStore.creditPercent }}%</h2>
        <FormBanner :car="car" class="express__form" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.brand__section {
  margin-top: -100px;
  padding-top: 120px;
  overflow: hidden;

  .page__title {
    position: relative;
    font-size: 36px;
    line-height: 38px;
    letter-spacing: .5px;
    margin-bottom: 12px;
    z-index: 2;

    @media screen and (max-width: 767px) {
      font-size: 26px;
      line-height: 30px;
      letter-spacing: 0;
    }

    &::after {
      content: attr(data-text);
      top: 0;
      left: 139px;
      text-transform: uppercase;
      background-image: var(--linear-button);
      color: transparent;
      background-clip: text;

      @media screen and (max-width: 767px) {
        left: 98px;
      }
    }
  }

  .brand__banner {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media screen and (max-width: 767px) {
      gap: 10px;
      padding-bottom: 100px;
    }

    @media screen and (max-width: 540px) {
      flex-direction: column-reverse;
      gap: 20px;
      padding: 0;
      padding-top: 60px;
    }

    .brand__banner-content {
      width: 100%;
      height: 100%;

      .brand__banner-text {
        font-weight: 500;
        font-size: 20px;
        line-height: 26px;
        margin-bottom: 14px;

        @media screen and (max-width: 1199px) {
          margin-top: 50px;
        }

        @media screen and (max-width: 1023px) {
          font-size: 16px;
          line-height: 24px;
        }

        @media screen and (max-width: 767px) {
          font-size: 15px;
        }

        @media screen and (max-width: 540px) {
          display: none;
        }
      }

      .brand__banner-sale {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: var(--bg-light);
        background: var(--main-color);
        border-radius: var(--border-small-radius);
        padding: 12px 8px;
        width: max-content;
        margin-bottom: 48px;

        @media screen and (max-width: 1023px) {
          margin-bottom: 20px;
        }

        @media screen and (max-width: 540px) {
          position: absolute;
          top: 20px;
          right: 0;
          transform: rotateZ(15deg);
          z-index: 2;
          background: var(--linear-button);
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
        }

        & span {
          font-weight: 900;
          font-size: 20px;

          @media screen and (max-width: 540px) {
            font-weight: 600;
            font-size: 18px;
            background: transparent;
          }
        }
      }

      .brand__banner-bottom {
        border: 1px solid var(--main-color);
        border-radius: var(--border-medium-radius);
        padding: 15px 10px;
        width: max-content;

        @media screen and (max-width: 767px) {
          position: absolute;
          bottom: 0;
        }

        @media screen and (max-width: 540px) {
          position: initial;
          padding: 10px 7px;
        }

        @media screen and (max-width: 425px) {
          max-width: 300px;
          width: 100%;
        }

        & p {
          position: relative;
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;

          @media screen and (max-width: 425px) {
            & br {
              display: none;
            }
          }

          & span {
            font-weight: 600;
            color: var(--main-color);
          }
        }
      }
    }

    .brand__img {
      position: relative;
      max-width: 450px;
      width: 100%;
      height: 250px;

      @media screen and (max-width: 1023px) {
        max-width: 330px;
        height: 200px;
      }

      &::before {
        content: "";
        position: absolute;
        top: -70px;
        right: 0;
        width: 390px;
        height: 390px;
        background: var(--linear-button);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;

        @media screen and (max-width: 1023px) {
          width: 320px;
          height: 320px;
        }

        @media screen and (max-width: 767px) {
          top: -50px;
          width: 250px;
          height: 250px;
        }

        @media screen and (max-width: 540px) {
          left: 0;
          right: initial;
        }
      }

      img {
        position: absolute;
        bottom: -35px;
        right: 50px;
        width: 100%;
        height: auto;
        object-fit: contain;
        z-index: 1;
        max-height: 240px;

        @media screen and (max-width: 1023px) {
          bottom: 0;
          right: 20px;
        }

        @media screen and (max-width: 767px) {
          right: 0;
        }

        @media screen and (max-width: 540px) {
          height: 164px;
          right: initial;
          left: 0;
          transform: rotateY(180deg);
        }
      }
    }
  }

  .brand__banner-form {
    position: relative;
    z-index: 2;
    padding: 20px 0;

    @media screen and (max-width: 767px) {
      padding: 20px 10px;
      background: #f3f3f3;
      margin-top: 10px;
      border-radius: var(--border-medium-radius);
    }

    & h2 {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 12px;

      @media screen and (max-width: 540px) {
        font-size: 14px;
        line-height: 17px;
      }
    }

    .express__form {
      grid-template-columns: 260px 260px 225px;
      padding: 0;

      @media screen and (max-width: 1023px) {
        grid-template-columns: 1fr 1fr 225px;
      }

      @media screen and (max-width: 640px) {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
.brand__banner-form {
  .express__form {
    .polititcs__info {
      grid-area: span 2 / span 3;
    }
  }
}
</style>
