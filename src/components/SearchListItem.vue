<template>
  <q-item
    clickable
    v-ripple
    :to="{name: 'result', params: { searchId: item.id }}"
    exact
  >
    <q-item-section>
      <q-item-label class="text-subtitle2">
        {{item.query}}
      </q-item-label>
      <q-item-label caption>
        {{item.date.toLocaleString()}}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        flat
        round
        icon="delete"
        color="negative"
        size="sm"
        @click.prevent="deleteSearch"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import useSearch from 'lib/useSearch.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'SearchListItem',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { deleteSearch } = useSearch();

    return {
      deleteSearch: () => deleteSearch(props.item.id),
    };
  },
});
</script>
