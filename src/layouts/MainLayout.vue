<template>
  <q-layout view="lHh Lpr lFf">
    <MainLayoutHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
    <component v-if="!!footer" :is="footer" />
    <q-ajax-bar
      position="top"
      color="primary"
      size="4px"
    />
  </q-layout>
</template>

<script>
import {
  defineComponent,
} from 'vue';
import { useMeta } from 'quasar';

import {
  useSearchFromRoute,
} from 'lib/useSearch.js';

import variant from 'variant';
import MainLayoutHeader from 'components/MainLayoutHeader.vue';

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

    return {
      footer: variant.footer,
    };
  },
});
</script>
