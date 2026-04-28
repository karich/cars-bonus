<script setup>
const currentSlide = ref(0)
const props = defineProps({
  images: Array,
  imagesType: Boolean,
  preview: String
});
const breakpoints = {
  0: {
    itemsToShow: 1,
  },
  375: {
    itemsToShow: 1.05,
  },
  1024: {
    itemsToShow: 1,
  },
}

const breakpoints2 = {
  0: {
    itemsToShow: 6,
  },
  541: {
    itemsToShow: 5,
  },
};

props.imagesType ? null : props.images.unshift({ url: props.preview });

function slideTo(index) {
  if (index === props.images.length) {
    currentSlide.value = 0;
  } else {
    currentSlide.value = index;
  }
}

watch(() => props.images, () => {
  if (props.images.length) {
    currentSlide.value = 1;
  }
});
</script>

<template>
  <div class="special__slider">
    <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide" :mouseDrag="false"
      :breakpoints="breakpoints">
      <Slide v-for="(slide, index) in props.images" :key="index">
        <div class="carousel__item">
          <div class="slide">
            <a data-fancybox="gallery" :href="`${slide.url}`">
              <NuxtImg format="webp" :src="`${slide.url}`" alt="car" style="width: 100%;" />
            </a>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation class="carousel__navigation" />
      </template>
    </Carousel>

    <Carousel id="thumbnails" :items-to-scroll="1" :items-to-show="5" :wrap-around="false" v-model="currentSlide"
      ref="carousel" class="thumbnails" :breakpoints="breakpoints2">
      <Slide v-for="(slide, index) in props.images" :key="index">
        <div class="carousel__item" :class="{ active: currentSlide === index }" @click="slideTo(index)">
          <NuxtImg format="webp" :src="`${slide.url}`" alt="car" style="width: 100%" />
        </div>
      </Slide>
      <template #addons>
        <Pagination class="carousel__pagination" />
      </template>
    </Carousel>

    <div class="carousel__custom-thumbnails">
      <ul class="carousel__custom-thumbnails-list"
        :style="`transform: translateY(-${props.images.length > 6 ? (currentSlide * 100) : 0}px)`">
        <!-- Original images -->
        <li v-for="(slide, index) in props.images" :key="index" class="carousel__item"
          :class="{ 'active': currentSlide === index }" @click="slideTo(index)">
          <NuxtImg format="webp" :src="slide.url" alt="car" style="width: 100%;" />
        </li>

        <!-- Duplicated first image -->
        <li v-for="(slide, index) in props.images" :key="index" class="carousel__item"
          :class="{ 'active': currentSlide === index }" @click="slideTo(index)">
          <NuxtImg format="webp" :src="slide.url" alt="car" style="width: 100%;" v-if="props.images.length > 6" />
        </li>
      </ul>
    </div>

    <!-- <div class="carousel__pages">{{ currentSlide + 1 }} / {{ props.images.length }}</div> -->
  </div>
</template>

<style scoped lang="scss">
.thumbnails {
  .carousel__track {
    max-width: 370px;
    width: 100%;
    margin: 0 auto;

    li {
      .carousel__item {
        opacity: .4;
      }

      .carousel__item.active {
        opacity: 1;
      }
    }
  }
}

.special__slider {
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (max-width: 1023px) {
    max-height: initial;
  }

  .no-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel__custom-thumbnails {
    position: relative;
    max-height: 350px;
    overflow: hidden;
    display: none;

    .carousel__custom-thumbnails-list {
      display: grid;
      gap: 10px;

      transition: transform 0.3s ease-in-out;

      @media screen and (max-width: 1150px) {
        display: none;
      }

      .carousel__item {
        cursor: pointer;
        list-style: none;
        padding: 0;
        margin: 0;
        border-radius: 6px;
        overflow: hidden;
        // opacity: 0.5;
        width: 100px;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .carousel__item.active {
        // opacity: 1;
        border: 1px solid #1A7362;
      }
    }

    .carousel__custom-thumbnails-controls {
      position: absolute;
      top: -10px;

      .controls__prev {
        background: var(--main-color);
        width: 30px;
        height: 30px;
        border-radius: 100%;
        color: white;
      }
    }
  }
}

.no-image {
  grid-template-columns: 1fr;
}

.carousel__pages {
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b3b3bc4;
  padding: 4px 8px;
  color: white;
  border-radius: 20px;
  font-size: var(--standart-size);

  @media screen and (max-width: 1150px) {
    display: flex;
  }
}

.carousel__pagination {
  flex-wrap: wrap;
  align-items: center;
}
</style>