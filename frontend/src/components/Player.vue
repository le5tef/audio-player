<template>
  <v-container class="wrapper fill-height justify-center" fluid>
    <v-card class="player" :class="smallMode?'player--short':''" max-width="300">
      <div class="player__collapse">
        <v-btn @click="smallMode=!smallMode" icon>
          <v-icon color="pink lighten-1">
            {{ smallMode ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </div>
      <v-card-text v-show="!smallMode" class="player__artwork flex-column align-center">
        <img draggable="false" v-if="currentSong" width="250" height="250"
             :src="`${backendUrl}${currentSong.album.art}`" alt=""/>
        <div v-else class="player__artwork__skeleton d-flex justify-center align-center">LiL PEEP</div>
      </v-card-text>
      <v-divider v-show="!smallMode" class="mx-2"></v-divider>
      <v-card-text class="player__content d-flex flex-column pa-6">
        <div class="player__title">{{ currentSong ? currentSong.title : '' }}</div>
        <div class="player__artist">{{ currentSong ? currentSong.artist : '' }}</div>
        <div class="player__progress mb-4">
          <audio @volumechange="updateVolume" @loadedmetadata="updateDuration" @durationchange="updateDuration" @timeupdate="updateCurrentTime"
                 @play="isPlaying=true" @pause="isPlaying=false" @ended="next" ref="audio"
                 :src="currentSong?`${backendUrl}${currentSong.src}`:null"></audio>
          <v-slider hide-details @mousedown="startDrug" @mouseup="endDrug" @change="setDuration" color="pink lighten-1"
                    max="100" min="0" :value="progress"></v-slider>

          <div class="d-flex">
            {{ currentTimeFormatted }}
            <v-spacer/>
            {{ durationTimeFormatted }}
          </div>
        </div>
        <div class="player__controls d-flex justify-space-around ">
          <v-btn @click="prev" icon>
            <v-icon color="pink lighten-1" size="35">mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn icon @click="(isPlaying ? pause : play)()">
            <v-icon color="pink lighten-1" size="45">{{ isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle' }}</v-icon>
          </v-btn>
          <v-btn @click="next" icon>
            <v-icon color="pink lighten-1" size="35">mdi-skip-next</v-icon>
          </v-btn>
        </div>
        <div class="player__volume d-flex justify-space-around align-center mt-5">
          <v-icon color="pink lighten-1">mdi-volume-medium</v-icon>
          <v-slider @change="setVolume" max="100" min="0" :value="volume" color="pink lighten-1" hide-details ></v-slider>
          <v-icon color="pink lighten-1">mdi-volume-high</v-icon>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {eventBus} from '@/main'
export default {
  name: "Player",
  data() {
    return {
      smallMode: false,
      volume:0.5,
      isPlayed: false,
    }
  },
  computed: {
    duration: {
      get() { return this.$store.state.audio.duration},
      set(val) {
        this.$store.commit('audio/setDuration', val)
      }
    },
    backendUrl(){
      return process.env.VUE_APP_BACKEND_URL
    },
    progress() {
      if (!this.duration) return 0
      return (this.currentTime / this.duration) * 100
    },
    currentSong(){
      return this.$store.getters['audio/currentSong']
    },
    currentTime:{
      get(){
        return this.$store.state.audio.currentTime
      },
      set(val){
        this.$store.commit('audio/setCurrentTime',val)
      }
    },
    isPlaying:{
      get(){
        return this.$store.state.audio.isPlaying
      },
      set(val){
        this.$store.commit('audio/setIsPlaying',val)
      }
    },
    currentTimeFormatted() {
      return this.formatTime(this.currentTime)
    },
    durationTimeFormatted() {
      return this.formatTime(this.duration)
    },


  },
  mounted() {
    this.$store.dispatch('audio/fetchAllSongs');
    this.$nextTick(()=> {
      this.$refs.audio.volume = this.volume
    });
  },
  methods: {
    next() {
      this.$store.dispatch('audio/next');
      this.$nextTick(() => this.play())
    },
    prev() {
      this.$store.dispatch('audio/prev');
      this.$nextTick(() => this.play())
    },
    formatTime(secs) {
      let minutes = Math.floor(secs / 60)
      let seconds = Math.floor(secs % 60)
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    },
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },

    updateCurrentTime() {
      this.currentTime = this.$refs.audio.currentTime
    },
    updateDuration() {
      this.duration = this.$refs.audio.duration
    },
    setDuration(val) {
      this.$refs.audio.currentTime = val * this.duration / 100
      this.$nextTick(() => eventBus.$emit('updateCurrentTime', this.$refs.audio.currentTime))
    },
    setVolume(val) {
      this.$refs.audio.volume = val/100
      console.log(val)
    },
    updateVolume(){
      this.volume = this.$refs.audio.volume*100
    },

    startDrug() {
      this.pause()
    },
    endDrug() {
      this.play()
    },

  }
}
</script>

<style scoped>
.wrapper {
}

.player {
  background-color: rgba(0, 0, 0, 0.25) !important;
  transition: 300ms;
  width: 300px;
  position: relative;
}

.player--short {
  margin-top: calc(100vh);
  transform: translateY(-100%);
}

.player__title {
  font-size: 16px;
}

.player__artist {
  font-size: 14px;
}

.player__collapse {
  position: absolute;
  right: 30px;
  top: 22px;
  z-index: 999;
}

.player__content, .player__artwork {
  background-color: rgba(0, 0, 0, 0);
}

.player--short .player__collapse {
  right: 12px;
  top: 12px;
}

.player__artwork {
  display: flex;
}

.player__artwork__skeleton {
  width: 250px;
  height: 250px;
  background-color: rgba(138, 43, 226, 0.82);
}
</style>