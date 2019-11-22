/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 *
 * Released under the terms of the GNU General Public License, version 3
 * (https://gnu.org/licenses/gpl.html)
 *
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  Copyright (c) 2017 Eric Czarny eczarny@gmail.com
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included
 *  in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
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
