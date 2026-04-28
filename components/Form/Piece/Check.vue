<script setup>
const checkedP = ref(true);
const checkedN = ref(true);

const emit = defineEmits(['formChecked']);

const props = defineProps({
  appType: {
    type: Number,
  },
  submitText: {
    type: String,
    default: 'Отправить заявку',
  },
});

function handleFormCheck() {
  emit('formChecked', (checkedP.value && checkedN.value));
}
</script>

<template>
  <!-- <div class="form__check">
        <label class="form__check-label politics" :class="$attrs.class">
            <input class="radio__hidden" type="checkbox" v-model="checkedP"
                @click="checkedP = !checkedP, handleFormCheck()">
            <span class="radio__img" :class="checkedP ? 'checked' : ''"></span>
            <p>Согласен на <NuxtLink to="/politics/" target="_blank" class="check-link">
                    обработку персональных данных</NuxtLink>
            </p>
        </label>

        <label class="form__check-label nation" :class="$attrs.class"
            v-if="appType == 7 || appType == 8 || appType == 2">
            <input class="radio__hidden" type="checkbox" v-model="checkedN"
                @click="checkedN = !checkedN, handleFormCheck()">
            <span class="radio__img" :class="checkedN ? 'checked' : ''"></span>
            <p>Подтверждаю наличие гражданства РФ</p>
        </label>
    </div> -->

  <p class="polititcs__info">
    Нажимая кнопку “{{ props.submitText }}” вы соглашаетесь на <NuxtLink to="/politics">обработку персональных данных
    </NuxtLink>
  </p>

</template>

<style scoped lang="scss">
.form__check {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: fit-content;
  min-width: 200px;
  gap: 8px;

  .form__check-label {
    display: flex;
    align-items: center;
    font-size: 12px;

    & p {
      display: flex;
      flex-wrap: wrap;
      gap: 0 5px;
    }

    .check-link {
      text-decoration: underline;
    }

    .radio__img {
      position: relative;
      min-width: 20px;
      height: 20px;
      border: 1px solid var(--main-color);
      border-radius: 20px;
      margin-right: 10px;
      cursor: pointer;
    }

    .checked {
      &::before {
        content: "\f00c";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: "Font Awesome 6 Free";
        font-weight: 900;
        font-size: 10px;
        color: var(--main-color);
      }
    }
  }
}

.online__trade-form {
  .check-black p {
    color: black;
  }
}

.radio__hidden:not(:checked)+.radio__img::before {
  background: none;
}

label.form__check-label.white p {
  color: white;
}

.wide {
  grid-column-start: 1;
  grid-column-end: 3;
}

.small {
  p {
    font-size: 10px;

    a {
      font-size: 10px !important;
    }
  }
}

.wide-grid {
  grid-column-start: 1;
  grid-column-end: 3;
}


.polititcs__info {
  a {
    display: inline;
    color: var(--blue);
    text-decoration: underline;
  }
}
</style>