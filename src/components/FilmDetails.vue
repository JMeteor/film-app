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
