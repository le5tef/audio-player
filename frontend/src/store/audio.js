export default {
    namespaced: true,
    state: {
        currentTime: 0,
        currentSongId: null,
        songs: [],
        isPlaying: false,
        duration: null,
    },
    getters: {
        currentSong(state) {
            return state.songs[state.currentSongId]
        },
    },
    mutations:{
        setDuration: (state, duration) => state.duration = duration,
        setSongs(state,songs){
            state.songs = songs
        },
        shufflePlaylist(state) {
            let currentIndex = state.songs.length, randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex !== 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [state.songs[currentIndex], state.songs[randomIndex]] = [
                    state.songs[randomIndex], state.songs[currentIndex]];
            }
        },
        setCurrentSongId(state,val){
            state.currentSongId = val
        },
        setCurrentTime(state,val) {
            state.currentTime=val
        },
        setIsPlaying(state,val){
            state.isPlaying=val
        }
    },
    actions:{
        async fetchAllSongs({commit, rootState}) {
            const response = await fetch(`${rootState.backendUrl}/api/random`)
            commit('setSongs', await response.json())
            commit('shufflePlaylist')
            commit('setCurrentSongId',0)
        },
        next({state,commit}) {
            if (state.currentSongId < state.songs.length) {
                commit('setCurrentSongId', state.currentSongId+1)
            } else {
                commit('setCurrentSongId', 0)
            }
        },
        prev({state,commit}) {
            if (state.currentSongId > 0) {
                commit('setCurrentSongId', state.currentSongId-1)
            } else {
                commit('setCurrentSongId', state.songs.length)
            }
        },
    }

}
