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
        <div class="table-head">
          <div class="span-4">Player Name</div>
          <div class="span-8">Score</div>
        </div>
        <div class="table-body"></div>
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
