<template>
  <router-link :to="`/details/${searchedMovie?.id}`">
    <div class="card">
      <div class="card-body">
        <img
          :src="searchedMovie?.image"
          alt="movie poster"
          class="img-fluid"
          loading="lazy"
        />
      </div>
      <div class="movie_detail bg_dark">
        <h6>{{ searchedMovie.title }}</h6>
        <small>{{ searchedMovie.description }}</small>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchedMovieCard",
  props: {
    searchedMovie: {
      type: Object,
      required: true,
      default: () => ({ id: 0, title: "", description: "", image: "" }),
    },
  },
  setup() {
    return {};
  },
});
</script>

