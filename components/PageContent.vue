<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
</script>

<template>
    <!-- <div class="page__text-content" v-htmlSanitizer="appStore.creditText"></div> -->
    <div class="container page__text-content"
      v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null">
    </div>
</template>


<style lang="scss" scoped></style>