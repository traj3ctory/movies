import { createStore } from "vuex";

export default createStore({
  state: {
    searchText: "Star Wars: The Rise of Skywalker 2019",
    searchedMovies: [],
  },
  getters: {
    getSearchText: (state) => state.searchText,
    getSearchedMovies: (state) => state.searchedMovies,
  },
  mutations: {
    updateSearchText: (state, newText) => (state.searchText = newText),
    updateSearchedMovies: (state, newMovies) => 
      (state.searchedMovies = newMovies),
  },
  actions: {},
  modules: {},
});
