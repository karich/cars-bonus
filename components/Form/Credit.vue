<script setup>
import { options, name } from "@/constants/";

import { vMaska } from "maska/vue"

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

import { useRoute } from 'vue-router';
const $route = useRoute();

import { ref, computed, watch, onMounted } from 'vue';

const emits = defineEmits(['showCar']);

const props = defineProps({
  minPercent: {
    type: Number,
  },
  submitText: {
    type: String,
    default: 'Оставить заявку',
  },
});

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
  formChecked.value = value
}
/* Form Check */

/* Time List */
const timeListOutputData = ref(0);
const carInitialFee = ref(0);
const carPrice = ref(0);
const currCar = ref([]);
const showAuto = ref(false);

function percentListOutput(value) {
  carInitialFee.value = value
}

function timeListOutput(value) {
  if (value == 0) {
    timeListOutputData.value = 0.5 * 12
  } else {
    timeListOutputData.value = value * 12
  }
}

let monthlyPayment = computed(() => {
  if (creditStore.carNew == 0) {
    return 0
  } else {
    let i = (($route.name == 'leasing' ? 7 : (appStore.selectedBank?.percent ? appStore.selectedBank.percent : appStore.creditPercent)) / 12) / 100;
    let k = ((carPrice.value) - ((carPrice.value * carInitialFee.value) / 100));
    let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
    let numb = (k * num);

    return Math.floor(numb)
  }
})
/* Time List */

const formSend = ref(false)

const phoneValue = ref('')
const phoneError = ref(false)
const phonePasteAttempts = ref(0)
const phoneInputRef = ref(null)

const nameValue = ref('')
const nameError = ref(false)
const namePasteAttempts = ref(0)
const nameInputRef = ref(null)

const valueApp = ref('')

const phoneFieldName = ref(`phone-${Math.random().toString(36).substr(2, 9)}`)
const nameFieldName = ref(`name-${Math.random().toString(36).substr(2, 9)}`)

// Обработчики вставки для телефона
function handlePhonePaste(e) {
  e.preventDefault();
  phonePasteAttempts.value++;
  
  // Показываем визуальную обратную связь
  if (phoneInputRef.value) {
    phoneInputRef.value.classList.add('paste-blocked');
    setTimeout(() => {
      phoneInputRef.value?.classList.remove('paste-blocked');
    }, 500);
  }
  
  // После 3 попыток показываем уведомление
  if (phonePasteAttempts.value >= 3) {
    phoneError.value = true;
    setTimeout(() => {
      phoneError.value = false;
    }, 3000);
  }
  
  return false;
}

function handlePhoneCopy(e) {
  e.preventDefault();
  return false;
}

function handlePhoneCut(e) {
  e.preventDefault();
  return false;
}

// Обработчики вставки для имени
function handleNamePaste(e) {
  e.preventDefault();
  namePasteAttempts.value++;
  
  // Показываем визуальную обратную связь
  if (nameInputRef.value) {
    nameInputRef.value.classList.add('paste-blocked');
    setTimeout(() => {
      nameInputRef.value?.classList.remove('paste-blocked');
    }, 500);
  }
  
  return false;
}

function handleNameCopy(e) {
  e.preventDefault();
  return false;
}

function handleNameCut(e) {
  e.preventDefault();
  return false;
}

// Обработчики клавиш
function handlePhoneKeyDown(e) {
  const isPasteCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
  const isCopyCombo = (e.ctrlKey || e.metaKey) && ['c', 'x'].includes(e.key.toLowerCase());
  
  if (isPasteCombo || isCopyCombo) {
    e.preventDefault();
    if (phoneInputRef.value) {
      phoneInputRef.value.classList.add('shortcut-blocked');
      setTimeout(() => {
        phoneInputRef.value?.classList.remove('shortcut-blocked');
      }, 300);
    }
  }
}

function handleNameKeyDown(e) {
  const isPasteCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
  const isCopyCombo = (e.ctrlKey || e.metaKey) && ['c', 'x'].includes(e.key.toLowerCase());
  
  if (isPasteCombo || isCopyCombo) {
    e.preventDefault();
    if (nameInputRef.value) {
      nameInputRef.value.classList.add('shortcut-blocked');
      setTimeout(() => {
        nameInputRef.value?.classList.remove('shortcut-blocked');
      }, 300);
    }
  }
}

// Глобальные обработчики
function setupGlobalProtection() {
  document.addEventListener('keydown', handleGlobalKeyDown);
}

function handleGlobalKeyDown(e) {
  const activeElement = document.activeElement;
  const isPasteCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
  
  if (isPasteCombo && 
      (activeElement === phoneInputRef.value || activeElement === nameInputRef.value)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
}

onMounted(() => {
  setupGlobalProtection();
  
  // Настройка полей для отключения автозаполнения
  if (phoneInputRef.value) {
    phoneInputRef.value.setAttribute('autocomplete', 'new-tel');
    phoneInputRef.value.setAttribute('autocorrect', 'off');
    phoneInputRef.value.setAttribute('autocapitalize', 'off');
    phoneInputRef.value.setAttribute('spellcheck', 'false');
    phoneInputRef.value.setAttribute('data-lpignore', 'true');
  }
  
  if (nameInputRef.value) {
    nameInputRef.value.setAttribute('autocomplete', 'new-name');
    nameInputRef.value.setAttribute('autocorrect', 'off');
    nameInputRef.value.setAttribute('autocapitalize', 'off');
    nameInputRef.value.setAttribute('spellcheck', 'false');
    nameInputRef.value.setAttribute('data-lpignore', 'true');
  }
});

const validateForm = () => {
  const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

  const formValues = {
    phone: clearPhone,
    name: nameValue.value,
    fee: `${(carPrice.value - carInitialFee.value) * (appStore.selectedBank?.percent ? appStore.selectedBank.percent : appStore.creditPercent) / 100} руб перв. взнос`,
    timeListOutputData: `${timeListOutputData.value} (мес.) срок кредитования`,
    monthlyPayment: `${monthlyPayment.value} руб/мес платеж`,
    app: valueApp.value
  }

  const appType = 2
  const car = creditStore.carNew
  const categoty = 'new'

  if (clearPhone.length == 11 && nameValue.value.length > 0) {
    postForm(formValues, appType, car, categoty);
  } else {
    if (clearPhone.length < 11) {
      phoneError.value = true
      setTimeout(() => {
        phoneError.value = false
      }, 3000)
    }

    if (nameValue.value.length == 0) {
      nameError.value = true
      setTimeout(() => {
        nameError.value = false
      }, 3000)
    }
  }
};

watch(() => creditStore.carNew, (currentData) => {
  if (currentData?.price) {
    carPrice.value = currentData.price - currentData?.sale
  }
})

watch(() => creditStore.category, (currentData) => {
  carPrice.value = 0
  creditStore.carNew = null
})
</script>

<template>
  <form class="form__form-content" @submit.prevent="validateForm">

    <div class="form__form-block">
      <div class="car__choice" type="button" @click="creditStore.modalShow()">

        <div class="car__choice-wrapper" :class="{ 'car': creditStore.carNew?.price }"
          v-if="creditStore.category == 'new'">
          <span class="title" :class="{ 'car': creditStore.carNew?.price }">
            Выберите новый авто
          </span>
          <div class="value" v-if="creditStore.carNew">
            <div class="value-block">
              <div class="image">
                <NuxtImg lazy format="webp" quality="90" loading="lazy"
                  :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : ''}`" />
              </div>
              <div class="price">
                <div class="value-name">
                  {{
                    creditStore.carNew?.price ? cleanUpTitle(creditStore.carNew.brand, creditStore.carNew.model,
                      creditStore.carNew.modification.modification,
                      creditStore.carNew.complectation.complectation) : ''
                  }}
                </div>
                <del class="old">
                  от {{ makeSpaces(creditStore.carNew.price) }} ₽
                </del>
                <p class="current">
                  от
                  {{ makeSpaces(creditStore.carNew.price - creditStore.carNew?.sale) }}
                  ₽
                </p>
                <p class="credit">
                  от
                  <span>{{
                    makeSpaces(appStore.calcMonthPriceModel(creditStore.carNew?.sale,
                      creditStore.carNew.price)) }}
                    ₽</span>/мес.
                </p>
                <ul class="car-show__params-list">
                  <li class="car-show__params-item" v-if="creditStore.carNew.modification.power">
                    <span class="title">Мощность</span>
                    <span class="value">{{ creditStore.carNew.modification.power }}
                      л.с.</span>
                  </li>
                  <li class="car-show__params-item" v-if="creditStore.carNew.modification.from_0_to_100">
                    <span class="title">Разгон 0-100</span>
                    <span class="value">{{ creditStore.carNew.modification.from_0_to_100
                    }} с</span>
                  </li>
                  <li class="car-show__params-item" v-if="creditStore.carNew.modification.max_speed">
                    <span class="title">Макс.скорость</span>
                    <span class="value">{{ creditStore.carNew.modification.max_speed }}
                      км/ч
                    </span>
                  </li>
                  <li class="car-show__params-item" v-if="creditStore.carNew.modification.drive">
                    <span class="title">Привод</span>
                    <span class="value">{{ creditStore.carNew.modification.drive }}
                      с</span>
                  </li>
                  <li class="car-show__params-item" v-if="creditStore.carNew.modification.transmission">
                    <span class="title">Коробка</span>
                    <span class="value">{{ creditStore.carNew.modification.transmission
                    }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="value-controls">
              <div class="select">Выбрать другое авто</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form__form-block" :class="{ 'disabled': !creditStore.carNew }">
      <FormPieceRangeSliderTime @timeListOutput="timeListOutput" />
    </div>

    <div class="form__form-block" :class="{ 'disabled': !creditStore.carNew }">
      <FormPieceRangeSliderPercent :carPrice="carPrice" @percentListOutput="percentListOutput"
        :minPercent="minPercent" />
    </div>

    <div class="form__form-block" :class="{ 'disabled': !creditStore.carNew }">
      <div class="form__credit-data">
        <div class="credit-data__item">
          <span>Платеж от</span>
          <span class="value"><span class="bold">{{ makeSpaces(monthlyPayment) }}₽</span>/мес.</span>
        </div>
        <div class="credit-data__item">
          <span>Ставка от</span>
          <span class="value bold">
            {{ appStore.selectedBank?.percent ? appStore.selectedBank.percent : appStore.creditPercent }}%
          </span><br>
        </div>
      </div>
    </div>

    <div class="form__form-block">
      <input type="text" name="fake-username" autocomplete="username" style="display: none;" />
      <input type="password" name="fake-password" autocomplete="new-password" style="display: none;" />
      <div class="base-input">
        <input 
          ref="nameInputRef"
          :id="nameFieldName"
          :name="nameFieldName"
          :class="{ 'is-invalid': nameError }" 
          type="text" 
          placeholder="Имя" 
          v-model="nameValue"
          autocomplete="off"
          v-maska="name" 
          class="form-input"
          @paste="handleNamePaste"
          @copy="handleNameCopy"
          @cut="handleNameCut"
          @keydown="handleNameKeyDown"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          data-lpignore="true"
          :data-paste-attempts="namePasteAttempts"
        />
        
  
      </div>

      <div class="base-input">
        <input 
          ref="phoneInputRef"
          :id="phoneFieldName"
          :name="phoneFieldName"
          :class="{ 'is-invalid': phoneError }" 
          type="tel" 
          placeholder="+7 (___) ___-__-__"
          autocomplete="off" 
          v-maska="options" 
          v-model="phoneValue" 
          class="form-input"
          @paste="handlePhonePaste"
          @copy="handlePhoneCopy"
          @cut="handlePhoneCut"
          @keydown="handlePhoneKeyDown"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          data-lpignore="true"
          :data-paste-attempts="phonePasteAttempts"
        />
        
        <span class="alert" v-show="phoneError">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
        
      </div>

      <input type="text" name="app" id="" class="app__input" v-model="valueApp">

      <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'"
        :disabled="!formChecked || Boolean(!(creditStore.carNew))" :loading="!appStore.formLoading"
        class="form__form-submit" />

      <FormPieceCheck @formChecked="returnEmit" :appType="2" :submitText="submitText" />
    </div>
  </form>
</template>

<style scoped lang="scss">
.form__form-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  gap: 15px;

  @media screen and (max-width: 540px) {
    gap: 10px;
  }

  .form__form-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;

    .car__choice {
      border: var(--border);
      height: 100%;
      width: 100%;
      border: var(--border);
      border-radius: var(--border-input-radius);
      transition: 0.3s;
      background: white;
      color: var(--main-black);
      cursor: pointer;
      display: flex;

      position: relative;
      overflow: hidden;

      .car__choice-wrapper {
        height: 100%;
        padding: 20px 15px;
        transition: 0.3s;

        .value {
          display: flex;
          gap: 10px;
          flex-direction: column;

          .value-controls {
            .select {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5px 8px;
              cursor: pointer;
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
              color: var(--bg-light);
              background: #333333;
              border-radius: var(--border-button-radius);
              border: var(--border);
              transition: all .3s ease;
              width: max-content;
            }
          }

          .value-block {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 20px;


            @media screen and (max-width: 1200px) {
              grid-template-columns: 1fr;
            }

            @media screen and (max-width: 1024px) {
              grid-template-columns: 2fr 3fr;
            }

            @media screen and (max-width: 640px) {
              grid-template-columns: 1fr;
            }

            .image {
              min-width: 250px;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain
              }
            }

            .price {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: center;

              .value-name {
                font-weight: 500;
                font-size: 18px;
                line-height: 22px;
              }

              .old {
                font-weight: 500;
                font-size: 18px;
                line-height: 22px;
                color: #A8A8A8;
              }

              .current {
                font-weight: 700;
                font-size: 26px;
                line-height: 30px;
                background-image: var(--linear-button);
                color: transparent;
                background-clip: text;
              }

              .credit {
                font-size: 16px;
                line-height: 20px;

                & span {
                  font-weight: 500;
                  color: var(--main-color);
                }
              }

              .car-show__params-list {
                display: grid;
                gap: 7px;
                width: 100%;
                margin-top: 10px;

                .car-show__params-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  .value {
                    font-weight: 500;
                    order: 2;
                  }

                  .title {
                    font-weight: 500;
                  }

                  &::after {
                    content: "";
                    display: block;
                    flex-grow: 1;
                    height: 1px;
                    background-color: #e6e8ec;
                    margin: 0 8px;
                    position: relative;
                    top: 5px
                  }
                }
              }
            }
          }
        }
      }

      // .car__choice-wrapper.car {
      //   padding: 15px 20px;
      //   width: 100%;

      //   @media screen and (max-width: 540px) {
      //     padding: 15px 10px;
      //   }
      // }

      .title.car {
        position: absolute;
        top: 7px;
        background: transparent;
        font-size: var(--small-size);
        font-weight: bold;
        display: none;
      }
    }

    .form__brands-choice {
      display: inline-flex;
      gap: 5px;
      border: 2px solid var(--main-color);
      border-radius: 20px;
    }

    .form__credit-data {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      gap: 15px;

      @media screen and (max-width: 540px) {
        align-items: center;
        gap: 5px;
      }

      @media screen and (max-width: 360px) {
        flex-direction: column;
      }

      .credit-data__item {
        text-align: start;
        font-weight: bold;

        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        &::after {
          content: "";
          display: block;
          flex-grow: 1;
          height: 1px;
          background-color: #e6e8ec;
          margin: 0 8px;
          position: relative;
          top: 5px;
        }

        .value {
          order: 1;
        }

        .bold {
          font-size: var(--big-size);
          font-weight: bold;
          color: var(--main-color);
        }
      }
    }

    .form__form-submit {
      padding: 15px;
      background: var(--linear-button);
      color: var(--bg-light);
      font-weight: bold;
      transition: 0.3s;
    }

    .form__form-notice {
      text-align: start;
      display: flex;
      align-items: center;
      gap: 5px;

      span {
        font-size: 30px;
        line-height: normal;
        color: var(--main-color);
        font-weight: bold;
      }
    }

    .form__form-select {
      position: relative;
      cursor: pointer;

      select {
        border: var(--border);
        min-width: 210px;
        width: 100%;
        padding: 10px 15px;
        color: #f7f7f7;
        border-radius: 20px;
        background: white;
      }

      &:after {
        content: "\f107";
        position: absolute;
        right: 10px;
        top: 25px;
        font-family: "Font Awesome 6 Free";
        font-weight: 900;
        pointer-events: none;
        background: var(--light-grey);
        padding: 3px 4px;
        border-radius: 100%;
        text-align: center;
        color: var(--main-black);
        transition: 0.3s;
      }

    }

    .form__form-select.auto {
      background: white;
      min-width: 210px;
      width: 100%;
      color: #767676;
      border-radius: 20px;
      text-align: start;
      overflow: hidden;
      padding: 15px;
      border: var(--border);

      .auto__title {
        padding: 10px 15px;
      }

      .auto__select {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 400px;
        overflow: auto;

        @media screen and (max-width: 540px) {
          gap: 20px;
        }

        .auto__select-item {
          display: grid;
          grid-template-columns: 2fr 4fr;
          height: auto;
          align-items: center;
          cursor: pointer;

          .auto__select-item-text {
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            color: var(--main-black);
            font-size: var(--standart-size);

            @media screen and (max-width: 540px) {
              gap: 5px;
            }

            .auto__select-item-title {
              font-weight: bold;
            }

            .auto__select-item-info {
              display: flex;
              justify-content: space-between;
              background: var(--main-color);
              padding: 5px 10px;
              color: white;
              border-radius: 20px;

              @media screen and (max-width: 540px) {
                font-size: 12px;
              }
            }

            .auto__select-item-price {
              display: flex;
              justify-content: space-between;
              align-items: center;

              @media screen and (max-width: 540px) {
                flex-direction: column;
              }

              .price__current {
                font-size: 16px;
                font-weight: bold;
              }

              .price__old {
                text-decoration: line-through;
              }
            }
          }

          .auto__select-item-image {
            width: 100%;
            height: 100%;

            img {
              object-fit: contain;
              width: 100%;
              height: 100%;
            }

          }
        }
      }

    }

    .form__form-select.active {
      &:after {
        transform: rotate(180deg);
        transition: 0.3s;
      }
    }

    .form__form-select.auto.disabled,
    .form__form-select.disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    .form__form-title {
      font-weight: bold;
      text-align: start;
      padding-bottom: 10px;
    }
  }

}

.form__form-alert {
  padding: 15px;
  background: transparent;
  border-radius: 20px;
  color: var(--main-color);
  font-weight: bold;
  border: 3px solid var(--main-color);
}

.form__form-block.disabled div {
  pointer-events: none;
  opacity: 0.4;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: white;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background: rgba(95, 95, 95, 0.582);
  border-radius: 20px;
}

.base-input {
      height: 50px;
      position: relative;
      
      .paste-indicator {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        // color: #ff4444;
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        
        &.show {
          opacity: 1;
        }
        
        .indicator-text {
          white-space: nowrap;
        }
      }
      
      .alert {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        // color: #ff4444;
        font-size: 14px;
      }
      
      .form-input {
        &.paste-blocked {
          animation: shake 0.5s;
        //   border-color: #ff4444;
        }
        
        &.shortcut-blocked {
        //   border-color: #ffa726;
        animation: pulse 0.3s ease;
        }
        
        // &.is-invalid {
        // //   border-color: #ff4444 !important;
        //   background-color: rgba(255, 68, 68, 0.05) !important;
          
        //   &:focus {
        //     box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.2) !important;
        //   }
        // }
      }
      
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
</style>