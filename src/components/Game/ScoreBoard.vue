<template>
  <div class="mb-2" v-for="(player, index) in players" :key="index">
    <div
      class="relative grid bg-white divide-y rounded shadow sm:divide-y-0 mx-auto sm:max-w-xl md:max-w-full"
    >
      <div
        class="border-b px-3 py-2"
        :class="index == activePlayer ? 'bg-indigo-50 ' : ''"
      >
        <div class="flex justify-strech">
          <div>{{ player.name }} |</div>
          <div>
            <span class="ml-2"> Wins</span>
            <span
              class="ml-2 text-xs px-2 bg-indigo-200 text-indigo-800 rounded-full"
              >{{ player.wins }}</span
            >
            <span
              class="text-center rounded-md w-5 h-5 w-text-sm text-white bg-indigo-400"
            ></span>
          </div>
        </div>
      </div>
      <div class="grid bordergap-2 grid-cols-11">
        <div
          v-for="(n, i) in 10"
          :key="i"
          class="inline-block border-l text-center"
        >
          <div class="text-center p-3">
            <div
              class="grid bordergap-2"
              :class="i == 9 ? 'grid-cols-3' : 'grid-cols-2'"
            >
              <p class="text-2x1" v-for="f in player.frames[i]" :key="f">
                {{ f }}
              </p>
            </div>
            <p class="font-bold mt-4">{{ player.faramScore[i] }}</p>
          </div>
        </div>
        <div class="p-3 text-center border-l">
          <div class="text-center">
            <h6 class="text-2x1">Total</h6>
            <p class="font-bold mt-4">{{ playerScore(index) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreBoard",
  props: {
    players: {
      type: Array,
      default: () => [],
    },
    activePlayer: {
      type: Number,
      default: 0,
    },
    playerScore: {
      type: Number,
      default: 0,
    },
  },
};
</script>
