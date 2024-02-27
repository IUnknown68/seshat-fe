<template>
  <q-page class="flex justify-center content-start q-py-md">
    <div class="container-600 q-pa-md">
      <div class="text-h4 text-center q-mb-md">
        {{productName}}
      </div>
      <p>
        <strong>This</strong> is something.
      </p>
      <p><strong>Technology:</strong> The app utilizes GPT-4 as a conversational agent
        through the
        <a href="https://platform.openai.com/docs/guides/text-generation" target="_blank">
          OpenAI API</a>, a Redis database.
      </p>
      <p>
        The <strong>frontend</strong> was built using <a href="https://quasar.dev/docs" target="_blank">
        Quasar</a> and <a href="https://vuejs.org/" target="_blank">Vue.js</a>,
        while the backend is a node.js server.
      </p>
      <p>
        The Redis database stores <strong>text embeddings</strong>.
      </p>
      <div class="text-h5 text-center q-mb-md">
        Status
      </div>
      <p>
        The application is an MVP in the "Make it work" state. It is partially
        assembled from snippets I use for other projects, which are also in flux.
      </p>
      <p>
        The next step would be "Make it right" - code reviews, refactoring,
        addressing to-do lists, outsourcing code into packages, automatic deployment,
        etc... You know the drill.
      </p>
      <p>
        <strong>Version:</strong> {{version}}
      </p>
      <p class="text-italic">
        This text was written by me in German and translated by GPT.
      </p>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AboutPage',

  components: {},

  setup() {
    return {
      productName: SESHAT_PRODUCT_NAME,
      version: SESHAT_VERSION,
    };
  },
});
</script>
