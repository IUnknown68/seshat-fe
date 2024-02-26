<template>
  <q-layout view="lHh Lpr lFf">
    <MainLayoutHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  defineComponent,
} from 'vue';
import { useMeta } from 'quasar';

import {
  useSearchFromRoute,
} from 'src/useSearch.js';

import MainLayoutHeader from './MainLayoutHeader.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayout',

  components: {
    MainLayoutHeader,
  },

  setup() {
    const {
      search,
    } = useSearchFromRoute();

    useMeta(() => ({
      title: search.value
        ? `${SESHAT_PRODUCT_NAME} - ${search.value.query}`
        : SESHAT_PRODUCT_NAME,
    }));
    return {};
  },
});
</script>
