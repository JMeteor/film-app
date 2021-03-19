<template>
  <div>
    <div class="text-left mb-2">
      <router-link class="btn btn-secondary" to="/">Go back</router-link>
    </div>
    <b-skeleton-wrapper :loading="loading">

      <template #loading>
        <b-card>
          <b-skeleton-img
            animation="wave"
            aspect="3:4"
          >
          </b-skeleton-img>
          <b-skeleton class="mt-3" animation="wave" height="35px" width="85%"></b-skeleton>
          <b-skeleton animation="wave" height="19px" width="75%"></b-skeleton>
        </b-card>
      </template>


      <b-card no-body class="text-left mb-4" v-if="movie">
        <b-card-body>

          <div class="row">
            <div class="col-sm-12 col-md-4">
              <b-card-img
                v-if="movie.poster_path"
                :src="imgBaseURL + movie.poster_path"
                :alt="movie.title + 'poster'"
                class="mb-4"
                top>
              </b-card-img>
            </div>

            <div class="col-sm-12 col-md-8">
              <header>
                <h2>{{ movie.title }} <span class="h4">({{ movie.release_date | getYear }})</span></h2>
                <p class="h5 font-italic" v-if="movie.tagline"> {{ movie.tagline}}</p>

              </header>
              <section>
                <dl class="mt-4">
                  <div>
                    <dt>Runtime:</dt>
                    <dd>{{ movie.runtime | timeConvert }}</dd>
                  </div>
                  <div>
                    <dt>Genres:</dt>
                    <dd>
                      <ul class="genre-list">
                        <li
                          v-for="g in movie.genres"
                          :key="g.id"
                        >{{ g.name }}</li>
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt>User score:</dt>
                    <dd class="h5">
                      <b-badge  :variant="badgeColor(movie.vote_average)">{{ movie.vote_average }}</b-badge>
                    </dd>
                  </div>
                </dl>
                <b-button @click="toggleFavourite" class="btn--favourite" variant="light">
                  <svg v-if="movie.isFavourite !== 'true'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                </b-button>
              </section>

              <section class="mt-4">
                <h3>Overview</h3>
                <p>{{ movie.overview }}</p>
              </section>
            </div>

          </div>

        </b-card-body>
      </b-card>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
  import { filmMixin } from '../mixins/film';
  export default {
    name: 'FilmDetails',
    mixins: [ filmMixin ],
    data() {
      return {
        id: this.$route.params.id
      }
    },
    mounted() {
      this.$store.dispatch('fetchMovieDetails', this.id);
    },
    methods: {
      toggleFavourite() {
        this.$store.dispatch('toggleFavourite', this.movie);
      }
    },
    computed: {
      movie() {
        return this.$store.getters.GET_MOVIE_DETAILS
      },
      loading() {
        return this.$store.getters.GET_LOADING_STATUS
      }
    }
  }
</script>

<style lang="scss">
  .genre-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    li:not(:last-of-type)::after {
      content: ',';
      margin-right: 5px;
    }
  }

</style>
