<template>
  <div id="app">
    <div class="body">
      <div style="display: flex; justify-content: center; margin-top: 20px">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import "./static/css/bootstrap.min.css";

export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
