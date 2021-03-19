<template>
  <div class="container">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card-group columns>
          <b-card v-for="(s, index) in skeletonCards" :key="index">
            <b-skeleton-img
              animation="wave"
              aspect="3:4"
            >
            </b-skeleton-img>
            <b-skeleton class="mt-3" animation="wave" height="35px" width="85%"></b-skeleton>
            <b-skeleton animation="wave" height="19px" width="75%"></b-skeleton>
          </b-card>
        </b-card-group>
      </template>

      <b-card-group columns>
        <FilmItem
          v-for="movie in moviesArr"
          :movie-data="movie"
          :key="movie.id">
        </FilmItem>
      </b-card-group>

    </b-skeleton-wrapper>

  </div>
</template>

<script>
  import FilmItem from './FilmItem';
  export default {
    name: 'FilmList',
    components: { FilmItem },
    props: {
      moviesArr: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
        skeletonCards: 6,
      }
    },
    computed: {
      searchMovies() {
        return this.$store.getters.GET_SEARCH_MOVIES
      },
      loading() {
        return this.$store.getters.GET_LOADING_STATUS
      },
    }
  }
</script>

<style lang="scss">
  .list {
    &-enter-active, &-leave-active {
      transition: all 1s;
    }
    &-enter, &-leave-to {
      opacity: 0;
      transform: translateX(30px)
    }
  }
</style>
