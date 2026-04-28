<script setup></script>

<template>
    <h1 v-htmlSanitizer="setSeo('h1')" class="page__title" />
</template>

<style lang="scss" scoped>
.page__title {
    font-size: 30px;
    line-height: 34px;
    margin-bottom: 30px;

    @media (max-width: 767px) {
      font-size: 26px;
      line-height: 30px;
    }
}

.margin-0 {
    margin: 0;
}

.brand__container {
  .page__title {
    margin: 30px 0;

    @media (max-width: 767px) {
        margin: 15px 0;
    }
  }
}

.main__banner-content {
  .page__title {
	  font-size: 44px;
	  line-height: 48px;
    margin-bottom: 20px;

    @media screen and (max-width: 1023px) {
			font-size: 32px;
			line-height: 36px;
      margin-bottom: 10px;
		}

	  @media screen and (max-width: 540px) {
		  font-size: 20px;
		  line-height: 28px;
	  }

    @media screen and (max-width: 375px) {
		  font-size: 18px;
		  line-height: 22px;
	  }
  }
}
</style>