<template>
  <q-list
    separator
    v-if="search && search.result.length"
  >
    <DocumentListItem
      v-for="(item, index) of search.result"
      :key="item.id"
      :item="item"
      :modelValue="selectedIndex === index"
      @update:modelValue="() => setSelectedIndex(index)"
    />
  </q-list>

  <div
    v-else
    class="flex justify-center q-pa-md"
  >
    <q-banner
      v-if="!search"
      rounded
      class="bg-orange text-white"
    >
      <template v-slot:avatar>
        <q-icon name="warning" />
      </template>
      Search with id <strong>{{searchId}}</strong> does not exist.
    </q-banner>

    <q-spinner-grid
      v-if="search?.busy"
      color="primary"
      size="4em"
      class="q-mt-xl"
    />
    <q-banner
      v-else-if="search?.error"
      rounded
      class="bg-red-8 text-white"
    >
      <template v-slot:avatar>
        <q-icon name="error" />
      </template>
      Error: {{search.error.message}}
    </q-banner>
    <q-banner
      v-else-if="search && !search.result.length"
      rounded
      class="bg-grey-2"
    >
      No results.
    </q-banner>
  </div>
</template>

<script>
import {
  defineComponent,
  watch,
  onMounted,
  ref,
  computed,
} from 'vue';

import useSearch from 'src/useSearch.js';
import { onKeyStroke } from '@vueuse/core';

import DocumentListItem from 'components/DocumentListItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'SearchResult',

  components: {
    DocumentListItem,
  },

  props: {
    searchId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const {
      mapOfSearches,
    } = useSearch();

    const search = computed(() => mapOfSearches.get(props.searchId));
    const selectedIndex = ref(0);

    function setSelectedIndex(index) {
      if (selectedIndex.value === index) {
        selectedIndex.value = -1;
        return;
      }
      selectedIndex.value = Math.max(Math.min(index, (search.value?.result.length || 0) - 1), -1);
    }

    function setCurrentSearch() {
      if (search.value && !search.value.busy && !search.value.result.length) {
        search.value.run();
      }
      selectedIndex.value = 0;
    }

    onKeyStroke(['ArrowRight', 'ArrowDown'], (e) => {
      e.preventDefault();
      setSelectedIndex(selectedIndex.value + 1);
    });

    onKeyStroke(['ArrowLeft', 'ArrowUp'], (e) => {
      e.preventDefault();
      setSelectedIndex(selectedIndex.value - 1);
    });

    watch(search, setCurrentSearch);
    onMounted(setCurrentSearch);

    return {
      search,
      selectedIndex,

      setSelectedIndex,
    };
  },
});
</script>
