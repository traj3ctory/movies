<template>
  <div class="position-relative">
    <HeaderSection />
    <main class="pb-lg-5 pb-3 mb-3 bg_dark">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition">
          <component :is="Component" :key="route.path + route.name" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderSection from "@/components/layout/HeaderSection.vue";
import FooterSection from "@/components/layout/FooterSection.vue";

export default defineComponent({
  components: {
    HeaderSection,
    FooterSection,
  },
  name: "ObiexApplication",
  setup() {
    return {};
  },
});
</script>

<style lang="scss"></style>
