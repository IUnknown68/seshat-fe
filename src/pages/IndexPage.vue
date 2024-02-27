<template>
  <q-page>
    <div v-if="listOfSearches.length">
      <div class="text-h6 q-pa-md">
        Recent searches
      </div>
      <q-separator />
      <q-list
        separator
      >
        <SearchListItem
          v-for="item of listOfSearches"
          :key="item.id"
          :item="item"
        />
      </q-list>
    </div>
    <div
      v-else
      class="flex justify-center q-pa-md"
    >
      <q-banner rounded class="bg-grey-2">
        No recent searches.
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import useSearch from 'lib/useSearch.js';
import SearchListItem from 'components/SearchListItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'IndexPage',

  components: {
    SearchListItem,
  },

  setup() {
    const { listOfSearches } = useSearch();

    return {
      listOfSearches,
    };
  },
});
</script>
