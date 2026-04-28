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
  <footer class="footer">
    <div class="container">
      <section class="footer__content">
        <div class="footer__content-left">
          <div class="footer__content-logo">
            <BaseLogoW />
            <a class="footer__info-tel" :href="`tel:+${appStore.clearPhone}`">
              {{ appStore.phone }}
            </a>
            <NuxtLink class="footer__info-adress" to="/contact/">
              {{ appStore.address }}
            </NuxtLink>
            <ul class="footer__nav">
              <li class="footer__nav-item">
                <NuxtLink class="footer__nav-link" to="/">Главная</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink class="footer__nav-link" to="/cars/">Каталог авто</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/cars/china" class="footer__nav-link">Китайские авто</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink to="/cars/taxi" class="footer__nav-link">Авто для такси</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink class="footer__nav-link" to="/credit/">Автокредит</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink class="footer__nav-link" to="/trade-in/">Трейд-ин</NuxtLink>
              </li>
              <li class="footer__nav-item">
                <NuxtLink class="footer__nav-link" to="/contact/">Контакты</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="footer__content-center">
            <h2>Каталог новых авто</h2>
            <FooterBrands />
          </div>
        </div>
        <div class="footer__content-right">
          <div class="footer__info">
            <p>
              Обращаем Ваше внимание на то, что данный сайт носит исключительно
              информационный характер и ни при каких условиях не является
              публичной офертой, определяемой положениями статьи 437 Гражданского
              кодекса Российской Федерации. Все цены указаны с учетом максимальной
              скидки на авто и при условии покупки в кредит и включают в себя
              обязательные страховые продукты, которые согласовываются и
              оплачиваются отдельно.
            </p>
            <p>
              {{ appStore.politics }}
            </p>
            <NuxtLink to="/politics/">Политика конфиденциальности</NuxtLink>
            <p>
              Для получения более подробной информации об указанных акциях, а
              также о стоимости автомобилей обращайтесь к менеджерам по продажам.
            </p>
          </div>
        </div>
      </section>

      <PieceScrollTop />
    </div>

    <Teleport to="body">
      <div class="callback-button">
        <BaseButtonModal :btn-label="'Заказать обратный звонок'" :modal-title="'Заказать обратный звонок'"
          :btn-class="`callback-fixed`" :app-type="6" :car="car" />
      </div>
    </Teleport>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: var(--bg-light);
  background: #282A2B;
  padding: 50px 0 40px;

  @media screen and (max-width: 540px) {
    padding: 30px 0 80px;
  }

  .footer__content {
    position: relative;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1199px) {
      flex-direction: column;
      gap: 30px;
    }

    .footer__content-left {
      display: flex;
      justify-content: space-between;
      gap: 20px;

      @media screen and (max-width: 540px) {
        width: 100%;
      }

      .footer__content-logo {
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 359px) {
          align-items: center;
        }

        .footer__info-tel {
          position: relative;
          font-weight: 700;
          font-size: 24px;
          line-height: 28px;
          margin-bottom: 20px;
          padding-left: 36px;

          @media screen and (max-width: 359px) {
            margin-right: auto;
          }

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 26px;
            height: 25px;
            background: url(/svg/footer-tel.svg) no-repeat center / contain;
          }
        }

        .footer__info-adress {
          position: relative;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          padding-left: 34px;
          margin-bottom: 25px;

          @media screen and (max-width: 460px) {
            margin-bottom: 35px;
          }

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 24px;
            height: 25px;
            background: url(/svg/footer-address.svg) no-repeat center / contain;
          }
        }

        .footer__nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px 20px;
          margin-top: auto;

          @media screen and (max-width: 767px) {
            display: flex;
            flex-wrap: wrap;
            gap: 20px 30px;
            border-top: 1px solid #f3f6f933;
            border-bottom: 1px solid #f3f6f933;
            padding: 20px 0;
          }

          .footer__nav-item {
            font-size: 16px;
            line-height: 18px;
            text-transform: uppercase;
            min-width: max-content;

            @media screen and (max-width: 767px) {
              font-size: 14px;
              line-height: 16px;
            }
          }
        }
      }

      .footer__content-center {

        @media screen and (max-width: 767px) {
          display: none;
        }

        & h2 {
          font-weight: 900;
          font-size: 16px;
          line-height: 20px;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 20px;
        }
      }
    }

    .footer__content-right {
      .footer__info {
        & a {
          display: block;
          text-decoration: underline;
          margin: 15px 0;
        }
      }
    }
  }
}

.callback-button {
  display: none;
  position: fixed;
  bottom: 10px;
  padding: 0 10px;
  z-index: 99;
  width: 100%;

  @media screen and (max-width: 540px) {
    display: flex;
  }
}
</style>
