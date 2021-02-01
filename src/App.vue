<template>
  <div class="min-h-screen bg-gray-50 w-100 p-10">
    <div class="max-w-7xl mx-auto pt-8">
      <Game />
    </div>
  </div>
</template>

<script>
import Game from "./components/Game/Game.vue";
export default {
  name: "App",
  components: {
    Game,
  },
};
</script>
