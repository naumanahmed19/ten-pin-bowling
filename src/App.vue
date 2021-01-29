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
            <td v-for="(frame,index) in player.frames" :key="index" >
                {{frame}}
                <hr>
                {{calculeFrameScore(frame)}}
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
      let score = 0;
      frames.forEach(frame => {
        score += this.calculeFrameScore(frame);
      });
      return score;
    },

    calculeFrameScore(frame){
      let s = 0;
      if(frame[0] == 'X'){
          s +=10;
          //Add Bouns
      }
      else if(frame[1] == '/'){
          s+=10;
           //Add Bouns
      }
      else{
        s += frame.reduce((a,b)=>a+b , 0);
      }
      return s;
    }
  },
}
</script>
