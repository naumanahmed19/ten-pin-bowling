<template>
    <div>
        <button v-for="(n, i) in throwsLeft" :key="n" @click="$emit('click',i)">
              {{ i }}
    </button>
    </div>
</template>

<script>

export default {
 emits: ["click"],        
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