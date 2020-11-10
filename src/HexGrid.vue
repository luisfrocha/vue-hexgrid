<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :preserveAspectRatio="preserveAspectRatio"
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
      height: {
        type: [String, Number],
        required: true,
        default: 600,
      },
      preserveAspectRatio:{
        type: String,
        default: 'xMidYMid meet',
      },
      width: {
        type: [String, Number],
        required: true,
        default: 800,
      },
      viewBox: {
        type: String,
        default: '-50 -50 100 100',
      }
    }
  };
</script>
