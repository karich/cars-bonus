<script setup>
const props = defineProps({
  carPrice: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 80,
  },
  step: {
    type: Number,
    default: 0,
  },
  class: {
    type: String,
    default: '',
  }
})

const emits = defineEmits(['percentListOutput', 'feeOutput']);

const range = computed(() => {
  const list = [];
  for (let i = props.min; i <= props.max; i += props.step) {
    list.push(i);
  }
  return list;
})

const percentList = ref(10);

const firstFee = computed(() => {
  return (props.carPrice * percentList.value) / 100
})


watch(percentList, (newPercentList, oldPercentList) => {
  emits('percentListOutput', percentList.value)
})
emits('percentListOutput', percentList.value)

watch(firstFee, (newFirstFee, oldFirstFee) => {
  emits('feeOutput', newFirstFee)
})

onMounted(() => {
  emits('feeOutput', firstFee.value);
});
</script>



<template>
  <div class="percent-block" :class="class">
    <label class="credit__first" for=" credit-page--first">
      <p class="first__row">
        <span class="title">
          Первоначальный взнос
        </span>
        <span class="output-first">
          {{ makeSpaces(firstFee) }} руб. ({{ percentList
          }}%)
        </span>
      </p>
    </label>
    <div class="range-slider">
      <!-- <div class="range-slider__value">
        <div class="value__left">{{ min }} %</div>
        <div class="value__right">{{ max }} %</div>
      </div> -->

      <input class="range-slider__input timelist range-slider__progress range-input" type="range" :min="min" :max="max"
        list="timelist" :step="step" v-model="percentList" @change="percentListOutput" :disabled="disabled"
        :style="{ background: `linear-gradient(to right, #8D0C07  ${percentList / max * 100}%, #EEEEEE ${percentList / max * 100}%)` }" />

      <ul id="timelist" class="datalist" :class="{ 'disabled': disabled }">
        <li v-for="i in range" :key="i" :value="i" label="">
          {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.first__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  width: 100%;

  .title {
    @media screen and (max-width: 359px) {
      font-size: 12px;
    }
  }

  .output-first {
    font-weight: 600;

    @media screen and (max-width: 359px) {
      font-weight: 500;
    }
  }
}

.small {
  datalist {
    & li {
      color: var(--bg-light);
    }
  }
}

.hiddenOutput {
  .first__row {
    display: none;
  }
}
</style>