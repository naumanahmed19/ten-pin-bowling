<template>
  <GameControls
    v-if="isGameActive"
    @new="handleStartNewGame"
    @replay="handleResetGame"
  />

  <PlayersForm
    v-if="!isGameActive"
    @start="handleStartGame"
    @add="addPlayer"
    :players="players"
  />
  <PlayerControls
    v-if="isGameActive && !isGameOver && players.length"
    :throws="throws"
    :is-last-frame="players[this.currentPlayer].fIndex == 9"
    @click="handleThorw"
  />
  <Alert v-if="isGameOver && winner" title="Winner" :message="winner" />
  <ScoreBoard
    v-if="isGameActive && players.length"
    :players="players"
    :active-player="currentPlayer"
    :player-score="getPlayerScore"
  />
</template>

<script>
import ScoreBoard from "./Player/PlayerScoreBoard.vue";
import Score from "./Score";
import PlayerControls from "./Player/PlayerControls.vue";
import GameControls from "./GameControls.vue";
import PlayersForm from "./Player/PlayersForm.vue";
import Alert from "../Common/Alert.vue";
export default {
  name: "Game",
  components: {
    ScoreBoard,
    PlayerControls,
    GameControls,
    PlayersForm,
    Alert,
  },
  data() {
    return {
      isGameActive: false,
      isGameOver: false,
      currentPlayer: 0,
      winner: "",
      throws: [],
      players: [],
    };
  },

  methods: {
    /**
     * Starting a game with new players
     */
    handleStartGame() {
      this.isGameActive = true;
      this.reset();
    },

    /**
     * Starting a new game
     * Reset all players data
     */
    handleStartNewGame() {
      this.isGameActive = false;
      this.players = [];
      this.reset();
    },

    /**
     * Replay A Game with same players
     */
    handleResetGame() {
      this.reset();
      this.players.forEach((fram, index) => {
        let player = this.players[index];
        player.frames = [];
        player.frameScore = [];
        player.frameCounter = 0;
        player.fIndex = 0;
      });
    },

    /**
     * Common Reset
     */
    reset() {
      this.throws = [];
      this.isGameOver = false;
      this.winner = "";
    },

    /**
     * Add New Player
     */
    addPlayer(name) {
      if (name) {
        this.players.push({
          name: name,
          frames: [],
          frameScore: [],
          frameCounter: 0, //max 12
          fIndex: 0,
          wins: 0,
        });
      }
    },
    /**
     * Winner Selection
     */
    selectWinner() {
      let highestScore = 0;
      let winnerIndex = undefined;
      this.players.forEach((player, index) => {
        let playerScore = this.getPlayerScore(index);
        if (playerScore > highestScore) {
          highestScore = playerScore;
          winnerIndex = index;
          this.winner = player.name;
        }
      });

      if (winnerIndex !== "undefined") {
        this.winner = this.players[winnerIndex].name;
        this.players[winnerIndex].wins++;
      }
    },

    nextPlayerTurn() {
      this.checkGameStatus();
      //before go to next player
      this.players[this.currentPlayer].fIndex++;

      if (this.currentPlayer + 1 == this.players.length) {
        this.currentPlayer = 0;
      } else {
        this.currentPlayer++;
      }
      this.throws = [];
    },

    /**
     * Check if game is over
     *
     */
    checkGameStatus() {
      if (
        this.currentPlayer == this.players.length - 1 &&
        this.players[this.currentPlayer].frameCounter == 12
      ) {
        console.log("Game Over");
        this.isGameOver = true;
        this.selectWinner();
      }
    },

    /**
     * Update frames with choices based on active player
     *
     */
    handleThorw(pins) {
      let { frameCounter } = this.players[this.currentPlayer];
      if (frameCounter > 11) return; //Allow max 12 frames

      if (pins == 10) {
        this.throws.push("X");
      } else if (this.throws.length && this.throws[0] + pins == 10) {
        this.throws.push("/");
      } else {
        this.throws.push(pins);
      }
      this.updatePlayerFrame();
    },

    updatePlayerFrame() {
      let throws = [...this.throws];

      //push in frames - move to next frame - empty throws

      if (this.players[this.currentPlayer].fIndex < 9) {
        if (throws.includes("X")) {
          this.players[this.currentPlayer].frames.push(throws);

          this.players[this.currentPlayer].frameCounter++;
        } else {
          if (throws.length == 1) {
            this.players[this.currentPlayer].frames.push(throws);
          } else {
            let length = this.players[this.currentPlayer].frames.length;

            this.players[this.currentPlayer].frames[length - 1].push(throws[1]);

            this.players[this.currentPlayer].frameCounter++;
           // this.nextPlayerTurn();
           

          }
        }
      } else {

        //on last frame
        if (typeof this.players[this.currentPlayer].frames[9] == "undefined") {
          this.players[this.currentPlayer].frames.push(throws);
          this.players[this.currentPlayer].frameCounter++;
        } else {
          this.players[this.currentPlayer].frames[9] = throws;
          this.players[this.currentPlayer].frameCounter++;
        }
      }

      /**
       * Update frames on every chagne
       */
     
      if (this.players[this.currentPlayer].fIndex >= 9 && throws.length < 3) {
         
        this.getScore(this.currentPlayer);
      }
      else if (this.players[this.currentPlayer].fIndex < 9 && throws.length < 2 && !throws.includes("X") ){
          this.players[this.currentPlayer].frameScore = [];
          this.getScore(this.currentPlayer);
      }else{
          this.players[this.currentPlayer].frameScore = [];
          this.getScore(this.currentPlayer);
          this.nextPlayerTurn();
      }

    },

    getPlayerScore(index) {
      let { frameScore } = this.players[index];
      return frameScore.length ? frameScore[frameScore.length - 1] : 0;
    },

    getScore(index) {
      let { frames, frameScore } = this.players[index];
      return this.calculateScore(frames, frameScore);
    },

    calculateScore(frames, frameScore) {
      let score = 0;
      let objScore = new Score();
      frames.forEach((frame, index) => {
        score += objScore.calculate(frames, frame, index);
        frameScore.push(score);
      });
      return score;
    },
  },
};
</script>
