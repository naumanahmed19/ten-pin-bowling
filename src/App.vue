<template>
  <ScoreBoard />
  <h3>Current Turn : {{players[currentPlayer].name}}</h3>
  <button @click="changeTurn(1)">Change Turn</button>
  <ul>
      <li v-for="(player,index) in players" :key="index">
        <br> <br> <br>
        {{player.name}} | TotalScore : {{getScore(index)}}
        <table border="1">
          <tr>
            <td v-for="(fram,index) in player.frames" :key="index" >
                {{fram}}
            </td>
          </tr>
        </table>
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
        frames:[[8,'/'],[9,0],[4,4],[7,2],[9,0],['X'],['X'],[8,0],[3,5],[9,1,7]]
      },
      {

        name: 'Ali',
        frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],[8,0],[5,1],[3,'/'],[9,0,0]],
      }
    ],
    }
  },

  methods: {
    changeTurn(p){
      this.currentPlayer = p; 
    },

    updateScore(s){
      this.players[this.currentPlayer].frames.push(s)
    },

    getScore(index){
      let playerScore = this.players[index].frames;
      return this.calculateScore(playerScore);
    },

    calculateScore(frames){
      let finalScore = 0;
      frames.forEach(element => {
      });
      return finalScore;
    },

    calculeFrameScore(frame){
    
    }
  },
}
</script>
