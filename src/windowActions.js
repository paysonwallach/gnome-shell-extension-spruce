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
var BOTTOM_HALF = "move-resize-bottom-half";
var CENTER = "move-center";
var FULLSCREEN = "resize-fullscreen";
var LARGER = "resize-larger";
var LEFT_HALF = "move-resize-left-half";
var LOWER_LEFT = "move-resize-lower-left";
var LOWER_RIGHT = "move-resize-lower-right";
var NEXT_DISPLAY = "move-next-display";
var NEXT_THIRD = "move-resize-next-third";
var PREVIOUS_DISPLAY = "move-previous-display";
var PREVIOUS_THIRD = "move-resize-previous-third";
var RIGHT_HALF = "move-resize-right-half";
var SMALLER = "resize-smaller";
var TOP_HALF = "move-resize-top-half";
var UPPER_LEFT = "move-resize-upper-left";
var UPPER_RIGHT = "move-resize-upper-right";

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
