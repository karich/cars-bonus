<script setup>
import { apiNew } from "@/constants/";
import { useRoute } from "vue-router";
import { useAppStore } from "/stores/AppStore.js";
import { useNewStore } from "/stores/NewStore.js";

import { useNewCarStore } from "/stores/NewCarStore.js";
const carStore = useNewCarStore();

const $route = useRoute();
const appStore = useAppStore();
const newStore = useNewStore();

const props = defineProps(["currentQuary"]);
let quary = ref("");

const carsLoading = ref(false);

const cars = ref([]);
const query = ref([]);
const carsCount = ref(0);
const totalPages = ref(0);
const page = ref(1);

quary.value = appStore.recentQueryNew || "";

watch(
  () => props.currentQuary,
  (curr, prev) => {
    quary.value = curr;
    appStore.recentQueryNew = curr;
    appStore.currentPerPage = appStore.perPage;

    if (prev.length > 0 || curr.length > 0) {
      updateCars();
    }
  }
);

function updateRecentCars() {
  if (!$route.params.car) {
    appStore.recentCarsNew.cars = cars.value;
    appStore.recentCarsNew.count = carsCount.value;
  }
}

const brand = ref(0);
const model = ref(0);

if ($route.params.car) {
  model.value = carStore.car.car_model_id;
  quary.value += `&car_model_id=${model.value}`;
} else if ($route.params.model) {
  model.value = newStore.models.find(
    (m) => m.url_model === $route.params.model
  ).id;
  quary.value += `&car_model_id=${model.value}`;
}

if ($route.params.brand) {
  brand.value = appStore.newBrands.find(
    (b) => b.url_brand === $route.params.brand
  ).id;
  quary.value += `&brand_id=${brand.value}`;
}

function getCars() {
  if (appStore.recentCarsNew.cars?.length > 0 && !$route.params.car) {
    cars.value = appStore.recentCarsNew.cars;
    carsCount.value = appStore.recentCarsNew.count;
    totalPages.value = appStore.recentCarsNew.totalPages;
    page.value = appStore.recentCarsNew.page;
  } else {
    carsLoading.value = true;

    const url = new URL(`${apiNew}filters/cars`);
    url.searchParams.set("sorting", appStore.newSort);
    url.searchParams.set("page", page.value);
    url.searchParams.set(
      "per_page",
      $route.params.car ? appStore.currentPerPage + 1 : appStore.currentPerPage
    );

    if ($route.params.brand) {
      url.searchParams.set("brand_id", brand.value);
    }

    if ($route.params.model || $route.params.car) {
      url.searchParams.set("car_model_id", model.value);
    }

    fetchClientWrapper(url.toString())
      .then((res) => res.json())
      .then((data) => (query.value = data))

      .then(() => cars.value.push(...query.value.cars.data))
      .then(() => (carsCount.value = query.value.count))
      .then(() => (totalPages.value = query.value.total_pages))

      .then(() =>
        !$route.params.car
          ? (appStore.recentCarsNew.totalPages = totalPages.value)
          : null
      )

      .then(() => updateRecentCars())
      .then(() => (appStore.firstCar = cars.value[0]))

      .then(() => yandexEcommerceArray("impressions", cars.value))
      .then(() => (carsLoading.value = false));
  }
}

function updateCars() {
  carsLoading.value = true;
  page.value = 1;

  fetchClientWrapper(
    `${apiNew}filters/cars?sorting=${appStore.newSort}&per_page=${appStore.currentPerPage
    }&page=${page.value}${quary.value ? `&${quary.value}` : ""}`
  )
    .then((res) => res.json())
    .then((data) => (query.value = data))

    .then(() => (cars.value = query.value.cars.data))
    .then(() => (carsCount.value = query.value.count))
    .then(() => (totalPages.value = query.value.total_pages))
    .then(() => (appStore.recentCarsNew.totalPages = totalPages.value))

    .then(() => updateRecentCars())

    .then(() => yandexEcommerceArray("impressions", cars.value))
    .then(() => (carsLoading.value = false));
}

function loadPage() {
  carsLoading.value = true;
  page.value++;

  const brand = ref(0);
  const model = ref(0);

  if ($route.params.brand) {
    brand.value = appStore.newBrands.find(
      (b) => b.url_brand === $route.params.brand
    );
  }

  if ($route.params.model || $route.params.car) {
    model.value = newStore.models.find(
      (m) => m.url_model === $route.params.model
    );
  }

  fetchClientWrapper(
    `${apiNew}filters/cars?sorting=${appStore.newSort}&per_page=${appStore.currentPerPage
    }${brand.value ? `&brand_id=${brand.value.id}` : ""}${model.value ? `&car_model_id=${model.value.id}` : ""
    }&page=${page.value}${quary.value ? `&${quary.value}` : ""}`
  )
    .then((res) => res.json())
    .then((data) => (query.value = data))

    .then(() => cars.value.push(...query.value.cars.data))
    .then(() => (carsCount.value = query.value.count))
    .then(() => (totalPages.value = query.value.total_pages))
    .then(() => (appStore.recentCarsNew.page = page.value))

    .then(() => updateRecentCars())

    .then(() => yandexEcommerceArray("impressions", cars.value))
    .then(() => (carsLoading.value = false));
}

const checkCars = computed(() => cars.value.length > 1 || !$route.params.car);

const title = computed(() => {
  if ($route.params.car) {
    return `Другие ${cleanUpTitle(
      carStore.car.brand,
      carStore.car.model
    ).toUpperCase()} в наличии`;
  } else if ($route.params.model) {
    return `Новые автомобили ${cleanUpTitle(
      newStore.model.brand,
      newStore.model.model
    ).toUpperCase()} в наличии`;
  } else if ($route.params.brand) {
    return `Новые автомобили ${cleanUpTitle(
      newStore.brand.brand
    ).toUpperCase()} в наличии`;
  } else {
    return "Новые автомобили в наличии";
  }
});

getCars();
</script>

<template>
  <section :ref="(el) => {
    appStore.newCatalog = el;
  }
    " class="cars section" v-if="checkCars && carsCount">
    <div class="cars__content" v-if="!carsLoading">
      <div class="container">
        <CarsNewHead :cars-count="carsCount - ($route.params.car ? 1 : 0)" @update-cars="updateCars()"
          :title="`${title}`" />
      </div>
      <div class="cars__container">
        <div class="container">
          <div class="cars__body cars-template">
            <CarSmallC1 v-for="car in cars" :car="car" :key="car" />
          </div>
          <div class="cars__more" v-if="totalPages > page">
            <button class="cars__more-button" @click="loadPage()">
              Показать еще
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="cars__content">
      <div class="container">
        <div class="skeleton" />
      </div>
      <div class="cars__container">
        <div class="container">
          <div class="cars__body cars-template">
            <div v-for="car in cars.length == 0
              ? appStore.currentPerPage
              : cars.length" :key="car" class="skeleton-car">
              <div class="image skeleton" />
              <div class="small-text skeleton" />
              <div class="text skeleton" />
              <div class="text skeleton" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cars {
  scroll-margin-top: 100px;

  @media screen and (max-width: 768px) {
    scroll-margin-top: 60px;
  }

  .cars__content {
    display: flex;
    flex-direction: column;

    .cars__more {
      display: flex;
      justify-content: center;
      padding: 25px 0;

      .cars__more-button {
        font-weight: 500;
        color: var(--main-black);
        background: var(--bg-light);
        box-shadow: 0px 2px 6px 0px #00000026;
        border-radius: var(--border-button-radius);
        border: 1px solid transparent;
        width: 260px;
        height: 50px;
        transition: all .3s ease;

        &:hover {
          box-shadow: none;
          border: var(--border);
        }
      }
    }
  }
}
</style>
