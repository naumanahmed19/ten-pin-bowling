<template>
  <div class="my-5">
    <button
      class="py-2 mx-1 rounded-full h-10 w-10 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      v-for="(n, i) in throwsLeft"
      :key="n"
      @click="$emit('click', i)"
    >
      {{ i }}
    </button>
  </div>
</template>

<script>
export default {
  emits: ["click"],
  props: {
    throws: {
      type: Array,
      default: () => [],
    },
    isLastFrame:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    throwsLeft() {
      if (this.throws.length && this.throws[0] != "X" && !this.isLastFrame) {
        return 11 - this.throws[0];
      }
      return 11;
    },
  },
};
</script>