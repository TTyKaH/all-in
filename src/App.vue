<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/header";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
</style>
