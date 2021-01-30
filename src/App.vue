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
import ScoreBoard from './components/ScoreBoard.vue'
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
    hasFrame(frames, index){
      return typeof frames[index] !== 'undefined' && frames[index].includes('X');
    },
    calculeFrameScore(frames,frame,index){
      let s = 0;
      if(frame.includes( 'X') && index == 8 ){
          s += this.sum(frames[index+1]); 
      }
      else if(frame.includes( 'X') &&  index < 9 ){ 
          s += 10 + this.strikeBouns(frames,index); 
      } 
      else if(frame.includes( '/') && index < 9){ 
          s += 10 + this.spareBouns(frames,index);
      }
      else{
        s += this.caulculateLastFrame(frame);
      }
      return s;
    },

    sum(frame){
        return frame.reduce((a,b)=>this.format(a)+this.format(b) , 0);
    },

    

    caulculateLastFrame(frame){
      let s = 0;
        /**
         * if last frame has spare 
         */
        if(frame.includes( '/')){
           let spareIndex = frame.indexOf('/');
           let f = frame.filter(s=>(s !=='/'));
           s+= 10- frame[spareIndex -1]; 
           s += this.sum(f);
        }else{
            s += this.sum(frame);
        } 
      return s;  
    },
    
    spareBouns(frames,index){
        console.log(frames[index+1][0]);
      return this.format(frames[index+1][0]);
    },

     strikeBouns(frames,index){
        let s = 0;
       if(this.hasFrame(frames, index+1)){
             s+=10;
              if(typeof frames[index+2] !== 'undefined'){
                if(this.hasFrame(frames, index+1) && this.hasFrame(frames, index+2)){
                  s+=10;
                }else{
                   s+= this.format(frames[index+2][0]);
                }
              }
           }else{
             s += this.sum(frames[index+1]);
          }
          return s;
 
     // return this.calculeFrameScore(frames,frames[index+1], index+1);
     
    },

    format(v){
      if(v === 'X') return 10;
      if(v === '/') return 10;
      return v;
    }
  },
}
</script>
