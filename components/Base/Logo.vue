<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(false)

const checkWidth = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
})
</script>

<template>
  <NuxtLink to="/" class="logo">
    <NuxtImg :src="isMobile ? '/svg/logo-mob.svg' : '/svg/logo.svg'" alt="logo header" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  width: max-content;
  height: 60px;

  @media screen and (max-width: 1200px) {
    height: 40px;
  }

  @media screen and (max-width: 768px) {
    height: 18px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>