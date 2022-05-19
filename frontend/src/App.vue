<template>
  <v-app>
    <v-main>
      <Background/>
      <Player/>
      <FullScreenBtn/>
    </v-main>
  </v-app>
</template>

<script>

import Player from "./components/Player";
import Background from "@/components/Background";
import FullScreenBtn from "@/components/FullScreenBtn";

export default {
  name: 'App',

  components: {
    FullScreenBtn,
    Background,
    Player
  },

  data: () => ({
    //
  }),
};
</script>
