<template>
  <div>
    <div class="text-h6 q-my-md">
      Usage
    </div>
    <p>
      This website is only accessible after logging in. <strong>If you are here without explicit
      invitation from me, please leave this page now!</strong>
    </p>
    <p>
      Use it at your own risk.
    </p>

    <div class="text-h6 q-my-md">
      Cookies
    </div>
    <p>
      A <strong>session cookie</strong> is set upon logging in.
    </p>

    <div class="text-h6 q-mb-md">
      External Services
    </div>
    <p>
      On this website, you interact with the AIs of
      <a href="https://openai.com/" target="_blank">OpenAI</a>
      and
      <a href="https://aleph-alpha.com/" target="_blank">Aleph-Alpha</a>.
      Your inputs are processed by language models from these companies.
      <strong>Consider carefully what personal information you disclose in the chat!</strong>
    </p>
    <p>
      Read the <a href="https://openai.com/policies/privacy-policy" target="_blank">Privacy Policy of OpenAI</a>
      and the
      <a href="https://aleph-alpha.com/de/datenschutz" target="_blank">Privacy Policy of Aleph Alpha</a>.
    </p>
    <div v-if="!isTerms" class="flex items-center no-wrap">
      <div class="text-bold q-pr-sm">
        I agree to the use of OpenAI and Aleph-Alpha.
      </div>
      <q-space />
      <q-toggle
        v-model="agreeExternals"
      />
    </div>

    <div class="text-h6 q-my-md">
      This Website
    </div>
    <p>
      The <strong>conversations</strong> you have with the AI on this website
      are <strong>stored</strong> in a database on my server.
      I can associate them with the email address you used to sign up.
    </p>
    <p>
      I use this data solely to learn how to improve this application
      and to detect errors or missed contacts.
      At no time do I share the data with third parties. <strong>Exceptions: See above
      under "External Services"</strong>. I do not share your email address with third parties.
    </p>
    <div v-if="!isTerms" class="flex items-center no-wrap">
      <div class="text-bold q-pr-sm">
        I agree to the storage of my conversations.
      </div>
      <q-space />
      <q-toggle
        v-model="agreeSaveConversation"
      />
    </div>

    <div v-if="isTerms" class="q-pt-sm">
      <p>
        You can request <strong>information</strong> about this data
        or demand <strong>deletion</strong> at any time.
      </p>
      <div class="flex justify-end no-wrap gap-md">
        <q-btn
          label="Request Data Information"
          color="secondary"
          unelevated
          no-caps
          no-wrap
          href="mailto:profileadmin@arneseib.com?subject=Request Data Information"
        />
        <q-btn
          label="Request Deletion"
          color="secondary"
          unelevated
          no-caps
          no-wrap
          href="mailto:profileadmin@arneseib.com?subject=Request Deletion"
        />
      </div>
    </div>

    <div v-if="isTerms">
      <q-separator class="q-my-md" />
      <div class="text-h6 q-mb-md" >
        Responsible
      </div>
      <p>for this website is:</p>
      <p>
        Arne Seib<br>
        Benzstrasse 4<br>
        64646 Heppenheim<br>
        <br>
        Email: <a href="mailto:profileadmin@arneseib.com">profileadmin@arneseib.com</a>
      </p>
      <p class="text-italic">As of: 23.1.2024</p>
    </div>
  </div>
</template>


<script>
import {
  defineComponent,
  ref,
  watch,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PrivacyStatement',

  props: {
    isTerms: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const agreeExternals = ref(false);
    const agreeSaveConversation = ref(false);

    function updateModel() {
      emit('update:modelValue', (agreeExternals.value && agreeSaveConversation.value));
    }

    watch(agreeExternals, updateModel);
    watch(agreeSaveConversation, updateModel);

    return {
      agreeExternals,
      agreeSaveConversation,
    };
  },
});
</script>
