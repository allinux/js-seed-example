<template>
  <div id="app"><encryptComp /> <decryptComp /></div>
</template>

<script>
import encryptComp from "./components/seedEncTest";
import decryptComp from "./components/seedDecTest";

export default {
  name: "App",
  components: {
    encryptComp,
    decryptComp
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
