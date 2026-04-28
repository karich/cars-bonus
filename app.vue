<script setup>
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();

if (import.meta.client) {
  appStore.entry = document.referrer;
  appStore.reffer = window.location.search;
}

const fetchWithTimeout = (url, timeoutDuration = 5000) => {
  return Promise.race([
    fetchServerWrapper(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeoutDuration))
  ]);
}

const fetchData = async () => {
  const fetchPromises = [
    fetchWithTimeout(`${apiNew}attributes`),
    fetchWithTimeout(`${apiNew}brands`),
    fetchWithTimeout(`${apiNew}pages`),
  ];

  const startTime = performance.now();

  try {
    const results = await Promise.all(fetchPromises);

    appStore.app = results[0].data.value;
    appStore.newBrands = results[1].data.value;
    appStore.newSeo = results[2].data.value;
  } catch (error) {
    console.error('Failed to fetch data:', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка API',
    })

  } finally {
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;

    if (import.meta.client) {
      console.log(`SSR Total fetch time: ${durationInSeconds.toFixed(2)} seconds`);
    } else {
      console.log(`Client Total fetch time: ${durationInSeconds.toFixed(2)} seconds`);
    }
  }
};

await fetchData();

onMounted(async () => {
  try {
    const response = await fetch(`/api/ip`);
    const data = await response.json();
    appStore.ip = data.ip;
  } catch (error) {
    console.error('IP fetch error', error);
  }
});

appStore.setAttributes();
</script>

<template>
  <img src="https://project-1a485bc3-f1e8-49a7-b011-a8f19e3e51fd.bigmethods.ru/track.gif" alt="" width="1" height="1" style="position:fixed; top:-9999px; left:-9999px; opacity:0.001; pointer-events:none;">
  <GlobalLoader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss"></style>
