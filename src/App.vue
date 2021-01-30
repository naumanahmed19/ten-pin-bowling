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
                {{ player.faramScore[index]}}
                <!-- {{calculeFrameScore(player.frames,frame,index)}} -->
               
            </td>
          </tr>
        </table>
      </li>
  </ul>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'
  var strike =0;
export default {
  name: 'App',
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
       // frames: [['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X','X','X']]
        frames:[[8,'/'],[9,0],[4,4],[7,2],[9,0],['X'],['X'],[8,0],[3,5],[9,1,7]],
        faramScore:[],
      },
      {

        name: 'Ali',
        frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],[8,0],[5,1],[3,'/'],[9,0,0]],
        faramScore:[],
        
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
      let {frames,faramScore} = this.players[index];
      return this.calculateScore(frames, faramScore);
    },

    calculateScore(frames,faramScore){
      let score = 0;
      frames.forEach((frame,index) => {
        score += this.calculeFrameScore(frames,frame,index);
        console.log('Index:',index, score);
         faramScore.push(score);
      });
      
      return score;
    },

    calculeFrameScore(frames,frame,index){
     
      let s = 0;
      if(index == 10) return s;
      if(frame.includes( 'X') ){ 
      
           s +=10 ; 
           s += this.strikeBouns(frames,index);   
 
             
          
          //Add Bouns
      }
      else if(frame.includes( '/')){ 
          s += 10 + this.spareBouns(frames,index);
      }
      else{
        s += frame.reduce((a,b)=>a+b , 0);
      }
      return s;
    },


    
    
    spareBouns(frames,index){
        console.log(frames[index+1][0]);
      return this.format(frames[index+1][0]);
    },

    strikeBouns(frames,index){
 
      return this.calculeFrameScore(frames,frames[index+1], index+1);
     
    },

    format(v){
      if(v === 'X') return 10;
      if(v === '/') return 10 - v;
      return v;
    }
  },
}
</script>
