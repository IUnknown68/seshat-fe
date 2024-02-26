<template>
  <q-select
    :modelValue="search"
    ref="self"
    @update:modelValue="selectSearch"
    @input-value="updateText"
    @new-value="createNewSearch"
    @filter="filterFn"

    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="options"
    option-value="id"
    option-label="query"
  >
    <template v-slot:append>
      <q-btn
        padding="xs"
        flat
        round
        icon="search"
        :disabled="!text"
        @click.prevent="createNewSearch"
      />
      <q-btn
        padding="xs"
        flat
        round
        icon="clear"
        :disabled="!text"
        @click.prevent="clear"
      />
    </template>
  </q-select>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
} from 'vue';
import { useRouter } from 'vue-router';

import useSearch, {
  useSearchFromRoute,
} from 'src/useSearch.js';

//----------------------------------------------------------------------------
export default defineComponent({
  name: 'SearchInput',

  setup() {
    const {
      createSearch,
      listOfSearches,
    } = useSearch();
    const {
      search,
    } = useSearchFromRoute();

    const { push } = useRouter();

    const text = ref('');
    const start = ref(0);
    const count = ref(SESHAT_MAX_RESULTS);
    const self = ref(null);

    const needle = ref('');

    const options = computed(() => {
      if (!needle.value) {
        return listOfSearches.value;
      }
      return listOfSearches.value.filter(v => v.query.toLocaleLowerCase().indexOf(needle.value) > -1);
    });

    function clear() {
      text.value = '';
    }

    function updateText(newValue) {
      text.value = newValue;
    }

    function selectSearch(newValue) {
      self.value.blur();
      push({ name: 'result', params: { searchId: newValue.id } });
    }

    function createNewSearch(newValue, done) {
      const query = text.value.trim();
      selectSearch(createSearch(query, count.value, start.value));
      text.value = '';
      if (done) {
        done();
      }
      self.value.blur();
    }

    function filterFn(val, update) {
      update(() => {
        needle.value = val.toLocaleLowerCase();
      });
    }

    return {
      text,
      options,
      search,
      self,

      clear,
      filterFn,
      updateText,
      createNewSearch,
      selectSearch,
    };
  },
});
</script>
