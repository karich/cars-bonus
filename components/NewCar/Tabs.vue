<script setup>
import { useNewCarStore } from "/stores/NewCarStore.js";
import { useAppStore } from "/stores/AppStore.js";

const appStore = useAppStore();
const carStore = useNewCarStore();

const car = ref([]);
car.value = carStore.car;

// const activeTab = ref(0);
const activeTabOptions = ref(false);
const activeTabTech = ref(false);
</script>

<template>
  <section class="car-tabs section">
    <div class="container">
      <!-- <div class="car-tabs__wrapper">
				<div class="buttons__show-list">
					<h2
						class="title__show-list"
						:class="{ active: activeTab == 0 }"
						@click="activeTab = 0"
					>
						Опции автомобиля
					</h2>
					<h2
						class="title__show-list"
						:class="{ active: activeTab == 1 }"
						@click="activeTab = 1"
					>
						Технические характеристики
					</h2>
				</div>
			</div> -->

      <!-- <div class="accordion" :class="{ hide: activeTab != 0 }"> -->
      <div class="accordion accordion__options">
        <h2 class="title__show-list" :class="{ active: activeTabOptions }"
          @click="activeTabOptions = !activeTabOptions">
          Опции автомобиля
        </h2>
        <div class="accordion__content option__content" :class="{ hide: activeTabOptions }">
          <div class="accordion__block" v-if="car.complectation.safety"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Безопасность</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.safety"></ul>
          </div>
          <div class="accordion__block" v-if="car.complectation.exterior"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Экстерьер</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.exterior"></ul>
          </div>
          <div class="accordion__block" v-if="car.complectation.interior"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Интерьер</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.interior"></ul>
          </div>
          <div class="accordion__block" v-if="car.complectation.comfort"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Комфорт</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.comfort"></ul>
          </div>
          <div class="accordion__block" v-if="car.complectation.overview"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Обзор</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.overview"></ul>
          </div>
          <div class="accordion__block" v-if="car.complectation.multimedia"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Мультимедиа</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.multimedia"></ul>
          </div>
          <div class="accordion__block" v-if="car.complectation.сar_theft_protection"
            @click="$event.target.parentNode.classList.toggle('active')">
            <h3 class="accordion__title">Защита от угона</h3>
            <ul class="accordion__list" v-htmlSanitizer="car.complectation.сar_theft_protection"></ul>
          </div>
        </div>
      </div>

      <!-- <div class="accordion" :class="{ hide: activeTab != 1 }"> -->
      <div class="accordion">
        <h2 class="title__show-list" :class="{ active: activeTabTech }" @click="activeTabTech = !activeTabTech">
          Технические характеристики
        </h2>
        <div class="accordion__content tech__content" :class="{ hide: !activeTabTech }">
          <div class="tech__content-img">
            <NuxtImg format="webp" src="/images/spec__tech.webp" alt="car" />
            <p>{{ car.modification.length }}</p>
            <p>{{ car.modification.height }}</p>
            <p>{{ car.modification.width }}</p>
          </div>
          <ul class="accordion__list accordion__list-tech" id="tech">
            <li class="list-group-item" v-if="car.modification.length">
              <span>Длина, мм.</span><span>{{ car.modification.length }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.height">
              <span>Высота, мм.</span><span>{{ car.modification.height }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.width">
              <span>Ширина, мм.</span><span>{{ car.modification.width }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.wheel_base">
              <span>Колесная база, мм.</span>
              <span>{{ car.modification.wheel_base }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.clearance">
              <span>Клиренс, мм.</span>
              <span>{{ car.modification.clearance }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.fuel">
              <span>Тип двигателя</span>
              <span>{{ car.modification.fuel }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.engine_size">
              <span>Объем двигателя, л.</span>
              <span>{{ car.modification.engine_size }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.displacement">
              <span>Рабочий объем двигателя, см3.</span>
              <span>{{ car.modification.displacement }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.power">
              <span>Мощность, л.с.</span>
              <span>{{ car.modification.power }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.number_of_gears">
              <span>Количество передач</span>
              <span>{{ car.modification.number_of_gears }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.from_0_to_100">
              <span>Разгон от 0 до 100 км/ч, сек.</span>
              <span> {{ car.modification.from_0_to_100 }} </span>
            </li>
            <li class="list-group-item" v-if="car.modification.max_speed">
              <span>Максимальная скорость, км/ч.</span>
              <span> {{ car.modification.max_speed }} </span>
            </li>
            <li class="list-group-item" v-if="car.modification.consumption_highway">
              <span>Расход топлива на трассе, л/100 км.</span>
              <span> {{ car.modification.consumption_highway }} </span>
            </li>
            <li class="list-group-item" v-if="car.modification.consumption_city">
              <span>Расход топлива в городе, л/100 км.</span>
              <span> {{ car.modification.consumption_city }} </span>
            </li>
            <li class="list-group-item" v-if="car.modification.consumption_combine">
              <span>Смешанный расход топлива, л/100 км.</span>
              <span> {{ car.modification.consumption_combine }} </span>
            </li>
            <li class="list-group-item" v-if="car.modification.fuel_tank_capacity">
              <span>Объем топливного бака, л.</span>
              <span>{{ car.modification.fuel_tank_capacity }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.trunk_capacity">
              <span>Объем багажного отделения, л.</span>
              <span>{{ car.modification.trunk_capacity }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.curb_weight">
              <span>Снаряженная масса, кг.</span>
              <span>{{ car.modification.curb_weight }}</span>
            </li>
            <li class="list-group-item" v-if="car.modification.max_weight">
              <span>Максимальная масса, кг.</span>
              <span>{{ car.modification.max_weight }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.car-tabs {
  padding: 20px 0;

  .buttons__show-list {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;

    @media screen and (max-width: 767px) {
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }

    @media screen and (max-width: 480px) {
      flex-direction: column;
      gap: 10px;
    }
  }

  .accordion {
    display: block;
    background: var(--bg-light);
    box-shadow: 0px 4px 10px 0px rgba(77, 87, 107, 0.2784313725);
    border-radius: var(--border-medium-radius);
    margin-bottom: 12px;

    .title__show-list {
      position: relative;
      font-weight: 500;
      font-size: 26px;
      line-height: 30px;
      width: 100%;
      padding: 25px 20px;
      cursor: pointer;

      @media screen and (max-width: 540px) {
        font-size: 20px;
        line-height: 24px;
        padding: 20px 10px;
      }

      @media screen and (max-width: 375px) {
        font-size: 18px;
        line-height: 20px;
        padding: 20px 8px;
      }

      &::after {
        content: "";
        position: absolute;
        top: calc(50% - 14px);
        right: 20px;
        width: 28px;
        height: 28px;
        background: url(/svg/arrow-show.svg) no-repeat center;
        background-size: contain;

        @media screen and (max-width: 540px) {
          right: 10px;
        }

        @media screen and (max-width: 375px) {
          right: 8px;
        }
      }
    }

    .title__show-list.active {
      &::after {
        transform: rotate(180deg);
      }
    }

    .accordion__content {
      display: block;
      border-radius: var(--border-medium-radius);

      .accordion__block {
        padding: 10px 20px;
        border-radius: var(--border-medium-radius);

        @media screen and (max-width: 540px) {
          padding: 10px;
        }

        @media screen and (max-width: 375px) {
          padding: 10px 8px;
        }

        .accordion__title {
          position: relative;
          font-weight: 500;
          font-size: 20px;
          line-height: 22px;
          pointer-events: none;

          @media screen and (max-width: 540px) {
            font-size: 17px;
            line-height: 20px;
          }

          @media screen and (max-width: 375px) {
            font-size: 16px;
            line-height: 18px;
          }
        }

        .accordion__list {
          display: block;
          columns: 3;
          margin-left: 15px;
          margin-top: 20px;
          border-radius: var(--border-medium-radius);

          @media screen and (max-width: 768px) {
            columns: 2;
          }

          @media screen and (max-width: 540px) {
            columns: 1;
            margin-top: 10px;
          }
        }
      }

      .accordion__block.active {
        .accordion__title {
          &::after {
            transform: rotate(180deg);
          }
        }

        .accordion__list {
          display: none;
        }
      }
    }

    .tech__content {
      display: none;
      justify-content: space-between;
      align-items: center;
      gap: 40px 60px;
      padding: 10px 20px 20px;
      margin: 0;

      @media screen and (max-width: 1023px) {
        flex-direction: column;
        align-items: center;
      }

      @media screen and (max-width: 540px) {
        padding: 15px 10px;
      }

      .tech__content-img {
        position: relative;
        min-width: 283px;
        width: 283px;
        height: 144px;

        @media screen and (max-width: 425px) {
          margin-right: 15px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        p {
          position: absolute;
          bottom: -15px;
          right: 70px;
          height: max-content;
          font-size: 16px;
          line-height: 20px;
          background: transparent;

          &:nth-child(3) {
            bottom: 64px;
            right: -20px;
            -webkit-writing-mode: vertical-lr;
            -ms-writing-mode: tb-lr;
            writing-mode: vertical-lr;
            transform: rotate(180deg);
          }

          &:nth-child(4) {
            bottom: -15px;
            right: initial;
            left: 55px;
          }
        }
      }

      .accordion__list-tech {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px 20px;
        width: 100%;

        @media screen and (max-width: 1439px) {
          grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 580px) {
          grid-template-columns: 1fr;
        }

        li {
          display: flex;
          justify-content: space-between;
          gap: 20px;

          @media screen and (max-width: 1199px) {
            margin-left: 0;
          }

          span {
            &:last-child {
              font-weight: 600;
              text-align: right;
            }
          }
        }
      }
    }

    .accordion__content.hide {
      display: none;
    }

    .tech__content.hide {
      display: flex;
    }
  }

  .accordion__options {
    margin-bottom: 30px;
  }

  .accordion.hide {
    display: none;
  }

  .accordion__list {
    &:deep(li) {
      position: relative;
      line-height: 20px;
      list-style: disc;
    }
  }
}
</style>
