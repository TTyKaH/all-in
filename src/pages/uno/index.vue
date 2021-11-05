<template>
  <div class="uno">
    <div class="wrap wrap-py">
      <h2 class="other-font">Uno</h2>
      <div class="settings">
        <button class="btn">Set</button>
        <input type="text" placeholder="points limit" />
        <button class="btn">Add</button>
        <input type="text" placeholder="player name" />
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
    gap: 10px;
  }
}
</style>
