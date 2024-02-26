<template>
  <q-header
    class="bg-white text-black q-py-sm"
    bordered
  >
    <q-toolbar>
      <router-link :to="{name: 'home'}">
        <q-avatar square class="q-mr-sm cursor-pointer" @click="home">
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
        popup-content-class="q-mr-md"
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

<style lang="scss" scoped>
.seshat {
  font-size: 3.4em;
  line-height: 1em;
  font-weight: bold;
  flex: 0 0 auto;
  a, a:hover, a:visited, a:active {
    text-decoration: none;
    color: inherit;
  }
}
</style>
