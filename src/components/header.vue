<template>
  <div class="header">
    <div class="wrap">
      <router-link to="/" class="other-font">
        <!-- <img src="#" alt="logo" /> -->
        ALL-IN
      </router-link>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/uno">Uno</router-link>
        <router-link to="/hat">Hat</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  padding: 10px 0;

  .wrap {
    display: flex;
    justify-content: space-between;

    nav {
      display: flex;
      gap: 5px;
      font-weight: 600;
    }
  }
}
</style>
