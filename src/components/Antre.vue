<template>
  <Frame>
    <Page @loaded="loaded" />
  </Frame>
</template>

<script>
import { $navigateTo } from "nativescript-vue";
import Home from "./Home.vue";

export default {
  methods: {
    loaded() {
      console.log("Antre loaded");
      $navigateTo(Home, { clearHistory: true });
    },
  },
};
</script>
