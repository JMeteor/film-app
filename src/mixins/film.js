const imgBaseURL = 'https://www.themoviedb.org//t/p/w220_and_h330_face/';

export const filmMixin = {
  data() {
    return {
      imgBaseURL
    }
  },
  filters: {
    getYear(value) {
      return value.substr(0,4);
    },
    timeConvert(minutes) {
      let h = Math.floor(minutes / 60);
      let min = minutes % 60;
      return `${h}h ${min}min`
    }
  },
  methods: {
    badgeColor(value) {
      if (7.0 < value ) {
        return 'success'
      } else if (4 < value) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  }
};
