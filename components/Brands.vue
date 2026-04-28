<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const $route = useRoute();

const brandShow = ref(false);

function showAll() {
  brandShow.value = !brandShow.value;
}
</script>

<template>
  <section class="brands__section" :class="{ 'brands__section-china': $route.name == 'china' }">
    <div class="container">
      <div class="brands__wrapper">
        <!-- <div class="section__header">
          <BaseSectionTitle :title="`Все марки авто в наличии`" v-if="$route.name !== 'cars'" />
          <BasePageTitle v-else />
        </div> -->

        <div class="brands__body">
          <div class="brand__list-block">
            <ul class="brand__list">
              <li class="brand__item"
                v-for="brand in ($route.name == 'china' ? appStore?.chinaBrands.brands : appStore?.newBrands)"
                :key="brand.id" :class="{ 'brand__item--show': brandShow }">
                <router-link :to="`/cars/${brand.url_brand}/`" class="brand__link">
                  <!-- <div class="brand__info"> -->
                  <!-- <NuxtImg format="webp" class="brand__logo" :src="`${brand.logo}`" :alt="`${brand.brand}`" /> -->
                  <!-- <div class="brand__count-block"> -->
                  <p>{{ brand.brand.toLowerCase() }}</p>
                  <!-- <span>{{ brand.cars_count }}</span> -->
                  <!-- </div>
                  </div> -->
                </router-link>
              </li>
            </ul>
          </div>
          <button class="brand__list-btn" @click="showAll()" v-if="$route.name !== 'china'">
            {{ brandShow ? "Скрыть" : "Показать еще" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.brands__section {
  .brand__list-block {
    display: grid;
    gap: 20px;

    .brand__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;

      @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }

      @media screen and (max-width: 540px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-width: 410px) {
        grid-template-columns: repeat(2, 1fr);
      }

      .brand__item {
        max-width: 130px;
        width: 100%;
        height: 34px;

        @media screen and (max-width: 1439px) {
          max-width: 145px;
        }

        @media screen and (max-width: 768px) {
          max-width: 100%;
        }

        .brand__link {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: var(--bg-light);
          border-radius: var(--border-button-radius);
          transition: all 0.3s ease;

          &::before {
            content: "";
            position: absolute;
            top: -5px;
            left: -5px;
            width: 23px;
            height: 23px;
            border-radius: 50%;
            background: var(--main-color);
            border: 4px solid #E9E9E9;
            transition: all 0.3s ease;
          }

          &:hover {
            background: #333333;

            &::before {
              border: 4px solid var(--bg-light);
              transition: all 0.3s ease;
            }

            & p {
              color: var(--bg-light);
            }
          }

          // .brand__info {
          //   background: var(--bg-light);
          //   border-radius: 27px;
          //   padding: 7px;

          //   @media screen and (max-width: 425px) {
          //     padding: 7px 4px;
          //   }

          //   .brand__logo {
          //     width: 35px;
          //     height: 35px;
          //     object-fit: contain;
          //     display: none;
          //   }

          //   .brand__count-block {
          //     display: flex;
          //     align-items: center;
          //     gap: 13px;

          & p {
            font-weight: 500;
            line-height: 24px;
            text-transform: uppercase;
            color: #333333;
            background: transparent;
            transition: all 0.3s ease;
          }

          //     & span {
          //       font-weight: 500;
          //       line-height: 18px;
          //       color: var(--main-color);
          //     }
          //   }
          // }
        }

        &:nth-child(n + 19) {
          @media screen and (max-width: 540px) {
            display: none;
          }
        }
      }

      .brand__item--show {
        &:nth-child(n + 19) {
          display: block;
        }
      }
    }
  }

  .brand__list-btn {
    display: none;
    width: 100%;
    height: 50px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: var(--bg-light);
    background: var(--linear-button);
    border-radius: var(--border-button-radius);
    margin-top: 10px;
    transition: all 0.3s ease;

    @media screen and (max-width: 540px) {
      display: block;
    }
  }
}
</style>