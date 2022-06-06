import Vue from 'vue'
import Vuex from 'vuex'
import audio from './audio'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backendUrl:process.env.VUE_APP_BACKEND_URL
  },
  getters:{

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    audio
  }
})
