<template>
  <div id="app">
    <h1>You Need This!</h1>
    <v-card>
      <v-tabs bg-color="teal-darken-3" slider-color="teal-lighten-3" show-arrows>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/image-processor">水印二向箔</v-tab>
      </v-tabs>
    </v-card>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
