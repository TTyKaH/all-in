<template>
  <div class="home">
    <div class="wrap wrap-py">
      <h1 class="other-font">All-in</h1>
      <p class="cta">Choose the game!</p>
      <div class="wrap"></div>
      <div class="line"></div>
      <div class="games">
        <router-link to="/uno" class="btn">Uno</router-link>
        <router-link to="/hat" class="btn">Hat</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.home {
  text-align: center;

  p {
    margin: 10px 0 15px;
  }

  .games {
    display: grid;
    gap: 20px;
    padding: 20px 0;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
