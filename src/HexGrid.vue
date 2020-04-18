<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    class="grid"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot></slot>
  </svg>
</template>
<script>
export default {
  name: "HexGrid",
  props: {
    width: {
      type: [String, Number],
      required: true,
      default() {
        return 800;
      }
    },
    height: {
      type: [String, Number],
      required: true,
      default() {
        return 600;
      }
    },
    viewBox: {
      type: String,
      default() {
        return "-50 -50 100 100";
      }
    }
  }
};
</script>
