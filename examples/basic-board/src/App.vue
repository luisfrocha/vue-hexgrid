<template>
  <div class="App">
    <h1>Basic example of HexGrid usage.</h1>
    <hex-grid width="1200" height="1000">
      <layout :size="{ x: 7, y: 7 }">
        <hexagon
          v-for="(hex, i) in hexagons"
          :key="i"
          :q="hex.q"
          :r="hex.r"
          :s="hex.s"
        ></hexagon>
      </layout>
    </hex-grid>
  </div>
</template>

<script>
import { HexGrid, Layout, Hexagon, GridGenerator } from "../../../src";

export default {
  name: "App",
  components: { HexGrid, Layout, Hexagon },
  data() {
    return { hexagons: GridGenerator.parallelogram(-2, 3, -2, 1) };
  }
};
</script>
<style lang="scss">
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
}

.App-header {
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
}

.App-intro {
  font-size: large;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
body {
  margin: 0;
  padding: 1em;
  font-family: sans-serif;
  background: #f0f0f0;
}

[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -moz-user-drag: element;
  -webkit-user-drag: element;
  -khtml-user-drag: element;
  user-drag: element;
}
svg g {
  fill: #3f51b5;
  fill-opacity: 0.6;
}
svg g:hover {
  fill-opacity: 1;
}
svg g:hover text {
  fill-opacity: 1;
}

svg g polygon {
  stroke: #3f51b5;
  stroke-width: 0.2;
  transition: fill-opacity 0.2s;
}
svg g text {
  font-size: 0.3em;
  fill: #ffffff;
  fill-opacity: 0.4;
  transition: fill-opacity 0.2s;
}
svg path {
  fill: none;
  stroke: hsl(60, 20%, 70%);
  stroke-width: 0.4em;
  stroke-opacity: 0.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
