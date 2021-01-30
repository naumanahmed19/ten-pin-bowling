<template>
  <ScoreBoard />
  
  <button @click="handleStartNewGame">Start New Game</button>
  <button @click="handleResetGame">Replay Game</button>
  <hr>

  <div v-if="!isGameActive">
      Add Players:
  <input type="text" v-model="playerName" >
  <button @click="handleAddPlayer">Add Player</button>
  </div>


  <div v-if="!isGameActive && players.length">
  <ul>
      <li v-for="(player,index) in players" :key="index">
        {{player.name}} 
      </li>
  </ul>
  <button @click="handleStartGame">Start Game</button>
  </div>

  <div v-if="isGameActive &&  players.length">
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
   
  </div>
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
      isGameActive: false,
      playerName: '',
      currentPlayer : 0,
      previousValue: 0,
  
      players: [
      // {
      //   name: 'Ahmad',
      //   frames: [['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X','X','X']],
      //   faramScore:[],
      // },
      // {

      //   name: 'Ali',
      //   frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],[8,0],[5,1],[3,'/'],[9,0,0]],
      //   faramScore:[],
        
      // },

    ],
    }
  },

  methods: {
   
   /**
     * Starting a game
     */
    handleStartGame(){
      this.isGameActive = true;
    },

    /**
     * Starting a new game
     * Reset all players data
     */
    handleNewStartGame(){
      this.isGameActive = true;
      this.players = [];
    },

    /**
     * Add New Player
     */
    handleAddPlayer(){
      if(this.playerName){
        this.players.push({ 
        name: this.playerName,
        frames:[],
        faramScore:[],
      });
      }
    
      //reset field
      this.playerName ='';
    },

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
