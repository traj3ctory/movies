<template>
  <router-link :to="`/details/${similarMovie?.id}`">
    <div class="card">
      <div class="card-body">
        <img
          :src="similarMovie?.image"
          alt="movie poster"
          class="img-fluid"
          loading="lazy"
        />
      </div>
      <div class="movie_detail bg_dark">
        <h6>{{ similarMovie.title }}</h6>
        <small><StarIcon />{{ similarMovie.imDbRating }}</small>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StarIcon from "@/components/icons/star.vue";

export default defineComponent({
  name: "SimilarMovieCard",
  components: {
    StarIcon,
  },
  props: {
    similarMovie: {
      type: Object,
      required: true,
      default: () => ({ id: 0, title: "", imDbRating: "", image: "" }),
    },
  },
  setup() {
    return {};
  },
});
</script>

