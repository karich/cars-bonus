<script setup>
import { options, name, numberMask } from "@/constants/";
import { vMaska } from "maska/vue";
import { useAppStore } from '/stores/AppStore.js'
import { useCreditStore } from "/stores/CreditStore.js";

import { ref, computed, watch, onMounted } from 'vue';

const appStore = useAppStore();
const creditStore = useCreditStore();

const emits = defineEmits(['showCar']);

const steps = ref(['Данные вашего авто', 'Данные нового авто', 'Оформление заявки'])
const activeStep = ref(0)

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
  formChecked.value = value
}
/* Form Check */

const phoneValue = ref('')
const phoneError = ref(false)
const phonePasteAttempts = ref(0);
const phoneInputRef = ref(null);

const brandValue = ref();
const modelValue = ref();
const yearValue = ref();

const nameValue = ref('')
const nameError = ref(false)
const namePasteAttempts = ref(0);
const nameInputRef = ref(null);

const valueApp = ref('')

watch(() => creditStore.category, (currentData) => {
  creditStore.carNew = null
})

const carStatus = computed(() => {
  return Boolean(creditStore.carNew)
})

// Генерация уникальных имен для полей
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
    brand: brandValue.value,
    model: modelValue.value,
    year: yearValue.value,
    app: valueApp.value
  }

  const appType = 8
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

function validateYear() {
  if (yearValue.value.length == 4) {
    if (yearValue.value < 1990) {
      yearValue.value = 1990
    } else if (yearValue.value > new Date().getFullYear()) {
      yearValue.value = new Date().getFullYear()
    }
  } else if (yearValue.value == '') {
    yearValue.value = null
  } else {
    yearValue.value = 2020
  }
}

const tradeForm = ref(null);

function scrollToMenu() {
  const el = tradeForm.value;
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

const banks = appStore.banks;
</script>

<template>
  <section class="page trade__section section">
    <div class="container">
      <BasePageTitle />
      <div class="page__content">
        <div class="page__form">
          <div class="form__form trade__section-form" ref="tradeForm">
            <!-- <div class="form__steps">
              <ul class="form__steps-list">
                <li class="form__steps-item"
                  :class="{ 'form__steps-item--active': activeStep === 0 || activeStep === 1 || activeStep === 2 }">
                  <div class="form__steps-item__number">1</div>
                  <div class="form__steps-item__text">Данные вашего авто</div>
                </li>
                <li class="form__steps-item"
                  :class="{ 'form__steps-item--active': activeStep === 1 || activeStep === 2 }">
                  <div class="form__steps-item__number">2</div>
                  <div class="form__steps-item__text">Данные нового авто</div>
                </li>
                <li class="form__steps-item" :class="{ 'form__steps-item--active': activeStep === 2 }">
                  <div class="form__steps-item__number">3</div>
                  <div class="form__steps-item__text">Оформление заявки</div>
                </li>

              </ul>
              <div class="form__steps-progress">
                <div class="form__steps-progress--filled"
                  :style="{ width: (activeStep === 0 ? '20%' : `${(activeStep / (steps.length - 1)) * 115}%`) }">
                </div>
              </div>
            </div> -->
            <div class="form__content">
              <div class="form__content-item" v-show="activeStep === 0">
                <div class="form__steps-item">
                  <p class="form__steps-item__number">1</p>
                  <p class="form__steps-item__text">Данные вашего авто</p>
                </div>
                <div class="form__form-block">
                  <div class="base-input">
                    <input type="text" name="brand" placeholder="Марка" v-model="brandValue" autocomplete="on"
                      class="form-input">
                  </div>

                  <div class="base-input">
                    <input type="text" name="model" placeholder="Модель" v-model="modelValue" autocomplete="on"
                      class="form-input">
                  </div>

                  <div class="base-input">
                    <input type="text" name="year" placeholder="Год" v-model="yearValue" autocomplete="on"
                      class="form-input" v-maska="numberMask" @change="validateYear">
                  </div>
                </div>

                <div class="item__controls">
                  <button class="btn" @click="activeStep = 1; scrollToMenu()">
                    Следующий шаг
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div class="form__content-item" v-show="activeStep === 1">
                <div class="form__steps-item">
                  <p class="form__steps-item__number">2</p>
                  <p class="form__steps-item__text">Данные нового авто</p>
                </div>
                <div class="form__form-block">
                  <div class="car__choice">
                    <div class="car-show" v-if="creditStore.carNew && creditStore.category == 'new'">
                      <div class="car-show__wrapper">
                        <div class="car-show__image">
                          <NuxtImg lazy format="webp" quality="90" loading="lazy"
                            :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : ''}`" />
                        </div>
                        <div class="car-show__content">
                          <div class="car-show__title">
                            {{ cleanUpTitle(creditStore.carNew.brand,
                              creditStore.carNew.model,
                              creditStore.carNew.modification.modification,
                              creditStore.carNew.complectation.complectation) }}
                          </div>
                          <div class="car-show__price">
                            <div class="block">
                              <del class="old">
                                от {{ makeSpaces(creditStore.carNew.price) }} ₽
                              </del>
                              <p class="current">
                                от
                                {{ makeSpaces(creditStore.carNew.price -
                                  creditStore.carNew?.sale)
                                }}
                                ₽
                              </p>
                            </div>
                            <p class="credit">
                              от
                              <span>{{
                                makeSpaces(appStore.calcMonthPriceModel(creditStore.carNew?.sale,
                                  creditStore.carNew.price)) }}
                                ₽</span>/мес.
                            </p>
                          </div>
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

                      <div class="car-show__select" @click="creditStore.modalShow()">
                        Выбрать другое авто
                      </div>
                    </div>

                    <div class="car-select" v-else>
                      <div class="car-select__wrapper" @click="creditStore.modalShow()">
                        <div class="car-select__image">
                          <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/empty__car.webp"
                            alt="no image" />
                        </div>
                        <div class="car-select__title">
                          {{ creditStore.category == 'new' ? 'Выберите новое авто' :
                            'Выберите авто с пробегом' }}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="item__controls">
                  <button class="btn" @click="activeStep = 2; scrollToMenu()" :disabled="!carStatus">Следующий шаг <i
                      class="fa-solid fa-chevron-right"></i></button>

                  <button class="btn btn__back" @click="activeStep = 0; scrollToMenu()">
                    <i class="fa-solid fa-chevron-left"></i>
                    Назад
                  </button>
                </div>
              </div>
              <div class="form__content-item" v-show="activeStep === 2">
                <div class="form__steps-item">
                  <p class="form__steps-item__number">3</p>
                  <p class="form__steps-item__text">Оформление заявки</p>
                </div>
                <form class="form__form-block" @submit.prevent="validateForm" autocomplete="on">
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
                      name="name" 
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

                    <span class="alert" v-show="phoneError"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  </div>

                  <input type="text" name="app" id="" class="app__input" v-model="valueApp">

                  <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'" :disabled="!formChecked"
                    :loading="!appStore.formLoading" class="form__form-submit" />

                  <FormPieceCheck @formChecked="returnEmit" :appType="2" />
                </form>

                <div class="item__controls">
                  <button class="btn btn__back" @click="activeStep = 1; scrollToMenu()">
                    <i class="fa-solid fa-chevron-left"></i>
                    Назад
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page__text">
          <div class="page__text-content"
            v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null">
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-show="creditStore.isOpen">
        <ModalCarChoiceNew :selectedCategory="creditStore.category" @closeModal="creditStore.modalShow()"
          @choiceCar="choiceCar($event)" />
      </div>
    </Teleport>
  </section>

</template>

<style scoped lang="scss">
.trade__section {
  margin: 0;
  overflow: initial;

  .page__content {
    .page__form {
      .form__form {
        scroll-margin-top: 110px;

        @media screen and (max-width: 768px) {
          scroll-margin-top: 70px;
        }

        .form__steps {
          width: 100%;
          position: relative;
          margin-bottom: 50px;
          // padding: 0 20px;

          &-list {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
            padding: 0;
            list-style: none;
            gap: 15px;
            z-index: 2;
          }

          &-item {
            display: flex;
            align-items: center;
            gap: 10px;

            &--active {
              .form__steps-item__number {
                background: var(--main-color);
                transition: 0.3s;
              }

              .form__steps-item__text {
                color: var(--main-black);
                transition: 0.3s;
              }
            }
          }

          &-item__number {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background: var(--linear-button);
            border-radius: 50%;
            border: 3px solid var(--bg-light);
            font-weight: 900;
            font-size: 24px;
            line-height: 26px;
            color: var(--bg-light);
            transition: all .3s ease;
          }

          &-item__text {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
          }

          &-progress {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: #dbdbdb;
            transform: translateY(-50%);
            z-index: 0;
            border-radius: 20px;
            overflow: hidden;

            &--filled {
              background-image: linear-gradient(to right, var(--main-color), var(--main-color));
              background-size: 100% 100%;
              background-repeat: no-repeat;
              width: 10%;
              transition: width 0.3s ease-in-out;
              height: 100%;
            }
          }
        }

        .form__content {
          width: 100%;
          height: 100%;

          .form__content-item {
            animation: fadeIn 0.3s ease-in-out;
            min-height: 250px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 15px;

            .form__form-block {
              display: flex;
              flex-direction: column;
              gap: 10px;
              position: relative;

              .form__form-submit {
                padding: 15px;

                &:hover {
                  color: var(--main-color);
                  background: transparent;
                }
              }
            }


            .item__controls {
              width: 100%;
              display: flex;
              flex-direction: row-reverse;
              justify-content: space-between;

              .btn {
                padding: 15px 10px;
                background: var(--linear-button);
                color: var(--bg-light);
                border-radius: var(--border-medium-radius);
                display: flex;
                align-items: center;
                gap: 10px;
              }

              .btn__back {
                margin-right: auto;
                color: var(--main-black);
                background: #f3f3f3;
                border: var(--border);
              }
            }
          }
        }
      }
    }

    .page__text {
      width: 100%;
      margin-bottom: 30px;
    }
  }
}

.car__choice {
  .car-select {
    .car-select__wrapper {
      display: flex;
      flex-direction: column;
      gap: 15px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;

      .car-select__title {
        text-align: center;
        padding: 15px 20px;
        background: var(--blue);
        color: var(--bg-light);
        border-radius: var(--border-medium-radius);
      }

      .car-select__image {
        img {
          width: 100%;
          max-height: 200px;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }

  .car-show {
    .car-show__wrapper {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 10px 0;
      overflow: hidden;
      border-radius: 20px;
      border: var(--border);
      cursor: pointer;

      @media screen and (max-width: 540px) {
        grid-template-columns: 1fr;
      }

      .car-show__content {
        padding: 20px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;

        @media screen and (max-width: 768px) {
          padding: 0 10px 10px 10px;
        }

        .car-show__title {
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
        }

        .car-show__params-list {
          display: grid;
          list-style: none;
          padding: 0;
          grid-template-columns: 1fr;
          column-gap: 30px;
          row-gap: 0;

          @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .car-show__params-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;

            .value {
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

        .car-show__price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;

          .block {
            display: flex;
            flex-direction: column;
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
        }
      }

      .car-show__image {
        padding: 10px;
        min-width: 190px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          height: 100%;
          max-height: 150px;
          object-fit: contain;
        }
      }
    }

    .car-show__select {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      cursor: pointer;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: var(--bg-light);
      background: #333333;
      border-radius: var(--border-button-radius);
      border: var(--border);
      margin-top: 15px;
      transition: all 0.3s ease;
      width: max-content;
    }
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