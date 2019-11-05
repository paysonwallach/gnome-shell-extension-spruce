/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowTransformHelpers = spruce.imports.windowTransformHelpers;
const WindowResizer = spruce.imports.windowResizer;

/*
var UNDO = "WindowActionUndo";
var REDO = "WindowActionRedo";
*/
var CENTER = "move-center";
var FULLSCREEN = "resize-fullscreen";
var TOP_EDGE = "move-resize-top-edge";
var RIGHT_EDGE = "move-resize-right-edge";
var BOTTOM_EDGE = "move-resize-bottom-edge";
var LEFT_EDGE = "move-resize-left-edge";
var UPPER_LEFT_CORNER = "move-resize-upper-left-corner";
var UPPER_RIGHT_CORNER = "move-resize-upper-right-corner";
var LOWER_RIGHT_CORNER = "move-resize-lower-right-corner";
var LOWER_LEFT_CORNER = "move-resize-lower-left-corner";
var NEXT_THIRD = "move-resize-next-third";
var PREVIOUS_THIRD = "move-resize-previous-third";
var NEXT_DISPLAY = "move-next-display";
var PREVIOUS_DISPLAY = "move-previous-display";
var LARGER = "resize-larger";
var SMALLER = "resize-smaller";

var isNextScreenWindowAction = action => {
  return action.name === NEXT_DISPLAY;
};

var isPreviousScreenWindowAction = action => {
  return action.name === PREVIOUS_DISPLAY;
};

var isMovingToScreenWindowAction = action => {
  return (
    isNextScreenWindowAction(action) || isPreviousScreenWindowAction(action)
  );
};
