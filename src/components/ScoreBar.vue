<template>
  <div class="score-bar">
    <div class="score-bar-bar" :style="style">
      <div class="score-bar-value">{{label}}</div>
    </div>
    <div class="score-bar-value">{{label}}</div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ScoreBar',

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const value = computed(() => Math.min(Math.max(props.value, 0), 1) * 100);

    const style = computed(() => ({
      width: `${value.value}%`,
    }));

    const label = computed(() => `${value.value.toFixed()}%`);

    return {
      style,
      label,
    };
  },
});
</script>

<style lang="scss" scoped>
.score-bar {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 1px solid currentColor;
  overflow: hidden;
  border-radius: 2px;
}

.score-bar-value {
  padding-left: 4px;
  color: currentColor;
}

.score-bar-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background-color: currentColor;

  .score-bar-value {
    color: white;
  }
}

</style>
