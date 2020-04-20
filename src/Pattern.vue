<template>
  <defs>
    <pattern :id="id" patternUnits="objectBoundingBox" x="0" y="0" :width="size.x" :height="size.y">
      <image :xlink-href="link" :href="link" x="0" y="0" :width="size.x * 2" :height="size.y * 2" />
    </pattern>
  </defs>
</template>
<script>
  import Point from "./models/Point";

  export default {
    name: "PatternComponent",
    props: {
      id: {
        type: String,
        required: true,
        default () {
          return null;
        }
      },
      link: {
        type: String,
        required: true,
        default () {
          return null;
        }
      },
      size: {
        type: Object,
        default () {
          return new Point( 10, 10 );
        }
      }
    }
  };
</script>
