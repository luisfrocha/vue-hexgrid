<template>
  <g :class="className">
    <slot :origin="origin"></slot>
  </g>
</template>
<script>
  import Orientation from "./models/Orientation";
  import Point from "./models/Point";

  export default {
    name: "Layout",
    props: {
      className: {
        type: String,
        default() {
          return "";
        }
      },
      flat: {
        type: Boolean,
        default() {
          return true;
        }
      },
      origin: {
        type: Object,
        default() {
          return new Point(0, 0);
        }
      },
      size: {
        type: Object,
        default() {
          return new Point(10, 10);
        }
      },
      spacing: {
        type: Number,
        default() {
          return 1.0;
        }
      }
    },
    data() {
      return {
        LAYOUT_FLAT: new Orientation(
          3.0 / 2.0,
          0.0,
          Math.sqrt(3.0) / 2.0,
          Math.sqrt(3.0),
          2.0 / 3.0,
          0.0,
          -1.0 / 3.0,
          Math.sqrt(3.0) / 3.0,
          0.0
        ),
        LAYOUT_POINTY: new Orientation(
          Math.sqrt(3.0),
          Math.sqrt(3.0) / 2.0,
          0.0,
          3.0 / 2.0,
          Math.sqrt(3.0) / 3.0,
          -1.0 / 3.0,
          0.0,
          2.0 / 3.0,
          0.5
        )
      };
    },
    computed: {
      cornerCoords() {
        return this.calculateCoordinates(
          this.flat ? this.LAYOUT_FLAT : this.LAYOUT_POINTY
        );
      },
      layout() {
        return Object.assign({}, this.$props, {
          orientation: this.flat ? this.LAYOUT_FLAT : this.LAYOUT_POINTY
        });
      },
      points() {
        return this.calculateCoordinates(
          this.flat ? this.LAYOUT_FLAT : this.LAYOUT_POINTY
        )
          .map(point => `${point.x},${point.y}`)
          .join(" ");
      }
    },
    methods: {
      getPointOffset(corner, orientation, size) {
        let angle = (2.0 * Math.PI * (corner + orientation.startAngle)) / 6;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
      },

      calculateCoordinates(orientation) {
        const corners = [];
        const center = new Point(0, 0);

        Array.from(new Array(6), (x, i) => {
          const offset = this.getPointOffset(i, orientation, this.size);
          const point = new Point(center.x + offset.x, center.y + offset.y);
          corners.push(point);
        });

        return corners;
      }
    }
  };
</script>
