<template>
  <div>
    <b-card
      bg-variant="light"
      class="mb-4">
      <div class="input-group">
        <b-form-input v-model="searchPhrase" class="mr-2" placeholder="Search for movie…"></b-form-input>
        <b-button @click="searchMovies"  variant="primary">Search</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "SearchBox",
    data() {
      return {
      }
    },
    methods: {
      searchMovies() {
        if (this.searchPhrase.length >= 3) {
          this.$store.dispatch('fetchSearchMovies', this.searchPhrase)
        }
      }
    },
    computed: {
      searchPhrase: {
        get() {
          return this.$store.getters.GET_SEARCH_PHRASE
        },
        set(value) {
          this.$store.commit('SET_SEARCH_PHRASE', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>
