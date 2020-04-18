<template>
  <div class="App">
    <h2>Hexagon Pattern Swap</h2>
    <p>Click a tile to swap it's pattern</p>
    <hex-grid
      width="1200"
      height="800"
    >
      <layout
        :size="{ x: 10, y: 10 }"
        :flat="false"
        :spacing="1.1"
        :origin="{ x: 0, y: 0 }"
      >
        <hexagon
          v-for="(hex, i) in hexagons"
          :key="i"
          :q="hex.q"
          :r="hex.r"
          :s="hex.s"
          :fill="hex.pattern"
          :on-click="onClick"
        >
          <text-component>{{ HexUtils.getID(hex) }}</text-component>
        </hexagon>
        <pattern-component
          id="pattern1"
          link="https://picsum.photos/200?image=80"
        />
        <pattern-component
          id="pattern2"
          link="https://picsum.photos/200?image=82"
        />
      </layout>
    </hex-grid>
  </div>
</template>
<script>
  import {
    GridGenerator,
    HexGrid,
    Layout,
    Text,
    Pattern,
    Hexagon,
    HexUtils,
  } from '../../../src';

  export default {
    name: 'App',
    components: {
      HexGrid,
      Layout,
      TextComponent: Text,
      PatternComponent: Pattern,
      Hexagon,
    },
    data () {
      return {
        hexagons: [],
        HexUtils,
      };
    },
    created () {
      this.hexagons = GridGenerator.hexagon( 2 ).map( hex => {
        hex.pattern = 'pattern1';
        return hex;
      } );
    },
    methods: {
      onClick ( event, source ) {
        // Go through all of our hexagons and update patterns
        const hexas = this.hexagons.map( hex => {
          // Switch pattern only for the hexagon that was clicked
          if ( HexUtils.equals( source.hex, hex ) ) {
            // Assign new pattern to _our_ data
            hex.pattern =
              source.$props.fill === 'pattern1' ? 'pattern2' : 'pattern1';
          }

          return hex;
        } );

        // Save our new hexagon data to the state, which will cause a re-render
        this.hexagons = hexas;
      },
    },
  };
</script>
<style lang="scss">
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

  svg {
    /*
    Russian blue pattern:
    #7be3f6
    #4499a9
    #276a76
    #133b43
    #03090a
    */
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
      &.q .hexagon {
        fill: Red;
        fill-opacity: 0.4;
      }
      &.r .hexagon {
        fill: Green;
        fill-opacity: 0.4;
      }
      &.s .hexagon {
        fill: Blue;
        fill-opacity: 0.4;
      }
      &.active .hexagon {
        fill: Coral;
        fill-opacity: 0.9;
      }
      polygon {
        stroke: #7be3f6;
        stroke-width: 0.2;
        transition: fill-opacity 0.5s;
      }
      text {
        font-size: 0.17em;
        fill: white;
        fill-opacity: 0.7;
        transition: fill-opacity 0.5s;
      }
    }
    path {
      fill: none;
      stroke: #03090a;
      stroke-width: 0.2em;
      stroke-opacity: 0.9;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }
</style>
