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

const active = ref(false);

let showBurger = ref(false);
function toggleBurger() {
  showBurger.value = !showBurger.value;

  if (showBurger.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  if (window.scrollY > 0) {
    active.value = true;
  } else {
    active.value = false;
  }
}

watch($route, () => (showBurger.value = false));

const textArray = [
  `Спецпредложение ${getMonth()}!`,
  `Успейте купить автомобиль до повышения акцизных ставок!`,
  `Спецпредложение ${getMonth()}!`,
  `Успейте купить автомобиль до повышения акцизных ставок!`,
];
</script>

<template>
  <header class="header" :class="{ active: active, header__home: $route.path == '/' }">
    <div class="container">
      <div class="header__content">
        <BaseLogo />
        <nav class="header__navbar">
          <ul class="navbar-list">
            <li class="navbar-item dropdown">
              <NuxtLink class="navbar-link dropdown-head-link">Автомобили <i class="fa-solid fa-chevron-down"></i>
              </NuxtLink>
              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <NuxtLink to="/cars" class="dropdown-link">Все авто</NuxtLink>
                </li>
                <li class="dropdown-item">
                  <NuxtLink to="/cars/china" class="dropdown-link">Китайские авто</NuxtLink>
                </li>
                <li class="dropdown-item">
                  <NuxtLink to="/cars/taxi" class="dropdown-link">Авто для такси</NuxtLink>
                </li>
              </ul>
            </li>
            <li class="navbar-item">
              <NuxtLink to="/credit" class="navbar-link">Автокредит</NuxtLink>
            </li>
            <li class="navbar-item">
              <NuxtLink to="/trade-in" class="navbar-link">Трейд-ин</NuxtLink>
            </li>
            <li class="navbar-item">
              <NuxtLink to="/contact" class="navbar-link">Контакты</NuxtLink>
            </li>
          </ul>
        </nav>
        <BaseButtonModal :btnLabel="'Перезвоните мне'"
          :modalTitle="`Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!`" :appType="6"
          btnClass="header" :car="car" />
        <!-- <a :href="`tel:+${appStore?.clearPhone}`" class="header__call-link">
          <NuxtImg src="/svg/header-phone.svg" alt="phone" />
          <p>{{ appStore.phone }}
            <span>обратный звонок</span>
          </p>
        </a> -->
        <div class="burger" @click="toggleBurger()" :class="{ open: showBurger }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div class="mobile-menu__overlay" :class="{ active: showBurger }">
        <div class="mobile-menu__overlay-content">
          <PieceNavbar :class="`burger`" />
          <PieceContacts class="burger" />
          <FormSmall class="burger" :car="car" />
        </div>
      </div>
    </Teleport>
  </header>
  <ClientOnly>
    <Vue3Marquee :pause-on-hover="true" class="marquee__content">
      <p class="message" v-for="(text, index) in textArray" :key="index">
        {{ text }}
      </p>
    </Vue3Marquee>
  </ClientOnly>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  height: auto;
  z-index: 999;
  background: var(--bg-light);
  transition: all 0.1s ease;
  width: 100%;

  .container {
    .header__content {
      position: relative;
      display: grid;
      grid-template-columns: auto 1fr auto;
      justify-items: center;
      align-items: center;
      background: var(--bg-light);
      gap: 0 15px;
      padding: 10px 0;

      @media screen and (max-width: 1200px) {
        padding: 17px 0;
      }

      @media screen and (max-width: 768px) {
        padding: 8px 0;
      }

      .header__navbar {
        width: 100%;

        @media screen and (max-width: 768px) {
          display: none;
        }

        .dropdown {
          position: relative;

          &:hover {
            .dropdown-list {
              visibility: visible;
              opacity: 1;
              pointer-events: all;
            }

            .dropdown-head-link {
              i {
                transform: rotate(-180deg);
                transition: 0.3s;
              }
            }
          }

          .dropdown-head-link {
            transition: 0.3s;
          }

          .dropdown-list {
            position: absolute;
            top: 25px;
            left: -35px;
            visibility: hidden;
            opacity: 0;
            background: var(--bg-light);
            box-shadow: 15px -15px 30px 0px rgba(230, 230, 230, 0.2),
              -15px 15px 30px 0px rgba(230, 230, 230, 0.2);
            border-radius: 0 30px 30px 30px;
            width: max-content;
            padding: 30px 28px;
            pointer-events: none;
            transition: all 0.3s ease;

            .dropdown-item {
              color: var(--main-black);
              position: relative;
              padding-right: 30px;
              font-size: 16px;
              line-height: 18px;
              color: #2d2d2d;
              border-bottom: 1px solid #f2f2f2;
              margin-bottom: 20px;
              transition: all 0.3s ease;
              display: block;
              padding: 10px 0;
              cursor: pointer;
              white-space: nowrap;

              &:hover {
                color: var(--secondary-color);
                transition: all 0.3s ease;
                border-color: var(--secondary-color);
              }
            }
          }
        }

        .navbar-list {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;

          .navbar-item {
            .navbar-link {
              transition: 0.3s;
              font-size: 16px;
              padding: 5px 0;
              color: var(--main-black);
              cursor: pointer;

              @media screen and (max-width: 1023px) {
                font-size: 15px;
              }
            }

            .router-link-active,
            .navbar-link:hover {
              transition: 0.3s;
              color: var(--main-color);
              position: relative;
            }
          }
        }
      }

      .header__call-link {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-left: auto;

        @media screen and (max-width: 768px) {
          margin-right: 100px;
        }

        @media screen and (max-width: 540px) {
          margin-right: 60px;
        }

        & img {
          width: 40px;
          height: 40px;
          object-fit: contain;

          @media screen and (max-width: 768px) {
            width: 30px;
            height: 30px;
          }
        }

        & p {
          font-weight: 500;
          font-size: 18px;
          line-height: 18px;
          color: #5B5C5D;

          @media screen and (max-width: 1023px) {
            display: none;
          }

          & span {
            display: block;
            line-height: 14px;
            color: #454546;
            text-decoration: underline;
            margin-top: 5px;
          }
        }
      }

      // .header__menu.mobile-menu {
      //   display: none;

      //   @media screen and (max-width: 768px) {
      //     display: block;
      //     font-size: 32px;
      //     padding: 3px 16px;
      //     padding-right: 0;
      //     color: var(--main-black);
      //   }
      // }

      .burger {
        display: none;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        cursor: pointer;
        z-index: 100;

        @media screen and (max-width: 768px) {
          display: block;
        }

        & span {
          background: var(--main-black);
          display: block;
          position: absolute;
          left: 0;
          width: 75%;
          height: 5px;
          border-radius: 14px;
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
          -o-transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
          transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
          opacity: 1;
        }

        & span:nth-child(1) {
          top: 8px;
          left: initial;
          right: 0;
        }

        & span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
          transition: none !important;
          width: 100%;
        }

        & span:nth-child(3) {
          top: initial;
          bottom: 8px;
          left: initial;
          right: 0;
        }
      }

      .burger.open {
        & span {
          transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        & span:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(135deg);
          width: 100%;
        }

        & span:nth-child(2) {
          opacity: 0;
        }

        & span:nth-child(3) {
          top: 50%;
          transform: translateY(-50%) rotate(-135deg);
          width: 100%;
        }
      }
    }
  }
}

.header.active {
  box-shadow: 0px 30px 60px 0px #0000000D;
}

// .header__home {
//   top: 30px;

//   @media screen and (max-width: 768px) {
//     top: 0;
//   }
// }

// .header.active {
//   top: 0;

//   .container {
//     max-width: 100%;

//     .header__content {
//       border-radius: 0 0 5px 5px;
//     }
//   }
// }

.mobile-menu__overlay {
  padding: 20px;
  position: fixed;
  top: 60px;
  min-height: 100vh;
  background: var(--bg-light);
  z-index: 100;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transform: translateX(-100%);
  transition: all .3s ease;

  .mobile-menu__overlay-content {
    overflow-y: auto;
    max-height: 100vh;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0 0 100px 0;
    padding-right: 20px;
  }
}

.mobile-menu__overlay.active {
  transform: translateX(0);
  transition: all .3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

.marquee__content {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background: var(--linear-button);
  padding: 15px;
  gap: 30px;

  .message {
    position: relative;
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--bg-light);
    margin: 0 40px;
    margin-left: auto;

    @media screen and (max-width: 540px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
