<template>
  <div class="video">
    <video loop autoplay muted>
      <source :src="video">
    </video>
  </div>
</template>

<script>
export default {
  name: "Background",
  computed: {
    video() {
      return `${process.env.VUE_APP_BACKEND_URL}/media/back.mp4`
    }
  }
}
</script>

<style scoped>
video {
  filter: brightness(0.25);
  z-index: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);

}
</style>