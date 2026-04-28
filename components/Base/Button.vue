<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'submit',
  },
  class: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  mobileIcon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <button class="base-button" :type="type" :class="class" :disabled="disabled" :title="label">
    <span :class="{ 'hidden': mobileIcon }">{{ label }}</span>
    <i :class="icon" v-if="icon" />
    <i :class="mobileIcon" class="mobile" v-if="mobileIcon" />
  </button>
</template>


<style lang="scss" scoped>
.base-button {
  color: var(--bg-light);
  background: var(--linear-button);
  border-radius: var(--border-button-radius);
  border: none;
  font-weight: 500;
  transition: all .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  width: 100%;
  height: auto;

  span {
    position: relative;
    background: transparent;
    font-weight: 500;
    transition: all .3s ease;
  }
}

.callback {
  display: flex;
  flex-direction: row-reverse;
  border-radius: 40px;
  padding: 10px 25px;
  gap: 20px;
  transition: 0.3s;

  i {
    background: white;
    color: var(--main-color);
    padding: 15px;
    border-radius: 100%;
    transition: 0.3s;
  }
}

.callback-fixed {
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 45px;
    transform: skewX(-45deg);
    left: -150%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
    animation: blick 3s infinite linear;
  }

  @keyframes blick {
    0% {
      left: -150%;
    }

    100% {
      left: 150%;
    }
  }
}

.slider__form {
  .base-submit {
    background: var(--main-color);
    border-radius: 50px;
  }
}

.test-drive {
  background: var(--main-color2);
  border: 1px solid var(--main-color2);
}

.call {
  background: var(--main-color);
  border: 1px solid var(--main-color);
}

.bh-1 {
  background: var(--main-color);
  border: 1px solid var(--main-color);
}

.base-button.load {
  width: auto;
}

.header {
  padding: 0;

  @media screen and (max-width: 900px) {
    position: relative;
    width: 44px;
    height: 44px;
    background: transparent;
    margin-left: auto;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 44px;
      height: 44px;
      background: url(/svg/header-phone.svg) no-repeat center;
      background-size: contain;
      transition: all 0.3s ease;
    }
  }

  @media screen and (max-width: 768px) {
    margin-right: 50px;
  }

  & span {
    position: relative;
    font-weight: 500;
    padding: 14px 10px;
    padding-right: 45px;

    @media screen and (max-width: 900px) {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%) rotate(135deg);
      right: 10px;
      width: 29px;
      height: 29px;
      background: url(/svg/phone-btn.svg) no-repeat center;
      background-size: contain;
      transition: all 0.3s ease;
    }
  }
}

.comp {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 70px;
  opacity: 0;
  background: transparent;
  border: none;

  & span {
    font-size: 18px;
    line-height: 20px;
  }
}

.comp-credit {
  background: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}

.bordered {
  border: 1px solid var(--main-color);
  background: transparent;
  color: var(--main-color);
  border-radius: 20px;
}

.classic {
  background: var(--main-color);
  border: 1px solid var(--main-color);
  color: white;
}

.credit-mod {
  background: var(--linear-button);
  width: 100%;
  padding: 10px;

  // &:hover {
  //   background: white;
  //   color: var(--main-color);
  // }
}

.certificate {
  padding: 0;
  background: transparent;
  color: var(--secondary-color);
  text-align: start;
  width: fit-content;
  border: none;
  gap: 5px;
  flex-direction: row-reverse;
  padding: 0;

  span {
    font-size: var(--standart-size);
    font-weight: 400;
  }


  i {
    font-size: 11px;
    color: white;
    background: var(--secondary-color);
    padding: 4px;
    border-radius: 100%;
    width: 18px;
    height: 18px;
  }

  &:hover {
    opacity: 0.85;
  }
}

.fit {
  width: fit-content;
}

.sp-1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
}

.credit {
  height: 50px;
}

.trade {
  background: #333333;
  border-color: #333333;
  gap: 10px;
  padding: 14px 8px;

  // &:hover {
  //   color: var(--blue);
  //   background: transparent;
  // }
}

.taxi {
  color: var(--main-black);
  background: var(--yellow);
  border-color: var(--yellow);
  max-width: 500px;

  &:hover {
    background: var(--bg-light);
  }
}

.callback__form {
  gap: 50px;
  max-width: 240px;
}

.main__banner-link {
  gap: 30px;
  max-width: 240px;

  @media screen and (max-width: 540px) {
    background: var(--blue);
    border: 1px solid var(--blue);
  }

  @media screen and (max-width: 375px) {
    position: absolute;
    bottom: 30px;
  }

  // &:hover {
  //   color: var(--main-color);
  //   background: var(--bg-light);

  //   @media screen and (max-width: 540px) {
  //     color: var(--bg-light);
  //     background: var(--main-color);
  //     border: 1px solid var(--main-color);
  //   }
  // }
}

.main__slider-btn,
.china__banner-btn {
  border: 6px solid var(--bg-light);
  max-width: 210px;
  padding: 15px;

  @media screen and (max-width: 540px) {
    margin-top: auto;
    margin-bottom: 20px;
  }
}

.china__banner-btn {
  @media screen and (max-width: 540px) {
    margin-bottom: 0;
  }
}
</style>
