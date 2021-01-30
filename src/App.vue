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
    //frames: [['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X','X','X']],
      frames:[[8,'/'],[9,0],[4,4],[7,2],[9,0],['X'],['X'],[8,0],[3,5],[9,'/',7]],
     //frames: [['X'],['X'],['X'],[5,1],['X'],['X'],['X'],['X'],['X'],['X','X','X']],
        faramScore:[],
      },
      {

        name: 'Ali',
       frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],[8,0],[5,1],[3,'/'],[9,0,0]],
        //  frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],['X'],[8,0],[3,'/'],[9,0,0]],
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
    hasFrame(index){
      return typeof frames[index] !== 'undefined'
    },
    calculeFrameScore(frames,frame,index){
     
      let s = 0;
     // if(index == 10) return s;  //TODO: Check 
     
      if(frame.includes( 'X') && index == 8 ){

          s +=frames[index+1].reduce((a,b)=>this.format(a)+this.format(b) , 0) ; 

      }
     else if(frame.includes( 'X') &&  index < 9 ){ 
      
           s +=10 ; 
          
          // console.log('index',index , frames[index +1].includes('X'));
      

          if(typeof frames[index+1] !== 'undefined' && frames[index+1].includes('X')){
             s+=10;
              if(typeof frames[index+2] !== 'undefined'){
                if(frames[index+1].includes('X') && frames[index+2].includes('X')){
                  s+=10;
                }else{
                   s+= this.format(frames[index+2][0]);
                }
              }
           }else{
          s += frames[index+1].reduce((a,b)=>this.format(a)+this.format(b) , 0);
        }
      
        
        


          //Add Bouns
      } 
      else if(frame.includes( '/') && index < 9){ 
          s += 10 + this.spareBouns(frames,index);
      }
      else{
        /**
         * if last frame has spare 
         */
        if(frame.includes( '/')){
           let spareIndex = frame.indexOf('/');
           let f = frame.filter(s=>(s !=='/'));
           s+= 10- frame[spareIndex -1]; 
           s += f.reduce((a,b)=>this.format(a)+this.format(b) , 0);
        }else{
            s += frame.reduce((a,b)=>this.format(a)+this.format(b) , 0);
        } 
       
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
      if(v === '/') return 10;
      return v;
    }
  },
}
</script>
