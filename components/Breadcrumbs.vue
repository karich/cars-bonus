<script setup>
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { useRoute } from 'vue-router'

const $route = useRoute()
const newStore = useNewStore();
const newCarStore = useNewCarStore();

const specialRoutes = {
  'reviews': 'Отзывы',
  'credit': 'Автокредит',
  'contact': 'Контакты',
  'trade-in': 'Trade-in',
  'redemption': 'Выкуп',
  'politics': 'Политика конфиденциальности',
  'comparison': 'Сравнение',
  'favorites': 'Избранное',
  'success-cars-bonus': 'Успешная заявка',
  'thank': 'Успешная заявка',
  'cars': 'Каталог авто',
  'banks': 'Банки-партнеры',
  'about': 'О компании',
  'installment': 'Рассрочка',
  'leasing': 'Лизинг',
  'china': 'Китайские авто',
  'taxi': 'Такси'
};

const breadSchema = ['%brand_name_rus%', '%model_name_eng%'];

const getBreadcrumbs = () => {
  const breadcrumbs = [];
  const pathArray = $route.path.split("/").splice(1).filter(element => element !== '');

  const formattedPathArray = pathArray.map((element, index) => {
    if (pathArray[0] === 'cars' && index > 0) {
      if (pathArray[1] !== 'taxi' && pathArray[1] !== 'china') {
        if (index === 1) return breadSchema[0];
        if (index === 2) return breadSchema[1];
      }
    }
    return element;
  });

  for (let i = 0; i < formattedPathArray.length; i++) {
    let label = formattedPathArray[i];

    if (specialRoutes[label]) {
      label = specialRoutes[label];
    } else {
      switch ($route.name) {
        case 'brand':
          if (label === '%brand_name_rus%') {
            label = newStore.brand.brand;
          }
          break;
        case 'model':
          if (label === '%brand_name_rus%') {
            label = newStore.model.brand;
          } else if (label === '%model_name_eng%') {
            label = newStore.model.model;
          }
          break;
        case 'car':
          if (label === '%brand_name_rus%') {
            label = newCarStore.car.brand;
          } else if (label === '%model_name_eng%') {
            label = newCarStore.car.model;
          }
          break;
      }
    }

    breadcrumbs.push({
      to: breadcrumbs[i - 1] ? breadcrumbs[i - 1].to + "/" + pathArray[i] : "/" + pathArray[i],
      label: label
    });
  }

  return breadcrumbs;
}

const breadcrumbs = getBreadcrumbs();

function getCrumb() {
  if ($route.path.includes('cars')) {
    if ('car' in $route.params) {
      return {
        to: '/cars/' + $route.params.brand + '/' + $route.params.model,
        label: `Смотреть все ${cleanUpTitle(newCarStore.car.brand + ' ' + newCarStore.car.model)}`
      }
    } else if ('model' in $route.params) {
      return {
        to: '/cars/' + $route.params.brand,
        label: `Смотреть все ${cleanUpTitle(newStore.model.brand)}`
      }
    } else if ('brand' in $route.params) {
      return {
        to: '/cars',
        label: `Смотреть все новые авто`
      }
    }
  }
  return {
    to: '/',
    label: 'Главная'
  }
}
</script>

<template>
  <section class="breadcrumbs"
    :class="{ hide: ('car' in $route.params || 'brand' in $route.params || 'model' in $route.params) }">
    <div class="container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <NuxtLink to="/">Главная</NuxtLink>
        </li>

        <li v-for="(crumb, index) in breadcrumbs" v-show="crumb" :key="index" class="breadcrumbs__item">
          <NuxtLink :to="crumb.to">{{ decodeURI(cleanUpTitle(crumb.label)).replaceAll('_', ' ') }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>

  <div class="container back__wrapper"
    :class="{ show: ('cars' in $route.params || 'brand' in $route.params || 'model' in $route.params) }"
    v-if="'cars' in $route.params || 'brand' in $route.params || 'model' in $route.params">
    <NuxtLink :to="getCrumb().to" class="back">
      <i class="fa-solid fa-chevron-left"></i>
      {{ getCrumb().label }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.breadcrumbs {
  padding: 20px 0;
  display: block;

  .breadcrumbs__list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;

    .breadcrumbs__item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      &:not(:last-child):after {
        content: '';
        width: 6px;
        height: 6px;
        background: var(--main-color);
        border-radius: 50%;
      }
    }

    .router-link-exact-active {
      font-weight: 500;
      color: var(--main-color);
    }
  }
}

.breadcrumbs.hide {
  @media screen and (max-width: 767px) {
    display: none;
  }
}

.back__wrapper {
  display: none;
  padding: 15px;

  .back {
    padding: 10px 15px;
    border-radius: 20px;
    background: var(--dark-grey);
    color: white;

    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
  }
}

.back__wrapper.show {
  @media screen and (max-width: 767px) {
    display: flex;
  }
}
</style>