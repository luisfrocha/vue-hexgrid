<template>
  <defs>
    <pattern
      :id="id"
      :patternUnits="patternUnits"
      :x="size.x || 0"
      :y="size.y || 0"
      :width="size.width || size.x"
      :height="size.height || size.y"
    >
      <image
        :xlink-href="link"
        :href="link"
        x="0"
        y="0"
        :width="size.width || size.x * 2"
        :height="size.height || size.y * 2"
      />
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
        default: null,
      },
      link: {
        type: String,
        required: true,
        default: null,
      },
      patternUnits: {
        type: String,
        default: 'objectBoundingBox',
      },
      size: {
        type: Object,
        default: new Point( 10, 10 ),
      },
    }
  };
</script>
