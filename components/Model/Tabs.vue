<script setup>
import { useAppStore } from "/stores/AppStore.js";
import { useRoute } from "vue-router";

const appStore = useAppStore();
const $route = useRoute();

const activeTab = ref(1);
const tabsMenu = ref(null);

function scrollToMenu() {
  const menuElement = tabsMenu.value;
  if (menuElement) {
    menuElement.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  scrollToMenu();
});
</script>

<template>
  <section class="section__tabs" ref="tabsMenu">
    <div class="container">
      <div class="tabs__header section__header">
        <div class="tabs__header-item" :class="{ active: activeTab === 1 }" @click="activeTab = 1; scrollToMenu()">
          Комплектации и цены
        </div>
        <div class="tabs__header-item" :class="{ active: activeTab === 2 }" @click="activeTab = 2; scrollToMenu()">
          Фото и характеристики
        </div>
        <div class="tabs__header-item" @click="appStore.newCatalog.scrollIntoView({ behavior: 'smooth' })">
          Авто в наличии
        </div>
        <div class="tabs__header-item" :class="{ active: activeTab === 3 }" @click="activeTab = 3; scrollToMenu()">
          {{ cleanUpTitle($route.params.brand).toUpperCase() }} FINANCE
        </div>
      </div>
      <div class="tabs__body">
        <ModelComplectations v-if="activeTab === 1" />
        <div class="tabs__body-item" v-else-if="activeTab === 2">
          <ModelGallery />
          <ModelСharacteristics />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section__tabs {
  scroll-margin-top: 110px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    scroll-margin-top: 70px;
  }

  .tabs__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;

    @media screen and (max-width: 1024px) {
      gap: 10px;
    }

    @media screen and (max-width: 570px) {
      flex-direction: column;
    }

    .tabs__header-item,
    .tabs__header-link {
      position: relative;
      font-size: 18px;
      line-height: 20px;
      border: 1px solid #333333;
      border-radius: var(--border-button-radius);
      max-width: 300px;
      width: 100%;
      height: 45px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      transition: all 0.3s ease;

      @media screen and (max-width: 1024px) {
        max-width: 48%;
      }

      @media screen and (max-width: 570px) {
        max-width: 100%;
      }
    }

    .tabs__header-item.active,
    .tabs__header-link.active {
      opacity: 1;
    }
  }
}
</style>