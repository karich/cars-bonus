<script setup>
import { apiNew } from "@/constants";
import { ref, onMounted } from 'vue';

const taxiMenu = ref(null);

function scrollToMenu() {
  const menuElement = taxiMenu.value;
  if (menuElement) {
    menuElement.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  scrollToMenu();
});

const selectedTag = ref(6);
const models = ref([]);

function getModels() {
  fetchClientWrapper(`${apiNew}filters/models?model_tag_id=${selectedTag.value}`)
    .then((res) => res.json())
    .then((data) => (models.value = data.models));
}

watch(selectedTag, (newValue, oldValue) => {
  getModels();
});

getModels();
</script>

<template>
  <section class="taxi__section section" ref="taxiMenu">
    <div class="container">
      <div class="section__body">
        <div class="taxi__wrapper">
          <div class="taxi__filter">
            <BaseSectionTitle :title="`Выбрать категорию авто под такси`" />
            <div class="taxi__menu">
              <div class="taxi__menu-block">
                <label data-type="eco" class="taxi__menu-item" :class="{ active: selectedTag === 6 }"
                  @click="selectedTag = 6; scrollToMenu()">
                  <input type="checkbox" value="eco" class="taxi__check" />
                  <span class="checkbox__switch"></span>
                  <p class="taxi__menu-title">Эконом</p>
                  <p class="taxi__menu-text">
                    <span>Hyundai Solaris, Kaiyi E5, Kia Rio</span>
                  </p>
                  <NuxtImg class="taxi__menu-img" format="webp" src="/images/taxi1.webp" alt="Эконом" />
                </label>
              </div>
              <div class="taxi__menu-block">
                <label data-type="com" class="taxi__menu-item" @click="selectedTag = 5; scrollToMenu()"
                  :class="{ active: selectedTag === 5 }">
                  <input type="checkbox" value="com" class="taxi__check" />
                  <span class="checkbox__switch"></span>
                  <p class="taxi__menu-title">Комфорт</p>
                  <p class="taxi__menu-text">
                    <span>Chery Arrizo 8, Haval F7, Omoda C5</span>
                  </p>
                  <NuxtImg class="taxi__menu-img" format="webp" src="/images/taxi2.webp" alt="Комфорт" />
                </label>
              </div>
              <div class="taxi__menu-block">
                <label data-type="plus" class="taxi__menu-item" @click="selectedTag = 7; scrollToMenu()"
                  :class="{ active: selectedTag === 7 }">
                  <input type="checkbox" value="plus" class="taxi__check" />
                  <span class="checkbox__switch"></span>
                  <p class="taxi__menu-title">Комфорт +</p>
                  <p class="taxi__menu-text">
                    <span>Kia K5, Geely Tugella, Mazda 6</span>
                  </p>
                  <NuxtImg class="taxi__menu-img" format="webp" src="/images/taxi3.webp" alt="Комфорт +" />
                </label>
              </div>
              <div class="taxi__menu-block">
                <label data-type="kid" class="taxi__menu-item" @click="selectedTag = 8; scrollToMenu()"
                  :class="{ active: selectedTag === 8 }">
                  <input type="checkbox" value="kid" class="taxi__check" />
                  <span class="checkbox__switch"></span>
                  <p class="taxi__menu-title">Детский</p>
                  <p class="taxi__menu-text">
                    <span>Geely Okavango, Kia Ceed, Haval M6</span>
                  </p>
                  <NuxtImg class="taxi__menu-img" format="webp" src="/images/taxi4.webp" alt="Детский" />
                </label>
              </div>
            </div>
          </div>
          <BaseSectionTitle :title="`Авто под такси`" />
          <div class="taxi__list">
            <CarSmallTM1 v-for="model in models" :key="model.id" :model="model" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.taxi__section {
  scroll-margin-top: 110px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    scroll-margin-top: 70px;
  }

  .taxi__wrapper {
    display: flex;
    flex-direction: column;

    .title {
      border-bottom: 2px solid var(--taxi);
    }

    .taxi__filter {
      margin-bottom: 30px;

      .taxi__menu {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        overflow-x: auto;
        padding: 20px 5px;

        @media screen and (max-width: 1200px) {
          gap: 14px;
        }

        .taxi__menu-block {
          min-width: 320px;
          height: 208px;

          @media screen and (max-width: 1200px) {
            min-width: 260px;
          }
        }

        .taxi__menu-item {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: var(--bg-light);
          border-radius: 4px;
          border: var(--border);
          border-width: 2px;
          padding: 20px 12px;
          cursor: pointer;
          opacity: .6;
          transition: all 0.3s ease;

          input[type="checkbox"] {
            display: none;
          }

          .checkbox__switch {
            display: block;
            position: absolute;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
            transition: all 0.3s ease;
          }

          .taxi__menu-title {
            font-weight: 500;
            font-size: 20px;
            line-height: 22px;
            margin-bottom: 20px;
          }

          .taxi__menu-text {
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 10px;

            & span {
              font-size: 14px;
              line-height: 16px;
              color: #828282;
              background: transparent;
              transition: all 0.3s ease;
            }
          }

          .taxi__menu-img {
            width: 100%;
            height: 100px;
            object-fit: contain;
            margin: 0 auto;
            transition: all 0.3s ease;
          }
        }

        .taxi__menu-item.active {
          background: #FBFBFB;
          border-radius: var(--border-medium-radius);
          box-shadow: 0px 0px 20px 0px #0000001A;
          opacity: 1;

          .checkbox__switch {
            background: url(/svg/taxi-check.svg) no-repeat center;
            background-size: contain;
          }
        }
      }

      .taxi__menu::-webkit-scrollbar {
        height: 4px;
        background: #ccc;
        border-radius: 5px;
      }

      .taxi__menu::-webkit-scrollbar-thumb {
        background: var(--main-color);
        border-radius: 5px;
      }
    }

    .taxi__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding-bottom: 10px;

      @media screen and (max-width: 1439px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-width: 1023px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}
</style>
