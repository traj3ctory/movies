<template>
  <div class="card">
    <div class="card-body">
      <img :src="castData.image" :alt="`${castData.name} image`" class="img-fluid" />
    </div>
    <div class="movie_detail bg_dark">
      <h6>{{ castData.name }}</h6>
      <small>{{ castData.asCharacter }} </small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CastCard",
  props: {
    castData: {
      type: Object,
      required: true,
      default: () => ({ id: 0, asCharacter: "", image: "", name: "" }),
    },
  },
  setup() {
    return {};
  },
});
</script>

