<template>
  <div>
    <SearchBox />
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Discover" active>
          <FilmList :movies-arr="moviesArr" />
        </b-tab>
        <b-tab title="Favourite">
          <template v-if="favouriteCount === 0">
            <p class="mb-0 text-muted">Favourite list empty</p>
          </template>
          <template v-else>
            <FilmList :movies-arr="favouriteMovies" />
          </template>

        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  import SearchBox from './SearchBox';
  import FilmList from './FilmList';

  export default {
    name: 'Homepage',
    components: {
      FilmList,
      SearchBox,
    },
    mounted() {
      if (this.moviesCount === 0) {
        this.$store.dispatch('fetchPopularMovies');
      }
    },
    computed: {
      moviesArr() {
        return this.$store.getters.GET_MOVIES_ARR
      },
      moviesCount() {
        return this.$store.getters.GET_MOVIES_ARR_COUNT;
      },
      favouriteMovies() {
        return this.$store.getters.GET_FAVOURITE_MOVIES
      },
      favouriteCount() {
        return this.$store.getters.GET_FAVOURITE_MOVIES_COUNT;
      },
    }
  }
</script>

<style scoped>

</style>
