import MainLayout from 'layouts/MainLayout.vue';

import IndexPage from 'pages/IndexPage.vue';
import ResultPage from 'pages/ResultPage.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'result/:searchId',
        name: 'result',
        component: ResultPage,
      },
      {
        path: '',
        name: 'home',
        component: IndexPage,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
