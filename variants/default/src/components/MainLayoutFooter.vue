<template>
  <q-footer
    bordered
    class="bg-white flex column items-center q-pa-md"
    style="color:inherit;"
  >
    <div class="flex justify-center items-center">
      <router-link :to="{name: 'privacy'}">
        Terms and conditions
      </router-link>
      <q-separator vertical class="q-mx-sm" />
      <router-link :to="{name: 'about'}">
        About
      </router-link>
    </div>
  </q-footer>
</template>

<script>
import {
  defineComponent,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayoutFooter',
});
</script>
