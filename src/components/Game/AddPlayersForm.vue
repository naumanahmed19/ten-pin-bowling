<template>
  <div class="flex justify-center items-center space-x-9 w-auto">
    <div class="item w-96 h-24">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h5 class="mb-4 text-2xl font-extrabold">Players</h5>
          <input
            type="text"
            v-model="name"
            placeholder="Enter Player Name"
            maxlength="150"
            class="flex-grow w-full h-12 px-4 mb-4 transition duration-200 bg-white border border-gray-400 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline focus:border-indigo-500"
          />
          <button
            @click="handleAddPlayer"
            class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Player
          </button>
          <div v-if="players.length">
            <div
              class="flex py-2"
              v-for="(player, index) in players"
              :key="index"
            >
              <span
                class="h-10 w-10 rounded-full overflow-hidden bg-indigo-100 mr-3"
              >
                <svg
                  class="h-full w-full text-indigo-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>

              <div class="flex flex-col justify-center">
                <p class="text-lg">{{ player.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 sm:px-6">
          <div class="text-right">
            <button
              :disabled="!players.length"
              :class="
                !players.length
                  ? 'bg-indigo-300'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              "
              class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-sm text-white disabled:opacity-50 bg-grey"
              @click="$emit('start')"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["start", "add"],
  props: {
    players: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    handleAddPlayer() {
      this.$emit("add", this.name);
      this.name = "";
    },
  },
};
</script>