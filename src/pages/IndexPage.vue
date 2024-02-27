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
      class="text-center"
    >
      <div class="text-left" style="display: inline-block;max-width: 600px">
        <div class="text-h5 text-center q-pa-md">
          Semantic search
        </div>
        <p>
          Enter a text in the search input above. Note that this is not a
          keyword search, it uses AI to understand what you actually mean.
        </p>
        <p>
          <strong>Example:</strong> "<i>Sounds pets make</i>" might turn up a
          dataset containing the word "meow".
        </p>
        <p>
          Once you have recent searches, they will appear here.
        </p>
      </div>
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
