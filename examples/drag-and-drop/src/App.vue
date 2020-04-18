<template>
  <div className="app">
    <h2>Drag & drop</h2>
    <p>Drag tiles from the right-side grid and drop them to the left grid.</p>
    <p>
      You can also drag & drop them within the left board, but not back to the
      right side.
    </p>
    <p>
      <small>
        TilesLayout (on the right) does not handle `onDrop` and `onDragOver` and
        that's why it's not possible to drop anything on these tiles. GameLayout
        (on the left) handles all the events, so it's possible to start a drag
        as well as drop tiles. It also implements custom check to disallow drop
        on certain tiles, like the ones that are blocked or already have content
        in them.
      </small>
    </p>
    <hex-grid width="1600" height="1000" viewBox="-50 -50 100 100">
      <game-layout />
      <tiles-layout />
    </hex-grid>
  </div>
</template>
<script>
import { HexGrid } from "../../../src";
import GameLayout from "./GameLayout";
import TilesLayout from "./TilesLayout";

export default {
  name: "App",
  components: { HexGrid, GameLayout, TilesLayout }
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0em 1em;
  font-family: sans-serif;
  background: #133b43;
  color: white;
  text-align: center;
}

p {
  max-width: 80%;
  margin: 10px auto;
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

.game {
  position: absolute;
  top: 0;
  left: 1em;
  border-right: 1px solid grey;
  width: 49%;
}

.tiles {
  position: absolute;
  top: 0;
  right: 1em;
  width: 49%;
}
</style>
