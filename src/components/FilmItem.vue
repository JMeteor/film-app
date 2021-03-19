<template>
  <b-card
    no-body
    class="text-left"
    overlay
  >
    <div class="img-wrap">
      <b-card-img
        v-if="movieData.poster_path"
        :src="imgBaseURL + movieData.poster_path"
        :alt="movieData.title + 'poster'"
        top>
      </b-card-img>
      <b-badge
        title="overall rating"
        :variant="badgeColor(movieData.vote_average)">
        {{ movieData.vote_average }}
      </b-badge>
    </div>

    <b-card-header class="position-relative">
      <b-card-title
        class="mt-2"
        title-tag="h4">
        {{ movieData.title }}
      </b-card-title>

      <b-card-sub-title
        class="h6"
        sub-title-tag="h4"
      >
        {{ movieData.original_title}}
      </b-card-sub-title>
    </b-card-header>

    <b-card-body>
      <div class="text-right">
        <b-button @click="toggleFavourite" class="btn--favourite" variant="light">
          <svg v-if="movieData.isFavourite !== 'true'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
        </b-button>
      </div>

      <b-card-text>
        {{ movieData.overview | sliceDescription }}
        <router-link :to="'/movie/' + movieData.id">read more</router-link>
      </b-card-text>
    </b-card-body>

  </b-card>
</template>

<script>
  import { filmMixin } from '../mixins/film';

  export default {
    name: 'FilmItem',
    props: [ 'movieData' ],
    mixins: [ filmMixin ],
    data() {
      return {
      }
    },
    methods: {
      toggleFavourite() {
        this.$store.dispatch('toggleFavourite', this.movieData);
      }
    },
    filters: {
      sliceDescription(value) {
        const maxChars = 80;
        return value.substr(0, maxChars) + '…';
      }
    }
  }
</script>

<style lang="scss">
  .card {
    .img-wrap {
      position: relative;
      .badge {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 1rem;
      }

    }
    .btn--favourite {
      .bi-heart {}
      .bi-heart-fill {
        fill: var(--pink);
      }
    }
  }
</style>
