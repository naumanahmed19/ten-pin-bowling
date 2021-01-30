<template>
  <ScoreBoard />
  <h3>Current Turn : {{players[currentPlayer].name}}</h3>
  <button @click="changeTurn(1)">Change Turn</button>
    <button @click="handleRestGame">Reset Game</button>
  <ul>
      <li v-for="(player,index) in players" :key="index">
        <br> <br> <br>
        {{player.name}} | TotalScore : {{getScore(index)}}
        <table border="1">
          <tr>
            <td v-for="(n, i) in 10" :key="i" >
              {{n}}
               <hr>
                {{player.frames[i]}}
                <hr>
                {{ player.faramScore[i]}}
                <!-- {{calculeFrameScore(player.frames,frame,index)}} -->
               
            </td>
          </tr>
        </table>
      </li>
  </ul>
</template>

<script>
import ScoreBoard from './ScoreBoard.vue';
import Score from  './Score';
export default {
  name: 'Game',
  components: {
    ScoreBoard
  },
  data() {
    return {
      currentPlayer : 0,
      previousValue: 0,
  
      players: [
      {
        name: 'Ahmad',
        frames: [['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X','X','X']],
        faramScore:[],
      },
      {

        name: 'Ali',
        frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],[8,0],[5,1],[3,'/'],[9,0,0]],
        faramScore:[],
        
      },
      
    ],
    }
  },

  methods: {

    handleRestGame(){
      this.players.forEach((fram,index)=>{
       this.players[index].frames = [];
         this.players[index].faramScore = [];
      });
    },


    changeTurn(p){
      this.currentPlayer = p; 
    },

    updateScore(s){
      this.players[this.currentPlayer].frames.push(s)
    },

    getScore(index){
      let {frames,faramScore} = this.players[index];
      return this.calculateScore(frames, faramScore);
    },

    calculateScore(frames,faramScore){
      let score = 0;
      let objScore = new Score();
      frames.forEach((frame,index) => {
        score += objScore.calculate(frames,frame,index);
        console.log('Index:',index, score);
        faramScore.push(score);
      });
      
      return score;
    },
    
  },
}
</script>
