<template>
  <v-app>
    <v-app-bar color="primary" style="height: 70px" flat>
      <div style="display: flex; flex-direction: column;margin:0 auto;">
        <h1 style="margin-top: -10px;">2023 Singing Contest</h1>
        <p style="font-weight: lighter;font-size: 12px;margin-top: -18px;">Powered by HKUPootal</p>
      </div>
    </v-app-bar>
    <v-sheet style="margin-top: 70px">
      <router-view />
    </v-sheet>
  </v-app>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin: auto;
  text-align: center;
}
</style>
