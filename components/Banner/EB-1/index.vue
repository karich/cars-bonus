<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js'
import { useRoute } from 'vue-router';

const appStore = useAppStore();
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
  <section class="express__section section" :class="{ 'express__section-taxi': $route.name === 'taxi' }">
    <div class="container">
      <div class="express__banner">
        <div class="express__img" v-if="$route.name === 'taxi'">
          <NuxtImg format="webp" src="/images/taxi__form-bottom.webp" alt="icon" />
        </div>
        <div class="express__img" v-else>
          <NuxtImg format="webp" src="/images/credit__form-bg.webp" alt="icon" />
        </div>
        <div class="express__banner-content">
          <h2 class="express__banner-title">
            Помочь оформить заявку<br> или выбрать автомобиль?
          </h2>
          <p class="express__banner-text">
            Просто позвоните!
          </p>
          <a class="express__banner-tel" :href="`tel:+${appStore.clearPhone}`">
            {{ appStore.phone }}
          </a>
          <FormBannerCredit :car="car" class="express__form express__section-form" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.express__section {
  position: relative;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;

  .express__banner {
    display: flex;
    align-items: center;
    gap: 10px 30px;

    @media screen and (max-width: 767px) {
      flex-direction: column;
    }

    @media screen and (max-width: 767px) {
      box-shadow: 0px 50px 80px -50px #00000033;
      border-radius: 20px;
      padding: 20px 10px;
    }

    @media screen and (max-width: 540px) {
      padding: 16px 10px 25px;
    }

    .express__img {
      max-width: 837px;
      width: 100%;
      height: 471px;

      @media screen and (max-width: 1199px) {
        height: 400px;
      }

      @media screen and (max-width: 767px) {
        display: flex;
        height: 100%;
      }

      & img {
        width: 100%;
        height: 100%;
        min-height: 200px;
        object-fit: cover;
        border-radius: 28px;
      }
    }

    .express__banner-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 450px;
      width: 100%;
      height: 100%;

      @media screen and (max-width: 767px) {
        max-width: 100%;
      }

      .express__banner-title {
        font-weight: 500;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
        margin-bottom: 20px;

        @media screen and (max-width: 1023px) {
          font-size: 22px;
          line-height: 30px;
        }

        @media screen and (max-width: 359px) {
          font-size: 20px;
          line-height: 28px;
        }
      }

      .express__banner-text {
        font-size: 16px;
        margin-bottom: 10px;
      }

      .express__banner-tel {
        font-weight: 700;
        font-size: 22px;
        line-height: 24px;
        background-image: var(--linear-button2);
        color: transparent;
        background-clip: text;
        margin-bottom: 20px;
      }

      .express__form {
        gap: 12px;
        padding: 48px 30px;
        border-radius: var(--border-medium-radius);
        box-shadow: 0px 50px 80px -50px #00000033;

        @media screen and (max-width: 1199px) {
          padding: 20px;
          padding-top: 10px;
        }

        @media screen and (max-width: 767px) {
          box-shadow: none;
          padding: 0;
        }
      }
    }
  }
}

.express__section-taxi {
  .express__banner {
    gap: 10px 20px;

    @media screen and (max-width: 767px) {
      background: #121212;
      border-radius: 20px;
      box-shadow: 0px 50px 80px -50px rgba(0, 0, 0, 0.2);
    }

    .express__banner-content {
      color: var(--bg-light);
      background: #121212;
      border-radius: 30px;
      box-shadow: 0px 50px 80px -50px rgba(0, 0, 0, 0.2);
      padding: 40px 0;
      max-width: 480px;

      @media screen and (max-width: 1199px) {
        padding: 5px 0;
      }

      @media screen and (max-width: 767px) {
        background: transparent;
        box-shadow: none;
        padding: 0;
      }

      .express__banner-tel {
        color: var(--taxi);
        background: transparent;
      }

      .express__section-form {
        padding: 8px 20px;

        @media screen and (max-width: 1023px) {
          padding: 8px;
        }

        @media screen and (max-width: 767px) {
          padding: 0;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.express__section {
  .express__banner {
    .express__banner-content {
      .express__section-form {
        .base-submit {
          background: var(--linear-button2);
        }

        .polititcs__info {
          & a {
            background-image: var(--linear-button2);
            color: transparent;
            background-clip: text;
          }
        }
      }
    }
  }
}

.express__section-taxi {
  .express__banner {
    .express__banner-content {
      .express__section-form {
        .base-submit {
          background: var(--taxi);
          border-color: var(--taxi);

          & span {
            color: #121212;
          }
        }

        .polititcs__info {
          & a {
            color: var(--taxi);
          }
        }
      }
    }
  }
}
</style>
