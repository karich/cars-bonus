<script setup>
const timeList = ref(7);
const timeListOutputData = ref('7 лет');

const emits = defineEmits(['timeListOutput', 'update:modelValue']);
const max = ref(7);

emits('timeListOutput', timeList.value)

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  disabled: {
    type: Boolean,
  },
  class: {
    type: String,
  }
});

const handleTimeListOutput = (value) => {
  emits('update:modelValue', Number(timeList.value));
};

watch(timeList, (newTimeList, oldTimeList) => {
  if (newTimeList === '0' || newTimeList === '0') {
    timeListOutputData.value = '6 мес.';
  } else if (newTimeList === '1') {
    timeListOutputData.value = '1 год';
  } else if (newTimeList === '2') {
    timeListOutputData.value = '2 года';
  } else if (newTimeList === '3') {
    timeListOutputData.value = '3 года';
  } else if (newTimeList === '4') {
    timeListOutputData.value = '4 года';
  } else if (newTimeList === '5') {
    timeListOutputData.value = '5 лет';
  } else if (newTimeList === '6') {
    timeListOutputData.value = '6 лет';
  } else if (newTimeList === '7') {
    timeListOutputData.value = '7 лет';
  }
})

watch(timeList, (newTimeList, oldTimeList) => {
  emits('timeListOutput', Number(timeList.value))
})

</script>

<template>
  <div class="time-block" :class="class">
    <label class="timeOut" for="credit-page--time">
      Срок кредитования <span class="output-time">
        {{ timeListOutputData }}
      </span>
    </label>

    <div class="range-slider">
      <!-- <div class="range-slider__value">
        <div class="value__left">6 мес.</div>
        <div class="value__right">7 лет</div>
      </div> -->

      <input class="range-slider__input range-input" type="range" min="0" max="7" id="range" list="timelist" step="1"
        v-model="timeList" @change="handleTimeListOutput" :disabled="props.disabled"
        :style="{ background: `linear-gradient(to right, #8D0C07  ${timeList / max * 100}%, #EEEEEE ${timeList / max * 100}%)` }" />
      <ul class="datalist" id="timelist" :class="{ 'disabled': props.disabled }">
        <li value="0" label="6 мес.">6 мес.</li>
        <li value="1" label="1 год">1 год</li>
        <li value="2" label="2 года">2 года</li>
        <li value="3" label="3 года">3 года</li>
        <li value="4" label="4 года">4 года</li>
        <li value="5" label="5 лет">5 лет</li>
        <li value="6" label="6 лет">6 лет</li>
        <li value="7" label="7 лет">7 лет</li>
      </ul>
      <div class="range-slider__progress">
      </div>
    </div>
  </div>


</template>

<style scoped lang="scss">
.small {
  datalist {
    & li {
      color: var(--bg-light);
    }
  }
}

.timeOut {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  width: 100%;

  @media screen and (max-width: 359px) {
    font-size: 12px;
  }

  .output-time {
    font-weight: 600;

    @media screen and (max-width: 359px) {
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>