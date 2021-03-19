import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const API_KEY = '?api_key=52f5ef3c38240ee0230e711397b94695';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    test: 'test',
    isLoading: false,
    searchPhrase: null,
    movies: [],
    movieDetails: null,
    searchedMovies: [],
    favouriteMovies: []
  },
  getters: {
    GET_MOVIES_ARR: state => state.movies,
    GET_MOVIES_ARR_COUNT: (state, getters) => {
      return getters.GET_MOVIES_ARR.length;
    },
    GET_MOVIE_DETAILS: state => state.movieDetails,
    GET_SEARCH_MOVIES: state => state.searchedMovies,
    GET_SEARCH_MOVIES_COUNT: (state, getters) => {
      return getters.GET_SEARCH_MOVIES.length
    },
    GET_FAVOURITE_MOVIES: state => state.favouriteMovies,
    GET_FAVOURITE_MOVIES_COUNT: (state, getters) => {
      return getters.GET_FAVOURITE_MOVIES.length
    },
    GET_LOADING_STATUS: state => state.isLoading,
    GET_SEARCH_PHRASE: state => state.searchPhrase
  },
  mutations: {
    SET_MOVIES_ARR(state, movies) {
      state.movies = movies
    },
    SET_SEARCHED_MOVIES(state, movies) {
      state.searchedMovies = movies
    },
    SET_FAVOURITE_MOVIES(state, movies) {
      state.searchedMovies = movies
    },
    SET_LOADING_STATUS(state, boolean) {
      state.isLoading = boolean
    },
    SET_SEARCH_PHRASE(state, phrase) {
      state.searchPhrase = phrase
    },
    SET_MOVIE_DETAILS(state, movie) {
      state.movieDetails = movie;
    },
    ADD_TO_FAVOURITES(state, movie) {
      const newMovieObj = {...movie, isFavourite: 'true' };
      state.favouriteMovies = [...state.favouriteMovies, newMovieObj];
    },
    REMOVE_FROM_FAVOURITES(state, movieId) {
      const newFavouriteMovies = [...state.favouriteMovies];
      newFavouriteMovies.splice(movieId, 1);
      state.favouriteMovies = newFavouriteMovies
    },
    UPDATE_POP_LIST(state, movieId) {
      let val = state.movies[movieId].isFavourite;
      if (val === 'true') {
        state.movies[movieId].isFavourite = 'false';
      } else {
        state.movies[movieId].isFavourite = 'true';
      }
    },
    UPDATE_SEARCH_LIST(state, movieId) {
      let val = state.searchedMovies[movieId].isFavourite;
      if (val === 'true') {
        state.searchedMovies[movieId].isFavourite = 'false';
      } else {
        state.searchedMovies[movieId].isFavourite = 'true';
      }
    }
  },
  actions: {
    fetchPopularMovies({ commit }) {
      commit('SET_LOADING_STATUS', true);
      axios.get(`/movie/popular${API_KEY}`)
        .then(({ data }) => {
          setTimeout(() => {
            const movies = data.results.map(m => ({
              ...m,
              isFavourite: 'false'
            }));
            commit('SET_MOVIES_ARR', movies);
            commit('SET_LOADING_STATUS', false);
          }, 2000)
        })
    },
    fetchSearchMovies({ commit, getters }) {
      commit('SET_LOADING_STATUS', true);
      axios.get(`/search/movie${API_KEY}&query=${getters.GET_SEARCH_PHRASE}`)
        .then( ({ data }) => {
          const movies = data.results.map(m => ({
            ...m,
            isFavourite: 'false'
          }));
          commit('SET_SEARCHED_MOVIES', movies);
          commit('SET_LOADING_STATUS', false);
        })
    },
    fetchMovieDetails({ commit }, movieId) {
      commit('SET_LOADING_STATUS', true);
      axios.get(`/movie/${movieId}${API_KEY}`)
        .then( ({ data }) => {
          commit('SET_MOVIE_DETAILS', data);
          commit('SET_LOADING_STATUS', false);
        })
    },
    toggleFavourite({ commit, state }, payload) {
      const { id } = payload;
      const favMovieIndex = state.favouriteMovies.findIndex(
        m => m.id === id
      );
      const moviesIndex = state.movies.findIndex(
        m => m.id === id
      );
      const searchIndex = state.searchedMovies.findIndex(
        m => m.id === id
      );
      if (favMovieIndex === -1) {
        commit('ADD_TO_FAVOURITES', payload);
      } else {
        commit('REMOVE_FROM_FAVOURITES', favMovieIndex)
      }
      if ( moviesIndex !== -1 ){
        commit('UPDATE_POP_LIST', moviesIndex);
      }
      if ( searchIndex !== -1) {
        commit('UPDATE_SEARCH_LIST', searchIndex);
      }
    }
  }
});
