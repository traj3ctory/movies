<template>
  <footer class="footer">
    © {{ new Date().getFullYear() }} Front-end assessment. {{ orgnaization }}
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterSection",
  setup() {
    return {
      orgnaization: "Obiex",
    };
  },
});
</script>
