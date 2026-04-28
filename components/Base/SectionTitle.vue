<script setup>
const props = defineProps(['title'])
</script>


<template>
  <h2 class="title">{{ title }}</h2>
</template>


<style lang="scss" scoped>
.title {
  position: relative;
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  border-bottom: 2px solid var(--main-color);
  margin-bottom: 30px;
  padding-bottom: 10px;
  width: max-content;

  @media screen and (max-width: 540px) {
    font-size: 16px;
    line-height: 22px;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 375px) {
    text-align: center;
    width: 100%;
  }
}

.cars__head .title,
.filter__header .title {
  margin: 0;
}
</style>