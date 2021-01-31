<template>
    <div>
      <button @click="$emit('new')">Start New Game</button>
      <button @click="$emit('replay')">Replay Game</button>
    </div>
</template>

<script>

export default {
 emits: ["new",'replay'],        
    props:{
        throws:{
            type: Array,
            default: ()=>[],
        }
    },
    computed: {
    throwsLeft() {
      if (this.throws.length && this.throws[0] != "X") {
        return 11 - this.throws[0];
      }
      return 11;
    },
  
  },
}
</script>