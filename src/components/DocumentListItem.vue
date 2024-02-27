<template>
  <q-expansion-item
    :modelValue="modelValue"
    expand-icon-toggle
    expand-separator
    @update:modelValue="updateExpanded"
  >
    <template v-slot:header>
      <q-item-section
        v-if="!!img || !!icon"
        side
        top
        class="cursor-pointer"
        @click="toggleExpanded"
      >
        <q-avatar v-if="!!icon" :icon="icon" size="32px" />
        <q-avatar v-else size="32px">
          <img :src="img" />
        </q-avatar>
      </q-item-section>

      <q-item-section class="cursor-pointer" @click="toggleExpanded">
        <q-item-label class="text-subtitle2">
          {{item.title}}
        </q-item-label>
        <q-item-label caption>
          {{item.date.toLocaleString()}}
        </q-item-label>
        <q-item-label>
          <ScoreBar
            class="text-secondary"
            style="width:120px;font-size:0.5rem;line-height: 1.2em"
            :value="1 - item.vectorScore"
          />
        </q-item-label>
      </q-item-section>

      <q-item-section side v-if="modelValue">
        <div
          class="flex justify-center gap-xs"
          style="right:0;top:0"
        >
          <q-tooltip
            :hide-delay="1"
            no-parent-event
            anchor="top middle"
            self="center middle"
            ref="copyResultTooltip"
          >
            {{result}}
          </q-tooltip>
          <q-btn
            round
            unelevated
            size="sm"
            padding="sm"
            icon="search"
            :disable="!text"
            @click="searchSelectedText"
          >
            <q-tooltip>Search for selected text</q-tooltip>
          </q-btn>
          <q-btn
            round
            unelevated
            size="sm"
            padding="sm"
            icon="content_copy"
            :disable="!text"
            @click="copySelectedText"
          >
            <q-tooltip>Copy selected text</q-tooltip>
          </q-btn>
          <q-btn
            round
            unelevated
            size="sm"
            padding="sm"
            icon="file_copy"
            @click="copyBodyText"
          >
            <q-tooltip>Copy whole text</q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </template>

    <div class="q-px-md q-py-sm relative-position">
      <div v-html="sanitizedBody" />
    </div>
  </q-expansion-item>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
} from 'vue';
import {
  useTextSelection,
  useTimeoutFn,
} from '@vueuse/core';
import { copyToClipboard } from 'quasar';

import useSearch, {
  useSearchFromRoute,
} from 'lib/useSearch.js';

import ScoreBar from 'components/ScoreBar.vue';
import sanitize from 'lib/sanitize.js';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'DocumentListItem',

  components: {
    ScoreBar,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const { text } = useTextSelection();

    const {
      createSearch,
    } = useSearch();

    const {
      searchId,
    } = useSearchFromRoute();

    const result = ref('');
    const copyResultTooltip = ref(null);

    const sanitizedBody = computed(() => sanitize(props.item.body));

    const icon = computed(() => 'article');
    const img = computed(() => null);

    function updateExpanded(newValue) {
      emit('update:modelValue', newValue);
    }

    function toggleExpanded() {
      emit('update:modelValue', !props.modelValue);
    }

    function searchSelectedText() {
      searchId.value = createSearch(text.value).id;
    }

    function reportCopied() {
      result.value = 'Copied!';
      copyResultTooltip.value.show();
      useTimeoutFn(() => {
        if (copyResultTooltip.value) {
          copyResultTooltip.value.hide();
        }
      }, 1000);
    }

    async function copySelectedText() {
      try {
        await copyToClipboard(text.value);
        reportCopied();
      } catch (err) {
        console.error(err);
      }
    }

    async function copyBodyText() {
      try {
        await copyToClipboard(props.item.body);
        reportCopied();
      } catch (err) {
        console.error(err);
      }
    }

    return {
      text,
      result,
      copyResultTooltip,
      icon,
      img,
      sanitizedBody,

      updateExpanded,
      toggleExpanded,
      searchSelectedText,
      copySelectedText,
      copyBodyText,
    };
  },
});
</script>
