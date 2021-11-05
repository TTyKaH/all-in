<template>
  <div class="uno">
    <div class="wrap wrap-pt">
      <h2 class="other-font">Uno</h2>
      <div class="settings">
        <button class="btn">Set</button>
        <input type="text" placeholder="points limit (500 st.)" />
        <button class="btn">Add</button>
        <input type="text" placeholder="player name" />
      </div>
      <div class="line line-mt"></div>
    </div>
    <div class="wrap wrap-pt">
      <div class="table">
        <div class="table-head grid-24">
          <div class="span-9">Player Name</div>
          <div class="span-4">Score</div>
          <div class="span-7">per Round</div>
          <div class="span-4"></div>
        </div>
        <div class="table-body">
          <div class="table-row grid-24">
            <div class="span-9">Vitaly</div>
            <div class="span-4">0</div>
            <input type="text" class="span-7" />
            <div class="span-4 btn btn-small">Add</div>
          </div>
          <div class="table-row grid-24">
            <div class="span-9">Sergey</div>
            <div class="span-4">24</div>
            <input type="text" class="span-7" />
            <div class="span-4 btn btn-small">Add</div>
          </div>
          <div class="table-row grid-24">
            <div class="span-9">Michail</div>
            <div class="span-4">300</div>
            <input type="text" class="span-7" />
            <div class="span-4 btn btn-small">Add</div>
          </div>
        </div>
      </div>
      <div class="line line-mt"></div>
    </div>
    <div class="wrap wrap-pt">
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
export default {};
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
}
</style>
