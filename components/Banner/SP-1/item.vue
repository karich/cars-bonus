<script setup>
const props = defineProps(['item'])
</script>

<template>
  <div class="sp1__item">
    <div class="sp1__item-img">
      <NuxtImg format="webp" quality="90" :src="item.image" :alt="item.title" />
    </div>
    <div class="sp1__item-block">
      <p class="sp1__item-subtitle">{{ item.subtitle }}</p>
      <p class="sp1__item-title">{{ item.title }}
      </p>
      <NuxtLink :to="item.link" class="sp1__item-link" v-if="item.link"></NuxtLink>
      <BaseButtonModal :btn-label="``" :modal-title="item.title" :btnClass="`sp-1`"
        :modal-description="item?.description" v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sp1__item {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  min-width: 275px;
  width: 100%;
  height: 420px;
  transition: all .3s ease;

  &:hover {
    box-shadow: var(--box-shadow);
    transition: all .3s ease;
  }

  .sp1__item-img {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .sp1__item-block {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    color: var(--bg-light);
    width: 100%;
    padding: 15px 9px;
    background: var(--linear-button2);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    border-radius: 18px;

    .sp1__item-subtitle {
      font-weight: 700;
      font-size: 20px;
      line-height: 22px;
      text-transform: uppercase;
      text-align: right;
      background: transparent;
    }

    .sp1__item-title {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      background: transparent;
    }

    .sp1__item-link {
      position: absolute;
      top: 0;
      left: 0;
      color: var(--bg-light);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>