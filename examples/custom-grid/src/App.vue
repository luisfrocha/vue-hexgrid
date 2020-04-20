<template>
  <div class="App">
    <h2>Vue Hexgrid v1</h2>
    <p>
      Constructing Hexgrid with component-based approach with custom SVG
      elements.
    </p>
    <hex-grid width="1200" height="800" viewBox="-50 -50 100 100">
      {{/* Main grid with bit hexagons, all manual */}}
      <layout :size="hexagonSize" :flat="true" :spacing="1.1" :origin="{ x: 0, y: 0 }">
        <hexagon :q="0" :r="0" :s="0" />
        {{/* Using pattern (defined below) to fill the hexagon */}}
        <hexagon :q="0" :r="-1" :s="1" fill="pat-1" />
        <hexagon :q="0" :r="1" :s="-1" />
        <hexagon :q="1" :r="-1" :s="0">
          <text-component>1, -1, 0</text-component>
        </hexagon>
        <hexagon :q="1" :r="0" :s="-1">
          <text-component>1, 0, -1</text-component>
        </hexagon>
        {{/* Pattern and text */}}
        <hexagon :q="-1" :r="1" :s="0" fill="pat-2">
          <text-component>-1, 1, 0</text-component>
        </hexagon>
        <hexagon :q="-1" :r="0" :s="1" />
        <hexagon :q="-2" :r="0" :s="1" />
        <path-component :start="generateHex(0, 0, 0)" :end="generateHex(-2, 0, 1)" />
      </layout>
      {{/* Additional small grid, hexagons generated with generator */}}
      <layout :size="{ x: 2, y: 2 }" :origin="{ x: 50, y: -30 }">
        <hexagon v-for="(hex, i) in moreHexas" :key="i" :q="hex.q" :r="hex.r" :s="hex.s" />
      </layout>
      {{/* You can define multiple patterns and switch between them with "fill" prop on Hexagon */}}
      <pattern-component
        id="pat-1"
        link="http://lorempixel.com/400/400/cats/1/"
        :size="hexagonSize"
      />
      <pattern-component
        id="pat-2"
        link="http://lorempixel.com/400/400/cats/2/"
        :size="hexagonSize"
      />
      <g>
        <circle cx="50" cy="0" r="10" />
        <circle cx="50" cy="10" r="8" />
        <circle cx="45" cy="20" r="6" />
      </g>
    </hex-grid>
  </div>
</template>
<script>
  import {
    GridGenerator,
    HexGrid,
    Layout,
    Path,
    Hexagon,
    Text,
    Pattern,
    Hex,
  } from 'vue-hexgrid';

  export default {
    name: 'App',
    components: {
      HexGrid,
      Layout,
      PathComponent: Path,
      Hexagon,
      TextComponent: Text,
      PatternComponent: Pattern,
    },
    data () {
      return {
        hexagonSize: {
          x: 10, y: 10,
        },
        moreHexas: null,
      };
    },
    created () {
      this.moreHexas = GridGenerator.parallelogram( -2, 2, -2, 2 );
    },
    methods: {
      generateHex ( val1, val2, val3 ) {
        return new Hex( val1, val2, val3 );
      },
    },
  };
</script>

<style lang="scss">
  /*
  Russian blue pattern:
  #7be3f6
  #4499a9
  #276a76
  #133b43
  #03090a
  */
svg {
  g {
    fill: #4499a9;
    fill-opacity: 0.6;
    &:hover {
      fill: #7be3f6;
      fill-opacity: 0.7;
      text {
        fill-opacity: 1;
      }
    }

    polygon {
      stroke: #7be3f6;
      stroke-width: 0.2;
      transition: fill-opacity 0.5s;
    }
    text {
      font-size: 0.22em;
      fill: white;
      fill-opacity: 0.7;
      transition: fill-opacity 0.5s;
    }
  }
  path {
    fill: none;
    stroke: #7be3f6;
    stroke-width: 0.2em;
    stroke-opacity: 0.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
body {
  margin: 0;
  padding: 1em;
  font-family: sans-serif;
  background: #133b43;
  color: white;
  text-align: center;
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

</style>
