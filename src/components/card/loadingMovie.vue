<template>
  <div class="card">
    <div class="card-body"><div class="loader"></div></div>
    <div class="movie_detail bg_dark">
      <h6 class="loader text_h6"></h6>
      <div class="d-flex mt-2">
        <span class="loader text_small"></span>
        <div class="loader text_small mx-1"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingMovieCard",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
div.card {
  border: 0;
  width: fit-content;
  div.card-body {
    min-height: 17rem;
    max-height: 17rem;
    width: 100%;
    border-radius: 4px;
    padding: 0;
    // background: #CEE8EF;
    img {
      height: inherit;
    }
  }
  div.movie_detail {
    padding-top: 0.5rem;
    color: #fff;
    h6 {
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.1rem;
      margin-bottom: 0;
    }
    small {
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
