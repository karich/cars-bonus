<script setup>
import { useAppStore } from "/stores/AppStore.js";

const appStore = useAppStore();

const props = defineProps(["model"]);
</script>

<template>
  <div class="card">
    <NuxtLink class="card__link" :to="`/cars/${model.url_brand}/${model.url_model}`">
      <p class="card__count">
        Осталось: {{ model.cars_count }} авто
      </p>
      <div class="card__img">
        <NuxtImg format="webp" :alt="`Превью ${model.brand.toUpperCase()} ${model.model}`"
          :src="`${model.taxi ? model.taxi : model.preview}`" />
      </div>
      <div class="card__name">
        <h3>{{ model.brand }} {{ model.model }}</h3>
      </div>
      <ul class="card__list">
        <li>В наличии</li>
        <li>Выгодный кредит</li>
        <li>Trade-in</li>
      </ul>
      <div class="card__price-block">
        <del class="card__price-old" v-if="model.min_sale">
          от {{ makeSpaces(model.min_price + model.min_sale) }} ₽
        </del>
        <p class="card__price-new">
          от {{ makeSpaces(model.min_price) }} ₽
        </p>
        <p class="card__payment">
          в кредит
          <span>от {{ makeSpaces(appStore.calcMonthPriceModel(0, model.min_price)) }}
            ₽/мec.</span>
        </p>
      </div>
      <p class="car__title-benefit">
        максимальная выгода <span>до {{ getNextMonday() }}*</span>
      </p>
    </NuxtLink>
    <div class="card__buttons card__buttons-taxi">
      <BaseButtonModal :car="{
        brand: model.brand,
        model: model.model,
        price: model.min_price + model.min_sale,
        sale: model.min_sale,
        preview: model.preview,
      }" :btn-label="'Купить в кредит'" :app-type="2" :modal-title="`Купить в кредит ${model.brand} ${model.model}`"
        :btn-class="`taxi`" />
      <!-- <BaseButtonModal :car="{
        brand: model.brand,
        model: model.model,
        price: model.min_price + model.min_sale,
        sale: model.min_sale,
        preview: model.preview,
      }" :btn-label="'Заказать обратный звонок'" :btnMobileIcon="`fa-solid fa-phone`" :app-type="6"
        :modal-title="`Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!`"
        :btn-class="`classic trade`" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 280px;
  height: auto;
  background: var(--bg-light);
  border: 1px solid transparent;
  border-radius: 28px;
  box-shadow: 0px 2px 6px 0px #00000026;
  transition: all 0.3s ease;

  &:hover {
    border: var(--border);
    box-shadow: none;

    .card__link .card__img {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .card__link {
    width: 100%;
    padding: 15px;
    padding-top: 30px;

    @media screen and (max-width: 540px) {
      padding: 10px;
      padding-top: 20px;
    }

    .card__count {
      position: absolute;
      top: 15px;
      left: 15px;
      width: max-content;
      height: auto;
      font-weight: 600;
      font-size: var(--small-size);
      background: var(--taxi);
      border-radius: 29px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 8px 10px;
      pointer-events: none;
      z-index: 10;

      @media screen and (max-width: 540px) {
        top: 10px;
        left: 10px;
      }
    }

    .card__img {
      display: block;
      width: 90%;
      height: 150px;
      margin: 0 auto;
      margin-bottom: 20px;
      object-fit: contain;
      transition: all 0.3s ease;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .card__name {
      & h3 {
        font-weight: 500;
        font-size: 24px;
        line-height: 26px;
        text-transform: capitalize;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
      }
    }

    .card__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 5px 8px;

      & li {
        line-height: 24px;
      }

      & li:first-child {
        font-weight: 500;
        color: var(--taxi);
        background: var(--main-black);
        padding: 3px 10px;
      }
    }

    .card__price-block {
      display: flex;
      flex-direction: column;
      margin: 15px 0;

      .card__price-old {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #A8A8A8;
      }

      .card__price-new {
        font-weight: 700;
        font-size: 30px;
        line-height: 42px;
      }

      .card__payment {
        font-size: 16px;
        line-height: 22px;

        & span {
          font-weight: 500;
          color: var(--main-color);
        }
      }
    }

    .car__title-benefit {
      font-size: 15px;
      color: #6F6F6F;

      & span {
        font-weight: 700;
        color: var(--main-black);
      }
    }
  }

  .card__buttons {
    display: flex;
    flex-direction: column;
    gap: 11px;
    width: 100%;
    padding: 0 15px;
    padding-bottom: 15px;
  }
}
</style>
