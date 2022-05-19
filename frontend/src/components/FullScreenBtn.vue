<template>
  <div class="wrapper">
    <v-btn icon @click="toggleMode()">
      <v-icon color="white">{{ isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "FullScreenBtn",
  data() {
    return {
      isFullScreen: false,
    }
  },
  methods: {
    toggleMode() {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        document.body.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }
}
</script>

<style scoped>
.wrapper {

  position: absolute;
  top: 0;
  right: 25px;
  background-color: rgba(236, 64, 122, 0.5);
  padding: 10px;
  border-bottom-left-radius: 35%;
  border-bottom-right-radius: 35%;
}

</style>