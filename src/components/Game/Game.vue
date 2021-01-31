<template>
  <ScoreBoard />
  {{ throws }}
  <div v-if="isGameActive">
    <button @click="handleStartNewGame">Start New Game</button>
    <button @click="handleResetGame">Replay Game</button>
  </div>

  <hr />

  <div v-if="!isGameActive">
    Add Players:
    <input type="text" v-model="playerName" />
    <button @click="handleAddPlayer">Add Player</button>
  </div>

  <div v-if="!isGameActive && players.length">
    <ul>
      <li v-for="(player, index) in players" :key="index">
        {{ player.name }}
      </li>
    </ul>
    <button @click="handleStartGame">Start Game</button>
  </div>

  <div v-if="isGameActive && players.length">
    <h3>Current Turn : {{ players[currentPlayer].name }}</h3>
    <button @click="changeTurn(1)">Change Turn</button>

    <button v-for="(n, i) in throwsLeft" :key="n" @click="handleThorw(i)">
      {{ i }}
    </button>

    <ul v-if="players.length">
      <li v-for="(player, index) in players" :key="index">
        <br />
        <br />
        <br />
        {{ player.name }} |
        <table border="1">
          <tr>
            <td v-for="(n, i) in 10" :key="i">
              {{ n }}
              <hr />
              {{ player.frames[i] }}
              <hr />
              {{ player.faramScore[i] }}
              <!-- {{calculeFrameScore(player.frames,frame,index)}} -->
            </td>
            <td>
              Total
              {{ getPlayerScore(index) }}
            </td>
          </tr>
        </table>
        {{ player.frames.length }}
        {{ player.faramScore.length }}
      </li>
    </ul>
  </div>
</template>

<script>
import ScoreBoard from "./ScoreBoard.vue";
import Score from "./Score";
export default {
  name: "Game",
  components: {
    ScoreBoard,
  },
  data() {
    return {
      isGameActive: false,
      playerName: "",
      currentPlayer: 0,
      previousValue: 0,
      activeFrameIndex: 0,
      throws: [],

      players: [
        // {
        //   name: 'Ahmad',
        //   frames: [['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X'],['X','X','X']],
        //   faramScore:[],
        //   frameCounter: 0,
        // },
        // {
        //   name: 'Ali',
        //   frames:[[8,0],[7,0],[5,3],[9,'/'],[9,'/'],['X'],[8,0],[5,1],[3,'/'],[9,0,0]],
        //   faramScore:[],
        //  frameCounter: 0,
        // },
      ],
    };
  },

  computed: {
    throwsLeft() {
      if (this.throws.length && this.throws[0] != "X") {
        return 11 - this.throws[0];
      }
      return 11;
    },
  },

  methods: {
    /**
     * Starting a game
     */
    handleStartGame() {
      this.isGameActive = true;
      this.throws = [];
    },

    /**
     * Starting a new game
     * Reset all players data
     */
    handleStartNewGame() {
      this.isGameActive = false;
      this.players = [];
      this.throws = [];
    },

    /**
     * Add New Player
     */
    handleAddPlayer() {
      if (this.playerName) {
        this.players.push({
          name: this.playerName,
          frames: [],
          faramScore: [],
          frameCounter: 0,
        });
      }

      //reset field
      this.playerName = "";
    },

    /**
     * Update frames with choices based on active player
     *
     */
    handleThorw(pins) {
      /**
       * Allow max 12 frames
       */
      this.players[this.currentPlayer].frameCounter++;
      let { frameCounter } = this.players[this.currentPlayer];
      if (frameCounter > 12) return;

      if (
        this.isFrame(9) ||
        this.isFrame(10) ||
        this.isFrame(11) ||
        this.isFrame(12)
      ) {
        if (pins == 10) {
          this.throws.push("X");
        } else if (this.throws[0] + pins == 10) {
          this.throws.push("/");
        } else {
          this.throws.push(pins);
        }
        this.updatePlayerFrame();
      } else {
        if (pins == 10) {
          this.throws.push("X");
          this.updatePlayerFrame();
        } else if (this.throws.length && this.throws[0] + pins == 10) {
          this.throws.push("/");
          this.updatePlayerFrame();
        } else {
          this.throws.push(pins);
          if (this.throws.length == 2) {
            this.updatePlayerFrame();
          }
        }
      }
    },
    isFrame(n) {
      return this.players[this.currentPlayer].frames.length == n;
    },

    updatePlayerFrame() {
      if (this.activeFrameIndex == 10) {
        this.players[this.currentPlayer].frames[9] = this.throws;
      } else {
        this.players[this.currentPlayer].frames.push(this.throws);
        if (this.activeFrameIndex < 9) this.throws = [];
        this.activeFrameIndex++;
      }
      this.players[this.currentPlayer].faramScore = [];
      this.getScore(this.currentPlayer);
    },

    updateActivePlayer(p) {
      this.currentPlayer = p;
    },

    handleResetGame() {
      this.throws = [];

      this.players.forEach((fram, index) => {
        this.players[index].frames = [];
        this.players[index].faramScore = [];
      });
    },

    getPlayerScore(index) {
      let { faramScore } = this.players[index];
      return faramScore.length ? faramScore[faramScore.length - 1] : 0;
    },

    getScore(index) {
      let { frames, faramScore } = this.players[index];
      return this.calculateScore(frames, faramScore);
    },

    calculateScore(frames, faramScore) {
      let score = 0;
      let objScore = new Score();
      frames.forEach((frame, index) => {
        score += objScore.calculate(frames, frame, index);

        console.log(score, "socore is ....");
        console.log(this.throws.length);
        faramScore.push(score);
      });

      return score;
    },
  },
};
</script>
