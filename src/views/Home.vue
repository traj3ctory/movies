<template>
  <section class="pb-5">
    <HeroSection />
    <div class="container-lg container-fluid py-lg-5 py-3">
      <!-- SEARCHED MOVIE -->
      <section v-if="searchedMovies?.length > 0">
        <div class="d-flex justify-content-between mb-2">
          <h6 class="text-white">Result</h6>
          <div>
            <ArrowLeftIcon
              class="cursor-pointer"
              id="swiper-prev"
            /><ArrowRightIcon class="cursor-pointer" id="swiper-next" />
          </div>
        </div>
        <swiper
          :modules="modules"
          :autoplay="{ delay: 5000, disableOnInteraction: true }"
          :loop="true"
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
          <swiper-slide v-for="(el, i) in searchedMovies" :key="i"
            ><SearchedMovieCard :searchedMovie="el"
          /></swiper-slide>
        </swiper>
      </section>
      <!-- MOVIE FOR YOU -->
      <div class="d-flex justify-content-between my-3">
        <h6 class="text-white">Movies for you</h6>
        <div v-if="!movieLoading">
          <ArrowLeftIcon
            class="cursor-pointer"
            id="swiper-prev"
          /><ArrowRightIcon class="cursor-pointer" id="swiper-next" />
        </div>
      </div>
      <swiper
        v-if="movieLoading"
        :modules="modules"
        :autoplay="{ delay: 2500, disableOnInteraction: true }"
        :loop="true"
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
      <swiper
        v-else
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
        <swiper-slide v-for="el in movieData" :key="el.id"
          ><MovieCard :movieData="el"
        /></swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import HeroSection from "@/components/layout/HeroSection.vue";
import MovieCard from "@/components/card/movie.vue";
import SearchedMovieCard from "@/components/card/searchedMovies.vue";
import LoadingMovieCard from "@/components/card/loadingMovie.vue";
import { Navigation, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import ArrowLeftIcon from "@/components/icons/arrow-left.vue";
import ArrowRightIcon from "@/components/icons/arrow-right.vue";
// import useApi from "@/hooks/useApi.vue";
import useApi from "@/helpers/useApi";
import { convertMinutesToHoursAndMinutes } from "@/helpers/convert";

export default defineComponent({
  name: "HomeView",
  components: {
    HeroSection,
    Swiper,
    SwiperSlide,
    MovieCard,
    SearchedMovieCard,
    LoadingMovieCard,
    ArrowLeftIcon,
    ArrowRightIcon,
  },
  setup() {
    const store = useStore();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSwiper = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSlideChange = () => {};

    const searchedMovies = ref([]);
    const movieData = ref();
    const movieError = ref();
    const movieErrorMsg = ref();
    const movieLoading = ref(false);

    const fetchMovies = async () => {
      movieLoading.value = true;
      try {
        const {
          data: responseData,
          errorMsg: errorMessage,
          error: errorData,
        } = await useApi("", "InTheaters");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const movieExtracts = await responseData.items.map((el: any) => {
          return {
            id: el.id,
            title: el.title,
            year: el.year,
            runtime: convertMinutesToHoursAndMinutes(el.runtimeMins),
            poster: el.image,
          };
        });
        movieData.value = movieExtracts;
        movieError.value = errorData;
        movieErrorMsg.value = errorMessage;
      } catch (err) {
        movieError.value = err;
      } finally {
        movieLoading.value = false;
      }
    };

    onMounted(async () => {
      await fetchMovies();
    });

    store.watch(
      () => store.getters.getSearchedMovies,
      (newMovieData) => {
        // Update movieData with the new value from the getter
        searchedMovies.value = newMovieData;
      }
    );

    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, A11y, Autoplay],
      movieData,
      movieError,
      movieErrorMsg,
      movieLoading,
      searchedMovies,
    };
  },
});
</script>

<style lang="scss" scoped></style>
