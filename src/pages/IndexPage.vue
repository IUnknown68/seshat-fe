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
          <a href="https://en.wikipedia.org/wiki/Semantic_search" target="_blank">
            Semantic search</a> allows you to search my meaning rather than
            the words you use ("lexical search").
        </p>
        <q-banner class="bg-grey-2 q-mb-md">
          <i>Example:</i> "<strong>Sounds pets make</strong>" might turn up a
          dataset containing the word "<strong>meow</strong>".
        </q-banner>
        <p>
          Note also that a semantic search will <strong>always</strong> return
          <strong>something</strong>, since it goes for the best fit. If that
          doesn't look related to your query, then this means, there is no better
          (means: more related) data in the database.
        </p>
        <p>
          Also the <strong>input language</strong> does not matter, data will be found
          regardless of the input language. Yet the datasets
          will always be in the language they were originally, no translation
          is happening.
        </p>
        <p>
          <strong>Once you have recent searches, they will appear here.</strong>
          They are stored in your browser's session storage, means they will be
          deleted when you close your current browser(-session).
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
