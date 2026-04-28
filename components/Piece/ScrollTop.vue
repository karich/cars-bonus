<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isVisible = ref(false);

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  isVisible.value = window.scrollY < 300;
}

function checkInitialScroll() {
  isVisible.value = window.scrollY < 300;
}

onMounted(() => {
  checkInitialScroll();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div v-if="!isVisible" @click="toTop" class="go-to-top">
    <i class="fa-solid fa-chevron-up"></i>
  </div>
</template>

<style scoped lang="scss">
.go-to-top {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 68px;
  height: 68px;
  color: var(--bg-light);
  background: var(--linear-button);
  border: 2px solid var(--bg-light);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 99;

  @media screen and (max-width: 575px) {
    bottom: 8%;
    height: 44px;
    width: 44px;
  }

  & i {
    font-size: 25px;
    transition: all .3s ease;

    @media screen and (max-width: 575px) {
      font-size: 18px;
    }
  }

  &:hover {
    background: transparent;
    border: 2px solid var(--main-color);

    & i {
      color: var(--main-color);
    }
  }
}
</style>