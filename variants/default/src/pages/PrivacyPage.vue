<template>
  <q-page class="flex justify-center q-pa-md">
    <q-card
      flat
      bordered
      class="container-800"
    >
      <q-card-section>
        <div class="text-h5 text-primary">
          Privacy Statement
        </div>
      </q-card-section>
      <q-card-section>
        <PrivacyStatement />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import PrivacyStatement from '../components/PrivacyStatement.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PrivacyPage',

  components: {
    PrivacyStatement,
  },

  setup() {
    return {
    };
  },
});
</script>
