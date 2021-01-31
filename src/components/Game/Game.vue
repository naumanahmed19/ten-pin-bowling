<template>
  <ScoreBoard />
  {{ throws }}

  <GameControls
    v-if="isGameActive"
    @new="handleStartNewGame"
    @replay="handleResetGame"
  />

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
    {{ players[currentPlayer] }}
    <h3>Current Turn : {{ players[currentPlayer].name }}</h3>

    <PlayerControls :throws="throws" @click="handleThorw" />
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
import PlayerControls from "./PlayerControls.vue";
import GameControls from "./GameControls.vue";
export default {
  name: "Game",
  components: {
    ScoreBoard,
    PlayerControls,
    GameControls,
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
          frameCounter: 0, //max 12
          fIndex: 0,
        });
      }

      //reset field
      this.playerName = "";
    },

    nextPlayerTurn() {
      //before next go to next player
      this.players[this.currentPlayer].fIndex++;

      console.log("move to next palyer");

      if (this.currentPlayer + 1 == this.players.length) {
        this.currentPlayer = 0;
      } else {
        this.currentPlayer++;
      }
      this.throws = [];
    },

    /**
     * Update frames with choices based on active player
     *
     */
    handleThorw(pins) {
      /**
       * Allow max 12 frames
       */

      let { frameCounter } = this.players[this.currentPlayer];
      if (frameCounter > 11) return;
      console.log("out-----------------", frameCounter);

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
    
      } else {
        if (pins == 10) {
          this.throws.push("X");
  
        } else if (this.throws.length && this.throws[0] + pins == 10) {
          this.throws.push("/");
       
        } else {
          this.throws.push(pins);
        }
      }
      this.nextupdatePlayerFrame();
    },
    isFrame(n) {
      return this.players[this.currentPlayer].frames.length == n;
    },
    nextupdatePlayerFrame() {
      let throws = [...this.throws];

      //push in frames - move to next frame - empty throws

      if (this.players[this.currentPlayer].fIndex < 9) {
        if (throws.includes("X")) {
          this.players[this.currentPlayer].frames.push(throws);

          this.players[this.currentPlayer].frameCounter++;

          this.nextPlayerTurn();
        } else {
          if (throws.length == 1) {
            this.players[this.currentPlayer].frames.push(throws);
          } else {

            let length = this.players[this.currentPlayer].frames.length;

            this.players[this.currentPlayer].frames[length - 1].push(throws[1]);

            this.players[this.currentPlayer].frameCounter++;

            this.nextPlayerTurn();
          }
        }
      } else { //on last frame
        if (typeof this.players[this.currentPlayer].frames[9] == "undefined") {
          this.players[this.currentPlayer].frames.push(throws);
          this.players[this.currentPlayer].frameCounter++;
          console.log("new value....");
        } else {
          this.players[this.currentPlayer].frames[9] = throws;
          this.players[this.currentPlayer].frameCounter++;
        }
      }

      
      /**
       * Update frames on every chagne
       */
      this.players[this.currentPlayer].faramScore = [];
      this.getScore(this.currentPlayer);


      /**
       * Switching player on last frame
       */
      if (this.players[this.currentPlayer].fIndex >= 9 && throws.length == 3) {
        this.nextPlayerTurn();
        this.getScore(this.currentPlayer);
      }
    },



    handleResetGame() {
      this.throws = [];

      this.players.forEach((fram, index) => {
        this.players[index].frames = [];
        this.players[index].faramScore = [];
        this.players[index].frameCounter = [];
        this.players[index].fIndex = [];
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
        faramScore.push(score);
      });

      return score;
    },
  },
};
</script>
