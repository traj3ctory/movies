<template>
  <header class="header_bg">
    <div class="header container-lg container-fluid">
      <div class="d-flex align-items-center h-100">
        <router-link to="/">
          <img
            :src="require('@/assets/img/logo.png')"
            alt="Logo"
            class="img-fluid"
        /></router-link>
      </div>
      <div>
        <div class="input-group d-md-flex d-none">
          <span class="input-group-text" id="basic-search"><SearchIcon /></span>
          <input
            type="text"
            class="form-control"
            id="search"
            name="search"
            v-model="search"
            @input="updateSearchText"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-search"
          />
        </div>
        <div class="d-md-none d-block">
          <SearchIconLg @click="toggleSearchBar" v-if="!showSearchBar" />
          <CancelIcon @click="toggleSearchBar" v-else />
        </div>

        <div
          class="dropdown_container container-fluid d-md-none d-block"
          v-if="showSearchBar"
        >
          <div class="input-group">
            <span class="input-group-text" id="basic-search"
              ><SearchIcon
            /></span>
            <input
              type="text"
              class="form-control"
              id="search"
              name="search"
              v-model="search"
              @input="updateSearchText"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-search"
            />
          </div>
        </div>
        <div class="overlay_dropdown d-md-none d-block" v-if="showSearchBar" />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import SearchIcon from "@/components/icons/search.vue";
import SearchIconLg from "@/components/icons/search_lg.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import useApi from "@/helpers/useApi";

export default defineComponent({
  name: "HeaderSection",
  components: {
    SearchIcon,
    SearchIconLg,
    CancelIcon,
  },
  setup() {
    const store = useStore();
    const showSearchBar = ref(false);
    const search = computed(() => store.state.searchText);

    const data = ref();
    const error = ref();
    const errorMsg = ref();
    const loading = ref(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateSearchText = (event: any) =>
      store.commit("updateSearchText", event.target.value);

    // toggle showSearchBar
    const toggleSearchBar = () => {
      showSearchBar.value = !showSearchBar.value;
    };

    const fetchData = async () => {
      loading.value = true;
      try {
        const {
          data: responseData,
          errorMsg: errorMessage,
          error: errorData,
        } = await useApi(search.value, "SearchTitle");
        store.commit("updateSearchedMovies", responseData.results);
        data.value = responseData.results;
        error.value = errorData;
        errorMsg.value = errorMessage;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    // Watch for changes in the computed property 'search'
    watch(search, (newValue) => {
      if (newValue.length > 3) {
        fetchData(); // function to fetch data
      }
      if (newValue.length < 2) {
        store.commit("updateSearchedMovies", []);
      }
    });

    return {
      orgnaization: "Obiex",
      search: search.value,
      updateSearchText,
      showSearchBar,
      toggleSearchBar,
      data,
      errorMsg,
      error,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
span.input-group-text {
  background: #1b1f32;
  border: 1px solid #494d61;
  border-right: 0;
}
input.form-control {
  background-color: #1b1f32;
  border: 1px solid #494d61;
  border-left: 0;
  color: white;
  &:focus {
    box-shadow: none;
  }
}
</style>
