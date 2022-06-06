<template>
  <div class="video">
    <video ref="video" :style="{'filter':'brightness('+opacity+')'}" @timeupdate="timeUpdate" loop autoplay muted :src="video">
    </video>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: "Background",
  data(){
    return{
      currentVideoTime:0,
      videoDuration:0,
    }
  },
  computed: {
    opacity(){
      let secondsLeft = this.$store.state.audio.duration-this.$store.state.audio.currentTime
      if (secondsLeft>15 && this.$store.state.audio.currentTime > 15){return 0.25}
      else if (this.$store.state.audio.currentTime < 15) {
        return (this.$store.state.audio.currentTime / 15 / 4)
      }
      else{
        return (0.6 * Math.floor(secondsLeft/15*100)/100) - 0.2
      }
    },
    currentTime() {
      return this.$store.state.audio.currentTime
    },
    isPlaying() {
      return this.$store.state.audio.isPlaying
    },
    video() {
      let currentSong = this.$store.getters['audio/currentSong']?.video
      if (currentSong) {
        return `${process.env.VUE_APP_BACKEND_URL}${currentSong}`
      }
      return `${process.env.VUE_APP_BACKEND_URL}/media/back.mp4`
    }
  },
  methods:{
    timeUpdate(){
      this.currentVideoTime=this.$refs.video.currentTime
      this.videoDuration=this.$refs.video.duration
    }
  },
  watch: {
    isPlaying(val) {
      // eslint-disable-next-line
      if (this.$store.getters['audio/currentSong']?.video || true) {
        if (val) {
          this.$refs.video.play()
        } else {
          this.$refs.video.pause()
        }
      }
    }
  },
  mounted() {
    eventBus.$on('updateCurrentTime', (time) => {
      this.$nextTick(() => {
        if (this.$refs.video) {
          this.$refs.video.currentTime = time
        }
      })
    })
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