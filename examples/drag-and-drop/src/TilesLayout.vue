<template>
  <layout
    class="tiles"
    :size="{ x: 8, y: 8 }"
    :flat="false"
    :spacing="1.01"
    :origin="{ x: 40, y: -20 }"
  >
    <hexagon
      v-for="(hex, i) in hexagons"
      :key="i"
      :q="hex.q"
      :r="hex.r"
      :s="hex.s"
      :fill="hex.image ? HexUtils.getID(hex) : null"
      :data="hex"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
    >
      <text-component>{{ hex.text }}</text-component>
      <pattern-component v-if="hex.image" :id="HexUtils.getID(hex)" :link="hex.image" />
    </hexagon>
  </layout>
</template>
<script>
  import {
    GridGenerator,
    Layout,
    Hexagon,
    Text,
    Pattern,
    HexUtils,
  } from '../../../src';

  export default {
    name: 'TilesLayout',
    components: {
      Layout,
      Hexagon,
      TextComponent: Text,
      PatternComponent: Pattern,
    },
    created () {
      // Initialize hexagons with some text and image
      const hexagons = GridGenerator.parallelogram( -1, 1, -1, 2 ).map(
        ( hexagon, index ) => {
          return Object.assign( {}, hexagon, {
            text: `Cat #${ index }`,
            image: `http://lorempixel.com/400/400/cats/${ index % 10 }/`,
          } );
        }
      );
      this.hexagons = hexagons;
    },
    data () {
      return {
        hexagons: [], HexUtils,
      };
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      onDragStart ( event, source ) {
        // Could do something on onDragStart as well, if you wish
      },

      // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
      onDragEnd ( event, source, success ) {
        if ( !success ) {
          return;
        }
        // TODO Drop the whole hex from array, currently somethings wrong with the patterns
        // const hexas = hexagons.filter(hex => !HexUtils.equals(targetHex, hex));
        const hexas = this.hexagons.map( hex => {
          if ( HexUtils.equals( source.hex, hex ) ) {
            hex.text = null;
            hex.image = null;
          }
          return hex;
        } );
        this.hexagons = hexas;
      },
    },
  };
</script>
<style lang="scss">
svg {
  /*
  Russian blue pattern:
  #7be3f6
  #4499a9
  #276a76
  #133b43
  #03090a
  */
  .tiles {
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
}
</style>
