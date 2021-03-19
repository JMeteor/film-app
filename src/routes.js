import Home from './components/Homepage';
import Details from './components/FilmDetails';

export const routes = [
  {
    path: '',
    component: Home
  },
  {
    path: '/movie/:id',
    component: Details
  }
];
