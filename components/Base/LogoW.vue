<script setup></script>

<template>
  <NuxtLink to="/" class="logo">
    <NuxtImg src="/svg/logo-w.svg" alt="logo footer" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  width: max-content;
  height: 60px;
  margin-bottom: 30px;

  @media screen and (max-width: 1200px) {
    height: 50px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>