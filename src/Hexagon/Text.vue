<template>
  <text
    :x="x || 0"
    :y="y ? y : '0.3em'"
    :class="className"
    text-anchor="middle"
  >
    <slot></slot>
  </text>
</template>
<script>
  export default {
    name: "TextComponent",
    props: {
      x: {
        type: [String, Number],
        default() {
          return null;
        }
      },
      y: {
        type: [String, Number],
        default() {
          return null;
        }
      },
      className: {
        type: String,
        default() {
          return null;
        }
      }
    }
  };
</script>
