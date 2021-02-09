 class Score{
    
      calculate(frames,frame,index){
        let s = 0;
        if(frame.includes( 'X') && index == 8 ){
            s += this._sum(frames[index+1]); 
        }
        else if(frame.includes( 'X') &&  index < 9 ){ 
            s += 10 + this._strikeBouns(frames,index); 
        } 
        else if(frame.includes( '/') && index < 9){ 
            s += 10 + this._spareBouns(frames,index);
        }
        else{
          s += this._caulculateFrame(frame);
        }
        return s;
      }


      _hasFrame(frames, index){
        return typeof frames[index] !== 'undefined' && frames[index].includes('X');
      }

      _sum(frame){
          return frame ? frame.reduce((a,b)=>this._format(a)+this._format(b) , 0) : 0;
      }
  
      _caulculateFrame(frame){
        let s = 0;
          /**
           * if frame has spare 
           */
          if(frame.includes( '/')){
             let spareIndex = frame.indexOf('/');
             let f = frame.filter(s=>(s !=='/'));
             s+= 10- frame[spareIndex -1]; 
             s += this._sum(f);
          }else{
              s += this._sum(frame);
          } 
        return s;  
      }
      
      _spareBouns(frames,index){
        if(frames[index+1] && frames[index+1][0]){
          return this._format(frames[index+1][0]);
        }
        return 0;
      }
  
       _strikeBouns(frames,index){
          let s = 0;
         if(this._hasFrame(frames, index+1)){
               s+=10;
                if(typeof frames[index+2] !== 'undefined'){
                  if(this._hasFrame(frames, index+1) && this._hasFrame(frames, index+2)){
                    s+=10;
                  }else{
                     s+= this._format(frames[index+2][0]);
                  }
                }
             }else{
               s += this._sum(frames[index+1]);
            }
            return s;
      }
      _format(v){
        if(v === 'X' || v === '/') return 10;
        return v;
      }
}

export default Score; 