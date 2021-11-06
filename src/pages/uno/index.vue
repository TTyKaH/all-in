<template>
  <div class="uno">
    <div class="wrap wrap-pt">
      <h2 class="other-font">Uno</h2>
      <div class="settings">
        <button class="btn btn-small" @click="set()">Set</button>
        <input
          id="newLimitScore"
          type="text"
          placeholder="endgame score (500 st.)"
          v-model="newLimitScore"
        />
        <button class="btn btn-small" @click="add()">Add</button>
        <input
          id="newPlayer"
          type="text"
          placeholder="player name"
          v-model="newPlayer"
        />
      </div>
      <div class="line line-mt"></div>
    </div>
    <div v-if="players" class="wrap wrap-pt">
      <div class="table">
        <div class="table-head grid-24">
          <div class="span-9">Player Name</div>
          <div class="span-4">Score</div>
          <div class="span-7 self-center">per Round</div>
          <div class="span-4"></div>
        </div>
        <div class="table-body">
          <div
            v-for="(player, idx) in players"
            :key="idx"
            class="table-row grid-24"
          >
            <div class="span-9" :class="{ error: player.score >= 500 }">
              {{ player.name }}
            </div>
            <div class="span-4">{{ player.score }}</div>
            <input
              type="text"
              class="span-7"
              v-model="players[idx].scorePerRound"
            />
            <div class="span-4 btn btn-small" @click="sum(idx)">+</div>
          </div>
        </div>
      </div>
      <div class="sum-all grid grid-24">
        <div class="span-20"></div>
        <div class="span-4 btn btn-small" @click="sumAll()">Σ+</div>
      </div>
      <div class="endgameScore">
        <div>Endgame Score:</div>
        <div>{{ limitScore }}</div>
      </div>
      <div class="roundsCount grid grid-12">
        <button class="span-5 btn btn-small" @click="prev()">prev round</button>
        <div class="span-2">{{ round }}</div>
        <button class="span-5 btn btn-small" @click="next()">next round</button>
      </div>
    </div>
    <div class="wrap wrap-pb">
      <div class="line line-my"></div>
      <div class="chart">
        <div class="horizontal-line"></div>
        <div class="column">
          <div class="player-name">5</div>
          <div class="score-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newLimitScore: "",
      limitScore: 500,
      newPlayer: "",
      players: [
        {
          name: "Vitaly",
          score: 400,
          scorePerRound: "",
          roundsResults: [],
        },
        {
          name: "Sergey",
          score: 100,
          scorePerRound: "",
          roundsResults: [],
        },
        {
          name: "Michail",
          score: 100,
          scorePerRound: "",
          roundsResults: [],
        },
        {
          name: "David",
          score: 100,
          scorePerRound: "",
          roundsResults: [],
        },
        {
          name: "Lera",
          score: 100,
          scorePerRound: "",
          roundsResults: [],
        },
      ],
      round: 1,
    };
  },
  mounted() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].score >= 500) {
        console.log("Limit reached!");
        return (this.loser = i);
      }
    }
  },
  methods: {
    set() {
      // Сделать всплывающее окно с небольшими пояснениями по ограничениям и правилам
      let element = document.getElementById("newLimitScore");
      if (this.newLimitScore >= 300 && this.newLimitScore < 1000) {
        element.classList.remove("error");
        return (this.limitScore = this.newLimitScore);
      }
      return element.classList.add("error");
    },
    add() {
      let element = document.getElementById("newPlayer");
      if (this.newPlayer.length <= 12) {
        element.classList.remove("error");
        this.players.push({
          name: this.newPlayer,
          score: 0,
          scorePerRound: "",
          roundsResults: [],
        });
      }
      return element.classList.add("error");
    },
    sum(idx) {
      if (
        typeof Number(this.players[idx].scorePerRound) == "number" &&
        typeof this.players[idx].scorePerRound !== "string"
      ) {
        this.players[idx].score =
          this.players[idx].score + Number(this.players[idx].scorePerRound);
        this.players[idx].scorePerRound = "";
      }
    },
    sumAll() {
      for (let i = 0; i < this.players.length; i++) {
        if (
          typeof Number(this.players[i].scorePerRound) === "number" &&
          typeof this.players[i].scorePerRound !== "string"
        ) {
          this.players[i].score =
            this.players[i].score + Number(this.players[i].scorePerRound);
          this.players[i].scorePerRound = "";
        }
      }
    },
    prev() {
      if (this.round > 1) {
        this.round--;
      }
    },
    next() {
      this.round++;
    },
  },
};
</script>

<style lang="scss">
.uno {
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  .settings {
    display: grid;
    grid-template: 1fr 1fr / 1fr 3fr;
    gap: 15px 10px;
  }

  .sum-all {
    margin-top: 10px;
    gap: 10px;
  }

  .endgameScore {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

  .roundsCount {
    gap: 10px;

    > div {
      text-align: center;
      border-radius: 3px;
    }
  }
}
</style>
