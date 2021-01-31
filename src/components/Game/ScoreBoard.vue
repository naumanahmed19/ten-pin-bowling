<template>
  <div>
    <h1>ScoreBoard</h1>
    
      <hr>
      Total Score : {{total}}
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  computed:{
    frames(){
      return 10;
    }
  },
  data() {
    return {
      total: 0
    }
  },
  methods: {
    handleClick(n){
      console.log(n)
    }
  },
}
</script>
