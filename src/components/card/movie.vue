<template>
  <router-link :to="`/details/${movieData?.id}`">
    <div class="card">
      <div class="card-body">
        <img
          :src="movieData?.poster"
          alt="movie poster"
          class="img-fluid"
          loading="lazy"
        />
      </div>
      <div class="movie_detail bg_dark">
        <h6>{{ movieData.title }}</h6>
        <small>{{ movieData.year }} | {{ movieData.runtime }} </small>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MovieCard",
  props: {
    movieData: {
      type: Object,
      required: true,
      default: () => ({ id: 0, title: "", year: "", runtime: "", poster: "" }),
    },
  },
  setup() {
    return {};
  },
});
</script>
