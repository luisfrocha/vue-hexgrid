<template>
  <div class="App">
    <h1>SVG animations with react-hexgrid</h1>
    <hex-grid width="1200" height="900">
      <layout
        :size="{ x: 6, y: 6 }"
        :origin="{ x: -15, y: -40 }"
        :spacing="1.15"
      >
        <hexagon
          v-for="(hex, i) in hexagons"
          :key="i"
          :q="hex.q"
          :r="hex.r"
          :s="hex.s"
        />
        <CSSTransitionGroup
          component="g"
          transitionName="fade"
          transitionAppear="true"
          transitionAppearTimeout="500"
          transitionEnter="false"
          transitionLeave="false"
        >
          <hexagon :q="4" :r="-2" :s="-3" />
        </CSSTransitionGroup>
      </layout>
      <defs>
        <filter id="shadowed-goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
          <feColorMatrix
            in="shadow"
            mode="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
            result="shadow"
          />
          <feOffset in="shadow" dx="1" dy="1" result="shadow" />
          <feComposite in2="shadow" in="goo" result="goo" />
          <feComposite in2="goo" in="SourceGraphic" result="mix" />
        </filter>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </hex-grid>
  </div>
</template>
<script>
  import {
    HexGrid, Layout, Hexagon, GridGenerator,
  } from '../../../src';

  export default {
    name: 'App',
    components: {
      HexGrid, Layout, Hexagon,
    },
    data () {
      return { hexagons: [] };
    },
    created () {
      this.hexagons = GridGenerator.rectangle( 6, 6 );
    },
  };
</script>

<style lang="scss">
body {
  background: #e4e7ec;
  color: #263959;
}
svg {
  g {
    fill: #6d819c;
    polygon {
      stroke: #263959;
      stroke-width: 0.2;
    }
  }
  > g > g.hexagon-group:nth-child(1) .hexagon {
    fill: #55967e;
    transform-origin: center;
    animation-name: stretch;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-delay: 0;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-play-state: running;
  }
}
svg g.hexagon-group:nth-child(8) .hexagon {
  fill: #55967e;
  animation: nudge 3s linear infinite alternate;
}
svg g.hexagon-group:nth-child(12) .hexagon {
  fill: #55967e;
  transform-origin: top right;
  animation-name: spin;
  animation-duration: 3s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
}

svg g.hexagon-group:nth-child(32) .hexagon {
  fill: #55967e;
}
svg g.hexagon-group:nth-child(35) .hexagon {
  fill: #55967e;
}

.fade-appear {
  opacity: 0.01;
}
.fade-appear.fade-appear-active {
  opacity: 1;
  transition: opacity 0.5s ease-in;
}

@keyframes nudge {
  0%,
  50% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(10px, 0);
  }
  20% {
    transform: translate(-10px, 10px);
  }
  30% {
    transform: translate(10px, -10px);
  }
  40% {
    transform: translate(-10px, 0);
  }
}

@keyframes stretch {
  0% {
    transform: scale(0.8);
  }
  5% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.8);
  }
  15% {
    transform: scale(1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(720deg);
  }
}
svg {
  filter: url("#goo");
  /*filter: url("#shadowed-goo");*/
}
svg g.hexagon-group:nth-child(28) polygon {
  stroke-width: 3;
}

body {
  margin: 0;
  padding: 1em;
  font-family: sans-serif;
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
