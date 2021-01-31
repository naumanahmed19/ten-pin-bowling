<template>
  <ScoreBoard />
  {{ throws }}

  <GameControls
    v-if="isGameActive"
    @new="handleStartNewGame"
    @replay="handleResetGame"
  />

  <hr />

 
  <AddPlayersForm
    v-if="!isGameActive"
    @start="handleStartGame"
    @add="addPlayer"
    :players="players"
  />





  <div v-if="isGameActive && players.length">
    {{ players[currentPlayer] }}
    <h3>Current Turn : {{ players[currentPlayer].name }}</h3>

    <PlayerControls
      v-if="isGameActive && !isGameOver"
      :throws="throws"
      @click="handleThorw"
    />
  </div>
  <div v-if="isGameOver">Game Over</div>

  <div v-if="isGameActive && players.length">
    <ul>
      <li v-for="(player, index) in players" :key="index">
        <br />
        <br />
        <br />
        {{ player.name }} | Wins {{ player.wins }}
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
import AddPlayersForm from './AddPlayersForm.vue';
export default {
  name: "Game",
  components: {
    ScoreBoard,
    PlayerControls,
    GameControls,
    AddPlayersForm,
  },
  data() {
    return {
      isGameActive: false,
      isGameOver: false,
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
     * Starting a game with new players
     */
    handleStartGame() {
      this.isGameActive = true;
      this.isGameOver = false;
      this.throws = [];
    },

    /**
     * Starting a new game
     * Reset all players data
     */
    handleStartNewGame() {
      this.isGameActive = false;
      this.isGameOver = false;
      this.players = [];
      this.throws = [];
    },

    /**
     * Replay A Game with same players
     */
    handleResetGame() {
      this.throws = [];
      this.isGameOver = false;

      this.players.forEach((fram, index) => {
        this.players[index].frames = [];
        this.players[index].faramScore = [];
        this.players[index].frameCounter = [];
        this.players[index].fIndex = [];
      });
    },

    /**
     * Add New Player
     */
    addPlayer(name) {
      if (name) {
        this.players.push({
          name: name,
          frames: [],
          faramScore: [],
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
      let playerIndex;
      this.players.forEach((player, index) => {
        let playerScore = this.getPlayerScore(index);
        if (playerScore > highestScore) {
          highestScore = playerScore;
          playerIndex = index;
        }
      });

      this.players[playerIndex].wins++;
    },

    nextPlayerTurn() {
      this.checkGameStatus();
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
      } else {
        //on last frame
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
