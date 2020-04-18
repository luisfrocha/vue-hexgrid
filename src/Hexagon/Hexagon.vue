<template>
  <g
    :class="compoundedClass"
    :transform="`translate(${pixel.x}, ${pixel.y})`"
    draggable="true"
    @mouseenter="mouseEnter"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    @click="handleClick"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover="dragOver"
    @drop="drop"
  >
    <g class="hexagon">
      <polygon :points="points" :fill="fillId" :style="cellStyle" />
      <slot :x="pixel.x" :y="pixel.y"></slot>
    </g>
  </g>
</template>
<script>
import Hex from "../models/Hex";
import HexUtils from "../HexUtils";

export default {
  name: "Hexagon",
  props: {
    q: {
      type: Number,
      required: true,
      default() {
        return null;
      }
    },
    r: {
      type: Number,
      required: true,
      default() {
        return null;
      }
    },
    s: {
      type: Number,
      required: true,
      default() {
        return null;
      }
    },
    fill: {
      type: String,
      default() {
        return null;
      }
    },
    cellStyle: { type: [String, Object] },
    className: { type: String },
    data: { type: Object },
    onMouseEnter: { type: Function },
    onMouseOver: { type: Function },
    onMouseLeave: { type: Function },
    onClick: { type: Function },
    onDragStart: { type: Function },
    onDragEnd: { type: Function },
    onDragOver: { type: Function },
    onDrop: { type: Function }
  },
  computed: {
    compoundedClass() {
      return ["hexagon-group", this.className].join(" ").trim();
    },
    fillId() {
      return this.fill ? `url(#${this.fill})` : null;
    },
    points() {
      return this.$parent.points || [];
    }
  },
  data() {
    return {
      hex: null,
      pixel: {}
    };
  },
  created() {
    this.hex = new Hex(this.q, this.r, this.s);
    this.pixel = HexUtils.hexToPixel(this.hex, this.$parent.layout);
  },
  updated(nextProps) {
    if (nextProps) {
      const { q, r, s } = nextProps;
      this.hex = new Hex(q, r, s);
      this.pixel = HexUtils.hexToPixel(this.hex, this.layout);
    }
  },
  methods: {
    handleClick(e) {
      if (this.$props.onClick) {
        this.$props.onClick(e, this);
      }
    },
    dragStart(e) {
      if (this.$props.onDragStart) {
        const targetProps = {
          ...this.state,
          data: this.$props.data,
          fill: this.$props.fill,
          className: this.$props.className
        };
        e.dataTransfer.setData("hexagon", JSON.stringify(targetProps));
        this.$props.onDragStart(e, this);
      }
    },
    dragEnd(e) {
      if (this.$props.onDragEnd) {
        e.preventDefault();
        const success = e.dataTransfer.dropEffect !== "none";
        this.$props.onDragEnd(e, this, success);
      }
    },
    mouseEnter(e) {
      if (this.$props.onMouseEnter) {
        this.$props.onMouseEnter(e, this);
      }
    },
    mouseOver(e) {
      if (this.$props.onMouseOver) {
        this.$props.onMouseOver(e, this);
      }
    },
    mouseLeave(e) {
      if (this.$props.onMouseLeave) {
        this.$props.onMouseLeave(e, this);
      }
    },
    dragOver(e) {
      if (this.$props.onDragOver) {
        this.$props.onDragOver(e, this);
      }
    },
    drop(e) {
      if (this.$props.onDrop) {
        e.preventDefault();
        const target = JSON.parse(e.dataTransfer.getData("hexagon"));
        this.$props.onDrop(e, this, target);
      }
    }
  }
};
</script>
