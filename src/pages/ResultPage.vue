<template>
  <q-page>
    <SearchResult :searchId="searchId" />
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import {
  useSearchFromRoute,
} from 'lib/useSearch.js';

import SearchResult from 'components/SearchResult.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ResultPage',

  components: {
    SearchResult,
  },

  setup() {
    const {
      searchId,
    } = useSearchFromRoute();

    return {
      searchId,
    };
  },
});
</script>
