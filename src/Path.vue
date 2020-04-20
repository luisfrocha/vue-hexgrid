<template>
  <path :d="getPoints"></path>
</template>
<script>
  import HexUtils from "./HexUtils";

  export default {
    name: "PathComponent",
    props: {
      start: {
        type: Object,
        default() {
          return null;
        }
      },
      end: {
        type: Object,
        default() {
          return null;
        }
      },
      layout: {
        type: Object,
        default() {
          return null;
        }
      }
    },
    computed: {
      getPoints() {
        if (!this.start || !this.end) {
          return "";
        }

        // Get all the intersecting hexes between start and end points
        let distance = HexUtils.distance(this.start, this.end);
        let intersects = [];
        let step = 1.0 / Math.max(distance, 1);
        for (let i = 0; i <= distance; i++) {
          intersects.push(
            HexUtils.round(HexUtils.hexLerp(this.start, this.end, step * i))
          );
        }

        // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
        let points = "M";
        points += intersects
          .map(hex => {
            let p = HexUtils.hexToPixel(hex, this.$parent.layout);
            return ` ${p.x},${p.y} `;
          })
          .join("L");

        return points;
      }
    }
  };
</script>
