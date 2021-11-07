<template>
  <div class="uno">
    <section>
      <div class="wrap wrap-pt">
        <h2 class="font-fruktur">Uno</h2>
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
    </section>
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
            <div class="span-9" :class="{ loser: player.score >= 500 }">
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
        <p>bar graph</p>
        <div class="axis">
          <div class="axis-points grid grid-24">
            <div class="span-4">0</div>
            <div class="span-4 self-center">
              {{ Math.floor(limitScore / 4) }}
            </div>
            <div class="span-8 self-center">
              {{ Math.floor(limitScore / 2) }}
            </div>
            <div class="span-4 self-center">
              {{ Math.floor(limitScore * 0.75) }}
            </div>
            <div class="span-4 self-end">{{ limitScore }}</div>
          </div>
          <div class="axis-line grid grid-24">
            <div class="span-6"></div>
            <div class="span-6"></div>
            <div class="span-6"></div>
            <div class="span-6"></div>
          </div>
        </div>
        <div class="lines">
          <div v-for="(player, idx) in players" :key="idx" class="score">
            <div class="player-name">
              <span>{{ player.name }}:</span>
              <span>{{ player.score }}</span>
            </div>
            <div class="score-line" :style="{ width: culcWidth(idx) }" />
          </div>
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
        // {
        //   name: "Vitaly",
        //   score: 450,
        //   scorePerRound: "",
        //   roundsResults: [60, 34, 124],
        // },
        // {
        //   name: "Sergey",
        //   score: 375,
        //   scorePerRound: "",
        //   roundsResults: [],
        // },
        // {
        //   name: "Michail",
        //   score: 250,
        //   scorePerRound: "",
        //   roundsResults: [],
        // },
        // {
        //   name: "David",
        //   score: 125,
        //   scorePerRound: "",
        //   roundsResults: [],
        // },
        // {
        //   name: "Lera",
        //   score: 150,
        //   scorePerRound: "",
        //   roundsResults: [],
        // },
      ],
      round: 1,
    };
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
        return;
      }
      return element.classList.add("error");
    },
    sum(idx) {
      if (isNaN(this.players[idx].scorePerRound) === false) {
        this.players[idx].score =
          this.players[idx].score + +this.players[idx].scorePerRound;
        this.players[idx].scorePerRound = "";
      }
    },
    sumAll() {
      for (let i = 0; i < this.players.length; i++) {
        if (isNaN(this.players[i].scorePerRound) === false) {
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
    culcWidth(idx) {
      if (this.players[idx].score >= 500) {
        return "100%";
      }
      return (this.players[idx].score / this.limitScore) * 100 + "%";
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

  .chart {
    p {
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 15px;
    }

    .axis {
      .axis-line {
        > div {
          border: #fff solid 2px;
          border-top: 0;
          border-left: 0;
          width: 100%;
          height: 5px;

          &:first-child {
            border: #fff solid 2px;
            border-top: 0;
          }
        }
      }
    }

    .lines {
      display: grid;
      grid-template-rows: auto;
      gap: 10px;
      margin: 15px 0;

      .score {
        width: 100%;

        .player-name {
          display: flex;
          gap: 10px;
        }

        .score-line {
          height: 20px;
          background-color: #408ad2;
        }
      }
    }
  }
}
</style>
