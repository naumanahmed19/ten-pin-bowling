<template>
  <div class="my-5">
    <button
      class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-green-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="$emit('new')"
    >
      Start New Game
    </button>
    <button
      class="ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="$emit('replay')"
    >
      Replay Game
    </button>
  </div>
</template>

<script>
export default {
  emits: ["new", "replay"],
  props: {
    throws: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    throwsLeft() {
      if (this.throws.length && this.throws[0] != "X") {
        return 11 - this.throws[0];
      }
      return 11;
    },
  },
};
</script>