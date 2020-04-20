<template>
  <div class="App">
    <h2>Select grid type and configuration from dropdown.</h2>
    <div>
      <strong>Template:</strong>
      <select v-model="selection">
        <option v-for="opt in selections" :key="opt">{{ opt }}</option>
      </select>
    </div>
    <hr />
    <hex-grid :width="config.width" :height="config.height">
      <layout
        :size="size"
        :flat="config.layout.flat"
        :spacing="config.layout.spacing"
        :origin="config.origin"
      >
        <!-- // note: key must be unique between re-renders.
        // using config.mapProps+i makes a new key when the goal template chnages.-->
        <hexagon
          v-for="(hex,i) in hexagons"
          :key="config.mapProps + i"
          :q="hex.q"
          :r="hex.r"
          :s="hex.s"
        >
          <text-component>{{ HexUtils.getID( hex ) }}</text-component>
        </hexagon>
      </layout>
    </hex-grid>
  </div>
</template>
<script>
  import {
    HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils,
  } from '../../../src';
  import configs from './configurations';
  export default {
    name: 'App',
    components: {
      HexGrid,
      Layout,
      Hexagon,
      TextComponent: Text,
    },
    data () {
      return {
        HexUtils,
        configs,
        selection: 'hexagon',
        selections: Object.keys( configs ),
      };
    },
    computed: {
      config () {
        return this.configs[ this.selection ];
      },
      size () {
        return {
          x: this.config.layout.width,
          y: this.config.layout.height,
        };
      },
      hexagons () {
        return GridGenerator.getGenerator( this.config.map ).apply( this, this.config.mapProps );
      },
    },
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
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

svg {
  g {
    fill: #3F51B5;
    fill-opacity: 0.6;
    &:hover {
      fill-opacity: 1;
      text {
        fill-opacity: 1;
      }
    }
    polygon {
      stroke: #3F51B5;
      stroke-width: 0.2;
      transition: fill-opacity .2s;
    }
    text {
      font-size: 0.2em;
      fill: #000;
      fill-opacity: 0.9;
      transition: fill-opacity .2s;
    }
  }
  path {
    fill: none;
    stroke: hsl(60, 20%, 70%);
    stroke-width: 0.4em;
    stroke-opacity: 0.3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

</style>
