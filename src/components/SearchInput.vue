<template>
  <q-form
    @submit="handleSubmit"
    @reset="handleReset"
    ref="formRef"
    style="display: contents;"
  >
    <q-input
      type="search"
      name="query"
      v-model="query"
      ref="inputRef"
      v-bind="$attrs"
    >
      <template v-slot:append>
        <q-btn
          type="submit"
          padding="xs"
          flat
          round
          icon="search"
          :disabled="!query"
          @click="() => formRef.submit()"
        />
        <q-btn
          type="reset"
          padding="xs"
          flat
          round
          icon="clear"
          :disabled="!query"
          @click="() => formRef.reset()"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
} from 'vue';

import useSearch, {
  useSearchFromRoute,
} from 'lib/useSearch.js';

//----------------------------------------------------------------------------
export default defineComponent({
  name: 'SearchInput',

  setup() {
    const {
      createSearch,
    } = useSearch();

    const {
      searchId,
      search,
    } = useSearchFromRoute();

    const start = ref(0);
    const count = ref(SESHAT_MAX_RESULTS);

    const query = ref('');
    const currentQuery = ref('');
    const formRef = ref(null);
    const inputRef = ref(null);

    function handleReset() {
      query.value = '';
    }

    function handleSubmit() {
      const text = query.value.trim();
      if (!text) {
        return;
      }
      query.value = '';
      currentQuery.value = '';
      const newSearch = createSearch(text, count.value, start.value);
      searchId.value = newSearch.id;
      inputRef.value.blur();
    }

    watch(search, (newValue, oldValue) => {
      if (!oldValue) {
        // Was not on a search result page: Store current query.
        currentQuery.value = query.value;
      }
      if (newValue) {
        // Are on a search result page now: Restore query from search.
        query.value = newValue.query;
      } else {
        // Are not a search result page now: Restore current query.
        query.value = currentQuery.value;
      }
    });

    return {
      query,
      formRef,
      inputRef,

      handleReset,
      handleSubmit,
    };
  },
});
</script>
