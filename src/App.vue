<template>
  <ScoreBoard />
  <h3>Current Turn : {{players[currentPlayer].name}}</h3>
  <button @click="changeTurn(1)">Change Turn</button>

  <ul>
      <li v-for="(player,index) in players" :key="index">
        {{player.name}} | Score : {{getScore(index)}}
      </li>
  </ul>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  name: 'App',
  components: {
    ScoreBoard
  },
  data() {
    return {
      currentPlayer : 0,
      players: [
      {
  
        name: 'Ahmad',
        score: [],
      },
      {

        name: 'Ali',
        score: [],
      }
    ],
    }
  },

  methods: {
    changeTurn(p){
      this.currentPlayer = p; 
    },

    updateScore(s){
      this.players[this.currentPlayer].score.push(s)
    },

    getScore(index){
      let playerScore = this.players[index].score;
      return this.calculateScore(playerScore);
    },

    calculateScore(score){
      //calculate score here.
    }
  },
}
</script>
