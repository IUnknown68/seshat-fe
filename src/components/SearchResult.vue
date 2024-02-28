<template>
  <div
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

    <template
      v-else
    >
      <q-banner
        v-if="search.error"
        rounded
        class="bg-red-8 text-white"
      >
        <template v-slot:avatar>
          <q-icon name="error" />
        </template>
        Error: {{search.error.message}}
      </q-banner>

      <template
        v-if="resultList"
      >
        <q-list
          separator
          class="flex-1"
        >
          <DocumentListItem
            v-for="(item, index) of resultList"
            :key="item.id"
            :item="item"
            :modelValue="selectedIndex === index"
            @update:modelValue="() => setSelectedIndex(index)"
          />
        </q-list>
        <div class="flex-1 flex justify-end items-center q-pa-md" >
          <q-btn
            unelevated
            :disabled="search.busy"
            color="secondary"
            label="Load More"
            @click="loadMore"
          />
        </div>
      </template>

      <q-spinner-grid
        v-else-if="search.busy"
        color="secondary"
        size="4em"
        class="q-mt-xl"
      />

      <q-banner
        v-else-if="!search.error"
        rounded
        class="bg-grey-2"
      >
        No results.
      </q-banner>
    </template>
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

import useSearch from 'lib/useSearch.js';
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

    const resultList = computed(
      () => ((search.value.result.length)
        ? search.value.result
        : null),
    );

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

    function keystrokeHandler(increment) {
      return (e) => {
        if (e.target.tagName === 'INPUT') {
          return;
        }
        e.preventDefault();
        setSelectedIndex(selectedIndex.value + increment);
      };
    }

    function loadMore() {
      if (search.value && !search.value.busy) {
        search.value.run();
      }
    }

    onKeyStroke(['ArrowRight', 'ArrowDown'], keystrokeHandler(1));
    onKeyStroke(['ArrowLeft', 'ArrowUp'], keystrokeHandler(-1));

    watch(search, setCurrentSearch);
    onMounted(setCurrentSearch);

    return {
      search,
      resultList,
      selectedIndex,

      setSelectedIndex,
      loadMore,
    };
  },
});
</script>
