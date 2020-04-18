<template>
  <div class="App">
    <h2>Pathfinding & active highlight</h2>
    <p>Click a tile to start drawing a path to your cursor. Click again to cancel.</p>
    <p>Hover around the board to see helper lines drawn.</p>
    <hex-grid
      width="1200"
      height="800"
    >
      <layout
        :size="{ x: 6, y: 6 }"
        :flat="false"
        :spacing="1.1"
        :origin="{ x: 0, y: 0 }"
      >
        <hexagon
          v-for="(hex,i) in hexagons"
          :key="i"
          :q="hex.q"
          :r="hex.r"
          :s="hex.s"
          :class="hex.props ? hex.props.className : null"
          :on-mouse-enter="onMouseEnter"
          :on-click="onClick"
        >
          <text-component>{{ HexUtils.getID(hex) }}</text-component>
        </hexagon>
        <path-component
          :start="path.start"
          :end="path.end"
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
    Path,
    Text,
    Hexagon,
    HexUtils,
  } from '../../../src';

  export default {
    name: 'App',
    components: {
      HexGrid,
      Layout,
      PathComponent: Path,
      TextComponent: Text,
      Hexagon,
    },
    data () {
      return {
        hexagons: [],
        path: {
          start: null,
          end: null,
        },
        HexUtils,
      };
    },
    created () {
      this.hexagons = GridGenerator.hexagon( 4 );
    },
    methods: {
      onClick ( event, source ) {
        if ( this.path.start == null ) {
          this.path.start = source.hex;
        } else {
          this.path.start = null;
          this.path.end = null;
        }
      },

      onMouseEnter ( event, source ) {
        // Set the path's end on hover
        const targetHex = source.hex;
        this.path.end = targetHex;

        // Color some hexagons
        const coloredHexas = this.hexagons.map( hex => {
          hex.props = hex.props || {};
          // Highlight tiles that are next to the target (1 distance away)
          hex.props.className =
            HexUtils.distance( targetHex, hex ) < 2 ? 'active' : '';

          // If the tile is on same coordinate, add class specific to the coordinate name
          hex.props.className += targetHex.q === hex.q ? ' q ' : '';
          hex.props.className += targetHex.r === hex.r ? ' r ' : '';
          hex.props.className += targetHex.s === hex.s ? ' s ' : '';

          return hex;
        } );
        this.hexagons = coloredHexas;
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
    g {
      fill: #4499a9;
      fill-opacity: 0.6;
      &:hover {
        fill: #7be3f6;
        fill-opacity: 0.7;
      }
      &:hover text {
        fill-opacity: 1;
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
