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
        <input type="text" placeholder="player name" v-model="newPlayer" />
      </div>
      <div class="line line-mt"></div>
    </div>
    <div class="wrap wrap-pt">
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
            <div class="span-9">{{ player.name }}</div>
            <div class="span-4">{{ player.score }}</div>
            <input
              type="text"
              class="span-7"
              v-model="players[idx].scorePerRound"
            />
            <div class="span-4 btn btn-small" @click="plus(idx)">+</div>
          </div>
        </div>
      </div>
      <div class="endgameScore">
        <div>Endgame Score:</div>
        <div>{{ limitScore }}</div>
      </div>
      <div class="line line-mt"></div>
    </div>
    <div class="wrap wrap-py">
      <div class="chart">
        <div class="horizontal-line"></div>
        <div class="column">
          <div class="player-name"></div>
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
          score: 100,
          scorePerRound: 0,
          roundsResults: [],
        },
        {
          name: "Sergey",
          score: 100,
          scorePerRound: 0,
          roundsResults: [],
        },
        {
          name: "Michail",
          score: 100,
          scorePerRound: 0,
          roundsResults: [],
        },
      ],
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
      this.players.push({
        name: this.newPlayer,
        score: 0,
        scorePerRound: 0,
        // возможно нужен счетчик раундов, чтобы кто-то контролировал раунды (это на
        // случай, если за один раунд игроку будет проводится несколько операций суммирования)
        roundsResults: [],
      });
    },
    plus(idx) {
      this.players[idx].score =
        this.players[idx].score + Number(this.players[idx].scorePerRound);
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

  .endgameScore {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
}
</style>
