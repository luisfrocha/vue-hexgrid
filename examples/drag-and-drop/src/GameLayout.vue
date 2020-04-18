<template>
  <layout
    class="game"
    :size="{ x: 10, y: 10 }"
    :flat="true"
    :spacing="1.08"
    :origin="{ x: -30, y: 0 }"
  >
    <hexagon
      v-for="(hex, i) in hexagons"
      :key="i"
      :q="hex.q"
      :r="hex.r"
      :s="hex.s"
      :class="hex.blocked ? 'blocked' : null"
      :fill="hex.image ? HexUtils.getID(hex) : null"
      :data="hex"
      :on-drag-start="onDragStart"
      :on-drag-end="onDragEnd"
      :on-drop="onDrop"
      :on-drag-over="onDragOver"
    >
      <text-component>{{ hex.text || HexUtils.getID(hex) }}</text-component>
      <pattern-component
        v-if="hex.image"
        :id="HexUtils.getID(hex)"
        :link="hex.image"
      />
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
  HexUtils
} from "../../../src";

export default {
  name: "GameLayout",
  components: {
    Layout,
    Hexagon,
    TextComponent: Text,
    PatternComponent: Pattern
  },
  data() {
    return {
      hexagons: [],
      HexUtils
    };
  },
  created() {
    const hexagons = GridGenerator.hexagon(2);
    // Add custom prop to couple of hexagons to indicate them being blocked
    hexagons[0].blocked = true;
    hexagons[1].blocked = true;
    this.hexagons = hexagons;
  },
  methods: {
    // onDrop you can read information of the hexagon that initiated the drag
    onDrop(event, source, targetProps) {
      const hexas = this.hexagons.map(hex => {
        // When hexagon is dropped on this hexagon, copy it's image and text
        if (HexUtils.equals(source.hex, hex)) {
          hex.image = targetProps.data.image;
          hex.text = targetProps.data.text;
        }
        return hex;
      });
      this.hexagons = hexas;
    },

    onDragStart(event, source) {
      // If this tile is empty, let's disallow drag
      if (!source.$props.data.text) {
        event.preventDefault();
      }
    },

    // Decide here if you want to allow drop to this node
    onDragOver(event, source) {
      // Find blocked hexagons by their 'blocked' attribute
      const blockedHexas = this.hexagons.filter(h => h.blocked);
      // Find if this hexagon is listed in blocked ones
      const blocked = blockedHexas.find(blockedHex => {
        return HexUtils.equals(source.hex, blockedHex);
      });

      const { text } = source.$props.data;
      // Allow drop, if not blocked and there's no content already
      if (!blocked && !text) {
        // Call preventDefault if you want to allow drop
        event.preventDefault();
      }
    },

    // onDragEnd you can do some logic, e.g. to clean up hexagon if drop was success
    onDragEnd(event, source, success) {
      if (!success) {
        return;
      }
      // TODO Drop the whole hex from array, currently somethings wrong with the patterns

      // When hexagon is successfully dropped, empty it's text and image
      const hexas = this.hexagons.map(hex => {
        if (HexUtils.equals(source.hex, hex)) {
          hex.text = null;
          hex.image = null;
        }
        return hex;
      });
      this.hexagons = hexas;
    }
  }
};
</script>
<style lang="scss">
svg .game {
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
    &.blocked {
      fill: #465880;
    }
    &.blocked:hover {
      fill: #53699a;
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
</style>
