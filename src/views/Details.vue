<template>
  <section class="">
    <HeroSection />
    <div class="container-lg container-fluid py-lg-5 py-3">
      <!-- Loading -->
      <div v-if="loading">
        <!-- Cast -->
        <div>
          <div class="d-flex justify-content-between mb-2">
            <h6 class="text-white">Cast</h6>
            <div>
              <ArrowLeftIcon
                class="cursor-pointer"
                id="swiper-prev"
              /><ArrowRightIcon class="cursor-pointer" id="swiper-next" />
            </div>
          </div>
          <swiper
            :modules="modules"
            :loop="true"
            :autoplay="{ delay: 2500, disableOnInteraction: true }"
            :navigation="{ nextEl: '#swiper-next', prevEl: '#swiper-prev' }"
            :pagination="false"
            :scrollbar="false"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :rewind="true"
            :breakpoints="{
              '@0.00': {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              '@0.65': {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              '@1.50': {
                slidesPerView: 5.5,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide v-for="el in 10" :key="el"
              ><LoadingMovieCard
            /></swiper-slide>
          </swiper>
        </div>
        <!-- Similar -->
        <div class="mt-lg-5 mt-3">
          <div class="d-flex justify-content-between mb-2">
            <h6 class="text-white">You might also like</h6>
            <div>
              <ArrowLeftIcon
                class="cursor-pointer"
                id="swiper-prev-2"
              /><ArrowRightIcon class="cursor-pointer" id="swiper-next-2" />
            </div>
          </div>
          <swiper
            :modules="modules"
            :loop="true"
            :autoplay="{ delay: 3000, disableOnInteraction: true }"
            :navigation="{ nextEl: '#swiper-next-2', prevEl: '#swiper-prev-2' }"
            :pagination="false"
            :scrollbar="false"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :rewind="true"
            :breakpoints="{
              '@0.00': {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              '@0.65': {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              '@1.50': {
                slidesPerView: 5.5,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide v-for="el in 10" :key="el"
              ><LoadingMovieCard
            /></swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- ! Loading -->
      <div v-else>
        <!-- Cast -->
        <div>
          <div class="d-flex justify-content-between mb-2">
            <h6 class="text-white">Cast</h6>
            <div>
              <ArrowLeftIcon
                class="cursor-pointer"
                id="swiper-prev"
              /><ArrowRightIcon class="cursor-pointer" id="swiper-next" />
            </div>
          </div>
          <swiper
            :modules="modules"
            :loop="true"
            :autoplay="{ delay: 4500, disableOnInteraction: true }"
            :navigation="{ nextEl: '#swiper-next', prevEl: '#swiper-prev' }"
            :pagination="false"
            :scrollbar="false"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :rewind="true"
            :breakpoints="{
              '@0.00': {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              '@0.65': {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              '@1.50': {
                slidesPerView: 5.5,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide v-for="el in data?.actorList" :key="el.id"
              ><CastCard :castData="el"
            /></swiper-slide>
          </swiper>
        </div>
        <!-- Similar -->
        <div class="mt-lg-5 mt-3">
          <div class="d-flex justify-content-between mb-2">
            <h6 class="text-white">You might also like</h6>
            <div>
              <ArrowLeftIcon
                class="cursor-pointer"
                id="swiper-prev-2"
              /><ArrowRightIcon class="cursor-pointer" id="swiper-next-2" />
            </div>
          </div>
          <swiper
            :modules="modules"
            :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: true }"
            :navigation="{ nextEl: '#swiper-next-2', prevEl: '#swiper-prev-2' }"
            :pagination="false"
            :scrollbar="false"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :rewind="true"
            :breakpoints="{
              '@0.00': {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              '@0.65': {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
              '@1.50': {
                slidesPerView: 5.5,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide v-for="el in data?.similars" :key="el.id"
              ><SimilarMovieCard :similarMovie="el"
            /></swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  watch,
} from "vue";
import { Navigation, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import ArrowLeftIcon from "@/components/icons/arrow-left.vue";
import ArrowRightIcon from "@/components/icons/arrow-right.vue";
import HeroSection from "@/components/layout/HeroSection.vue";
import CastCard from "@/components/card/cast.vue";
import LoadingMovieCard from "@/components/card/loadingMovie.vue";
import SimilarMovieCard from "@/components/card/similarMovies.vue";
import useApi from "@/helpers/useApi";

export default defineComponent({
  name: "DetailsView",
  components: {
    HeroSection,
    Swiper,
    SwiperSlide,
    CastCard,
    SimilarMovieCard,
    LoadingMovieCard,
    ArrowLeftIcon,
    ArrowRightIcon,
  },
  setup() {
    const instance = getCurrentInstance();
    let movieId = instance?.proxy?.$route.params.id as string;
    const data = ref();
    const error = ref();
    const errorMsg = ref();
    const loading = ref(false);

    const fetchMovie = async () => {
      try {
        loading.value = true;
        const {
          data: responseData,
          errorMsg: errorMessage,
          error: errorData,
        } = await useApi(movieId, "Title");
        data.value = responseData;
        error.value = errorData;
        errorMsg.value = errorMessage;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSwiper = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSlideChange = () => {};

    onMounted(async () => {
      await fetchMovie();
    });

    // Watch for changes in the ID parameter
    watch(
      () => instance?.proxy?.$route.params.id,
      async (newId) => {
        movieId = newId as string;
        await fetchMovie();
      }
    );
    return {
      data,
      errorMsg,
      error,
      loading,
      onSwiper,
      onSlideChange,
      modules: [Navigation, A11y, Autoplay],
    };
  },
});
</script>
