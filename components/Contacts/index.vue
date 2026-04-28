<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
  <section class="section section__contact">
    <div class="container">
      <BasePageTitle />
      <div class="section__body">
        <div class="contacts__list">
          <p class="contacts__item">
            {{ appStore.address }}
          </p>
          <p class="contacts__item">
            {{ appStore.workingHours }}
          </p>
          <a class="contacts__item" :href="`tel:+${appStore.clearPhone}`">
            {{ appStore.phone }}
          </a>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
.contacts__list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 38px;
  margin-bottom: 30px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }

  .contacts__item {
    position: relative;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    padding-top: 60px;

    @media screen and (max-width: 767px) {
      padding: 0;
      padding-left: 60px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;

      @media screen and (max-width: 767px) {
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .contacts__item:nth-child(1) {
    &::before {
      background: url(/svg/contact1.svg) no-repeat center;
      background-size: contain;
    }
  }

  .contacts__item:nth-child(2) {
    &::before {
      background: url(/svg/contact2.svg) no-repeat center;
      background-size: contain;
    }
  }

  .contacts__item:nth-child(3) {
    &::before {
      background: url(/svg/contact3.svg) no-repeat center;
      background-size: contain;
    }
  }
}
</style>