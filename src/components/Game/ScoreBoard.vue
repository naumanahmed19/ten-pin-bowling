<template>

  <div class="mb-2 p-5" v-for="(player, index) in players" :key="index" :class="index== activePlayer? 'bg-red ': ''">
    <div class="relative px-4 sm:px-0">
      <div
        class="relative grid bg-white divide-y rounded shadow sm:divide-y-0 mx-auto sm:max-w-xl md:max-w-full"
      >
        <div class="border-b px-3 py-2">
          <h3>{{ player.name }} | Wins {{ player.wins }}</h3>
        </div>
        <div class="grid bordergap-2 grid-cols-11">
          <div
            v-for="(n, i) in 10"
            :key="i"
            class="inline-block border-l text-center"
          >
            <div class="text-center p-2">
              <div class="grid bordergap-2 grid-cols-2">
                <p class="text-2x1" v-for="f in player.frames[i]" :key="f">
                  {{ f }}
                </p>
              </div>
              <p class="font-bold">{{ player.faramScore[i] }}</p>
            </div>
          </div>
          <div class="inline-block text-center">
            <div class="text-center">
              <h6 class="text-2x1">Total {{ player.frames.length }}</h6>
              <p class="font-bold">{{ player.faramScore.length }}</p>
            </div>
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
  },
};
</script>
