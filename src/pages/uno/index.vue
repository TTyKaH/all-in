<template>
  <div class="uno">
    <section id="settings-field">
      <div class="wrap wrap-pt">
        <h2 class="font-fruktur">Uno</h2>
        <!-- TODO: сделать настройки не видимыми по нажатию ко=нопки старт
        но добавить кнопку "настройки", на случай необхордимости добавить игрока -->
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
    <section id="action-field">
      <div class="wrap wrap-pt">
        <div v-if="!players.length" class="note">
          Add players to get started!
        </div>
        <div v-else>
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
            <button class="span-5 btn btn-small" @click="prev()">
              prev round
            </button>
            <div class="span-2">{{ round }}</div>
            <button class="span-5 btn btn-small" @click="next()">
              next round
            </button>
          </div>
        </div>
      </div>
    </section>
    <section id="statistic">
      <div class="wrap wrap-pb">
        <div class="line line-my"></div>
        <div class="chart">
          <p>bar graph</p>
          <div class="axis">
            <div class="axis-points grid grid-24">
              <div class="span-4">0</div>
              <div class="span-4 self-center">
                {{ Math.floor(limitScore * 0.25) }}
              </div>
              <div class="span-8 self-center">
                {{ Math.floor(limitScore * 0.5) }}
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
                <span>{{ culcScoreAtChoosenRound(idx) }}</span>
              </div>
              <div
                class="score-line"
                :class="{
                  'loser-bg': culcScoreAtChoosenRound(idx) >= limitScore,
                }"
                :style="{ width: player.lineWidth }"
              />
            </div>
          </div>
        </div>
        <div v-if="!players.length" class="note">
          Here you will see your score!
        </div>
        <div v-else class="grid">
          <div class="roundsCount grid grid-12">
            <button class="span-5 btn btn-small" @click="prev()">
              prev round
            </button>
            <div class="span-2">{{ round }}</div>
            <button class="span-5 btn btn-small" @click="next()">
              next round
            </button>
          </div>
          <button class="btn btn-small" @click="clear()">Clear Game</button>
        </div>
      </div>
    </section>
    <section id="feedback">
      <div class="wrap wrap-pb">
        <div class="line line-mb"></div>
        <div class="feedback">
          <p>For feedback:</p>
          <p>some@some.com</p>
        </div>
      </div>
    </section>
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
          score: 0,
          scorePerRound: "",
          roundsResults: [],
          lineWidth: "",
        },
        {
          name: "Sergey",
          score: 0,
          scorePerRound: "",
          roundsResults: [],
          lineWidth: "",
        },
        {
          name: "Michail",
          score: 0,
          scorePerRound: "",
          roundsResults: [],
          lineWidth: "",
        },
        {
          name: "David",
          score: 0,
          scorePerRound: "",
          roundsResults: [],
          lineWidth: "",
        },
        {
          name: "Lera",
          score: 0,
          scorePerRound: "",
          roundsResults: [],
          lineWidth: "",
        },
      ],
      round: 1,
      lastRound: "",
    };
  },
  created() {
    this.culcWidth();
  },
  methods: {
    set() {
      // Сделать всплывающее окно с небольшими пояснениями по ограничениям и правилам
      let element = document.getElementById("newLimitScore");
      if (this.newLimitScore >= 300 && this.newLimitScore <= 1000) {
        element.classList.remove("error");
        this.limitScore = this.newLimitScore;
        this.culcWidth();
        return (this.newLimitScore = "");
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
          lineWidth: "",
        });
        this.newPlayer = "";
        this.culcWidth();
        return;
      }
      return element.classList.add("error");
    },
    sum(idx) {
      if (isNaN(this.players[idx].scorePerRound) === false) {
        this.players[idx].score =
          this.players[idx].score + +this.players[idx].scorePerRound;

        if (isNaN(this.players[idx].roundsResults[this.round - 1])) {
          this.players[idx].roundsResults[this.round - 1] = 0;
        }
        this.players[idx].roundsResults[this.round - 1] =
          this.players[idx].roundsResults[this.round - 1] +
          +this.players[idx].scorePerRound;

        this.checkLosers(idx);

        this.players[idx].scorePerRound = "";
      }
      this.culcWidth();
    },
    sumAll() {
      for (let i = 0; i < this.players.length; i++) {
        if (isNaN(this.players[i].scorePerRound) === false) {
          this.players[i].score =
            this.players[i].score + Number(this.players[i].scorePerRound);

          if (isNaN(this.players[i].roundsResults[this.round - 1])) {
            this.players[i].roundsResults[this.round - 1] = 0;
          }
          this.players[i].roundsResults[this.round - 1] =
            this.players[i].roundsResults[this.round - 1] +
            +this.players[i].scorePerRound;

          this.checkLosers(i);

          this.players[i].scorePerRound = "";
        }
      }
      this.culcWidth();
    },
    prev() {
      if (this.round > 1) {
        this.round--;
        this.culcWidth();
      }
    },
    next() {
      if (this.round !== this.lastRound) {
        this.round++;
        this.culcWidth();
      }
    },
    checkLosers(idx) {
      if (this.players[idx].score >= this.limitScore) {
        this.lastRound = this.round;
      }
    },
    culcWidth() {
      // описать функции через переменные
      if (this.players.length === 0) return;
      for (let i = 0; i < this.players.length; i++) {
        let scoreAtChosenRound = 0;
        // подсчет числителя
        for (let j = 0; j < this.round; j++) {
          if (isNaN(this.players[i].roundsResults[j])) {
            this.players[i].roundsResults[j] = 0;
          }
          scoreAtChosenRound =
            scoreAtChosenRound + this.players[i].roundsResults[j];
        }
        // расчет процентажа
        if (scoreAtChosenRound <= this.limitScore) {
          console.log(
            `player ${i} -`,
            (scoreAtChosenRound / this.limitScore) * 100 + "%"
          );
          this.players[i].lineWidth =
            (scoreAtChosenRound / this.limitScore) * 100 + "%";
        } else {
          this.players[i].lineWidth = "100%";
        }
      }
    },
    culcScoreAtChoosenRound(idx) {
      // сделать функцию контекстной, цикл применять по факту
      let scoreAtChosenRound = 0;
      for (let i = 0; i < this.round; i++) {
        if (typeof this.players[idx].roundsResults[i] === "number") {
          scoreAtChosenRound =
            scoreAtChosenRound + this.players[idx].roundsResults[i];
        }
      }
      return scoreAtChosenRound;
    },
    clear() {
      this.round = 1;
      this.players = [];
      this.lastRound = "";
    },
  },
};
</script>

<style lang="scss">
.uno {
  // TODO: 0a4f94
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  #settings-field {
    .settings {
      display: grid;
      grid-template: 1fr 1fr / 1fr 3fr;
      gap: 15px 10px;
    }
  }

  #action-field {
    .sum-all {
      margin-top: 10px;
      gap: 10px;
    }

    .endgameScore {
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
    }
  }

  #statistic {
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

  .roundsCount {
    gap: 10px;
    margin-bottom: 15px;

    > div {
      text-align: center;
      border-radius: 3px;
    }
  }

  #feedback {
    .feedback {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
