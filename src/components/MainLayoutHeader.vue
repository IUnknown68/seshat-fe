<template>
  <q-header
    class="bg-white text-black q-py-sm"
    bordered
  >
    <q-toolbar>
      <router-link :to="{name: 'home'}">
        <q-avatar square class="q-mr-sm cursor-pointer">
          <img src="/icons/favicon-32x32.png">
          <q-tooltip class="text-no-wrap">{{title}}</q-tooltip>
        </q-avatar>
      </router-link>
      <SearchInput
        dense
        rounded
        outlined
        placeholder="What are you looking for?"
        class="q-ml-sm flex-1"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import SearchInput from 'components/SearchInput.vue';

//----------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayoutHeader',

  components: {
    SearchInput,
  },

  setup() {
    const title = `${SESHAT_PRODUCT_NAME} Home`;
    return { title };
  },
});
</script>
