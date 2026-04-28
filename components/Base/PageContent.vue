<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
</script>

<template>
    <section class="page-content">
        <div class="container">
            <div class="page-content__wrapper">
                <div
                    v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>