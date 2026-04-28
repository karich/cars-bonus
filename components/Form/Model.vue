<script setup>
import { options, name } from "@/constants/";

import { vMaska } from "maska/vue"

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  model: {
    type: Object,
    default: {}
  },
  submitText: {
    type: String,
    default: 'Оставить заявку',
  },
  modification: {
    type: Object,
    default: {}
  },
  category: {
    type: String,
  }
});

const formChecked = ref(true);
const nameValue = ref('');
const phoneValue = ref('');

const nameError = ref(false)
const phoneError = ref(false)
const namePasteAttempts = ref(0);
const nameInputRef = ref(null);
const phonePasteAttempts = ref(0);
const phoneInputRef = ref(null);
const valueApp = ref('')

const phoneFieldName = ref(`phone-${Math.random().toString(36).substr(2, 9)}`)
const nameFieldName = ref(`name-${Math.random().toString(36).substr(2, 9)}`)

// Обработчики вставки для телефона
function handlePhonePaste(e) {
  e.preventDefault();
  phonePasteAttempts.value++;
  
  if (phoneInputRef.value) {
    phoneInputRef.value.classList.add('paste-blocked');
    setTimeout(() => {
      phoneInputRef.value?.classList.remove('paste-blocked');
    }, 500);
  }
  
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
    fee: `${(currentComplectation.value.price - modelSale.value) * fee.value / 100} руб перв. взнос`,
    timeListOutputData: `${timeListOutputData.value} срок кредитования (мес.)`,
    monthlyPayment: `${monthlyPayment.value} мес.платеж`,
    modification: `${props.modification.modification} ${currentComplectation.value.complectation}`,
    app: valueApp.value
  }

  const appType = 2
  const categoty = props.category
  const car = {
    brand: props.model.brand,
    model: props.model.model,
    price: currentComplectation.value.price - modelSale.value
  }

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

function returnEmit(value) {
  formChecked.value = value
}

watch(() => props.modification, () => {
  selectedComplectationId.value = props.modification.car_complectations[0].id;
}, { deep: true })

const modelSale = computed(() => props.model.sale);
const selectedComplectationId = ref(props.modification.car_complectations?.[0].id);
const currentComplectation = computed(() => props.modification.car_complectations?.find(item => item.id == selectedComplectationId.value));

const modList = computed(() => newStore.model.modifications?.filter((mod) => mod.car_complectations.length));

const fee = ref(0);
const timeListOutputData = ref(0);

let monthlyPayment = computed(() => {
  let i = (appStore.creditPercent / 12) / 100;
  let k = ((currentComplectation.value.price - modelSale.value) - (((currentComplectation.value.price - modelSale.value) * fee.value) / 100));
  let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
  let numb = (k * num);

  return Math.floor(numb)
})

function timeListOutput(value) {
  if (value == 0) {
    timeListOutputData.value = 0.5 * 12
  } else {
    timeListOutputData.value = value * 12
  }
}
</script>

<template>
  <div class="model-credit__form" v-if="modification?.car_complectations?.length">
    <div class="form__block">
      <div class="model-card__mod-choice" v-if="modList.length > 1">
        <span class="title">Выбранная модификация:</span>
        <label class="model-card__mod-select">
          <select v-model="newStore.modification">
            <option v-for="(option, index) in modList" :key="option.id" :value="option.id">
              {{ option.modification }}
            </option>
          </select>
        </label>
      </div>

      <div class="model-card__mod-choice">
        Выбранная комплектация:
        <label class="model-card__mod-select">
          <select v-model="selectedComplectationId">
            <option v-for="item in modification.car_complectations" :key="item.id" :value="item.id">
              {{ item.complectation }} {{ makeSpaces(item.price) }} ₽
            </option>
          </select>
        </label>
      </div>
      <!-- <div class="form__form-item">
        <span class="text">Стоимость авто (с учетом скидки):</span>
        <span class="money">{{ makeSpaces(currentComplectation.price - modelSale) }} ₽</span>
      </div>
      <div class="form__form-item">
        <span class="text">Ежемесячный платеж:</span>
        <span class="money">
          {{ makeSpaces(monthlyPayment) }} ₽/мес.
        </span>
      </div> -->
    </div>

    <Transition name="fade" mode="out-in">
      <div class="value__block" v-if="model && modification && currentComplectation" :key="currentComplectation.id">
        <div class="value__block-name">
          {{
            cleanUpTitle(
              model.brand,
              model.model,
              modification.modification,
              currentComplectation.complectation
            )
          }}
        </div>
        <div class="value__block-content">
          <div class="image" v-if="newStore.model.colored_galleries[0]?.url">
            <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="newStore.model.colored_galleries[0].url"
              alt="Фото авто" />
          </div>
          <div class="price">
            <del class="old" v-if="currentComplectation.price">
              от {{ makeSpaces(currentComplectation.price) }} ₽
            </del>
            <p class="current">
              от {{ makeSpaces(currentComplectation.price - modelSale) }} ₽
            </p>
            <p class="credit">
              от
              {{ makeSpaces(monthlyPayment) }} ₽/мес.
            </p>
            <ul class="car-show__params-list">
              <li class="car-show__params-item" v-if="modification.power">
                <span class="title">Мощность</span>
                <span class="value">{{ modification.power }} л.с.</span>
              </li>
              <li class="car-show__params-item" v-if="modification.from_0_to_100">
                <span class="title">Разгон 0–100</span>
                <span class="value">{{ modification.from_0_to_100 }} с</span>
              </li>
              <li class="car-show__params-item" v-if="modification.max_speed">
                <span class="title">Макс. скорость</span>
                <span class="value">{{ modification.max_speed }} км/ч</span>
              </li>
              <li class="car-show__params-item" v-if="modification.drive">
                <span class="title">Привод</span>
                <span class="value">{{ modification.drive }}</span>
              </li>
              <li class="car-show__params-item" v-if="modification.transmission">
                <span class="title">Коробка</span>
                <span class="value">{{ modification.transmission }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>

    <div class="form__block range">
      <BaseRangePercent :min="0" :max="80" :step="5" :carPrice="currentComplectation.price - modelSale" :class="`small`"
        @percentListOutput="fee = $event" />
      <BaseRangeTime :class="`small`" @timeListOutput="timeListOutput" />
    </div>

    <div class="form__block">
      <form class="form__form-content" @submit.prevent="validateForm">

        <!-- Скрытые поля для обхода автозаполнения -->
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
          
          <!-- Индикатор блокировки вставки для имени -->
          <div v-if="namePasteAttempts > 0" class="paste-indicator" :class="{ 'show': namePasteAttempts >= 2 }">
            <i class="fa-solid fa-ban"></i>
            <span class="indicator-text" v-if="namePasteAttempts >= 3">Вставка отключена</span>
          </div>
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
          
          <!-- Индикатор блокировки вставки для телефона -->
          <div v-if="phonePasteAttempts > 0" class="paste-indicator" :class="{ 'show': phonePasteAttempts >= 2 }">
            <i class="fa-solid fa-ban"></i>
            <span class="indicator-text" v-if="phonePasteAttempts >= 3">Вставка отключена</span>
          </div>
        </div>

        <input type="text" name="app" id="" class="app__input" v-model="valueApp">

        <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'" :disabled="!formChecked"
          :loading="!appStore.formLoading" />

        <FormPieceCheck @formChecked="returnEmit" :submitText="submitText" />
      </form>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.model-credit__form {
  display: grid;
  gap: 20px;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .value__block {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    gap: 20px;
    width: 48%;
    background: transparent;

    @media screen and (max-width: 767px) {
      position: initial;
      width: 100%;
    }

    .value__block-name {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
    }

    .value__block-content {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 20px;

      @media screen and (max-width: 1023px) {
        grid-template-columns: 1fr;
      }

      @media screen and (max-width: 767px) {
        grid-template-columns: 2fr 3fr;
      }

      @media screen and (max-width: 540px) {
        grid-template-columns: 1fr;
      }

      .image {
        min-width: 250px;
        margin: 0 auto;

        & img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 3px;

        .old {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: #A8A8A8;
        }

        .current {
          font-weight: 700;
          font-size: 30px;
          line-height: 40px;
          background-image: var(--linear-button);
          color: transparent;
          background-clip: text;
        }

        .credit {
          font-size: 16px;
          line-height: 22px;
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
              font-size: 16px;
              line-height: 18px;
              order: 2;
            }

            .title {
              font-weight: 500;
              font-size: 16px;
              line-height: 18px;
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

  .form__block {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 280px;
  }

  .form__form-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form__form-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 5px;

    @media screen and (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media screen and (max-width: 640px) {
      flex-direction: row;
      align-items: flex-end;
      margin-top: 5px;
    }

    @media screen and (max-width: 359px) {
      align-items: center;
    }

    .text {
      @media screen and (max-width: 359px) {
        font-size: 12px;
      }
    }

    .money {
      font-weight: 600;
      min-width: max-content;
      margin-left: auto;
    }
  }
}

.model-card__mod-choice {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .model-card__mod-select {
    flex-grow: 1;
    position: relative;

    .filter__body-select-reset {
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      border-radius: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-self: center;
      color: var(--main-black);

      i {
        height: 100%;
      }
    }

    .filter__body-select-reset[disabled] {
      display: none;
    }

    &:after {
      content: "\f107";
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-family: "Font Awesome 6 Free";
      font-weight: 900;
      pointer-events: none;
      color: var(--main-black);
      width: 26px;
      height: 26px;
      border-radius: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media screen and (max-width: 500px) {
      grid-column-start: 1;
    }

    select {
      width: 100%;
      padding: 15px;

      option {
        padding: 5px;
      }
    }

    select.active {
      font-weight: bold;
    }
  }

  .model-card__mod-subtitle {
    margin-bottom: 10px;
  }
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
        
        &.is-invalid {
        //   border-color: #ff4444 !important;
          background-color: rgba(255, 68, 68, 0.05) !important;
          
          &:focus {
            box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.2) !important;
          }
        }
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