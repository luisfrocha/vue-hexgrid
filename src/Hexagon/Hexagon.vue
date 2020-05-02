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
        default () {
          return 0;
        }
      },
      r: {
        type: Number,
        required: true,
        default () {
          return 0;
        }
      },
      s: {
        type: Number,
        required: true,
        default () {
          return 0;
        }
      },
      fill: {
        type: String,
        default () {
          return null;
        }
      },
      cellStyle: { type: [ String, Object ] },
      className: { type: String },
      data: { type: Object },
    },
    computed: {
      compoundedClass () {
        return [ "hexagon-group", this.className ].join( " " ).trim();
      },
      fillId () {
        return this.fill ? `url(#${ this.fill })` : null;
      },
      points () {
        return this.$parent.points || [];
      }
    },
    data () {
      return {
        hex: null,
        pixel: {}
      };
    },
    created () {
      this.hex = new Hex( this.q, this.r, this.s );
      this.pixel = HexUtils.hexToPixel( this.hex, this.$parent.layout );
    },
    updated () {
      this.hex.q = this.$props.q;
      this.hex.r = this.$props.r;
      this.hex.s = this.$props.s;
      const point = HexUtils.hexToPixel( this.hex, this.$parent.layout );
      this.pixel.x = point.x;
      this.pixel.y = point.y;
    },
    methods: {
      handleClick ( e ) {
        this.$emit( 'click', e, this );
      },
      dragStart ( e ) {
        const targetProps = {
          ...this.state,
          data: this.$props.data,
          fill: this.$props.fill,
          className: this.$props.className
        };
        e.dataTransfer.setData( "hexagon", JSON.stringify( targetProps ) );
        this.$emit( 'dragstart', e, this );
      },
      dragEnd ( e ) {
        e.preventDefault();
        const success = e.dataTransfer.dropEffect !== "none";
        this.$emit( 'dragend', e, this, success );
      },
      mouseEnter ( e ) {
        this.$emit( 'mouseenter', e, this );
      },
      mouseOver ( e ) {
        this.$emit( 'mouseover', e, this );
      },
      mouseLeave ( e ) {
        this.$emit( 'mouseleave', e, this );
      },
      dragOver ( e ) {
        this.$emit( 'dragover', e, this );
      },
      drop ( e ) {
        e.preventDefault();
        const target = JSON.parse( e.dataTransfer.getData( "hexagon" ) );
        this.$emit( 'drop', e, this, target );
      }
    }
  };
</script>
