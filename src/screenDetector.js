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

const WindowActions = spruce.imports.windowActions;

class ScreenDetectionResult {
  constructor(sourceScreen, destinationScreen) {
    this.sourceScreen = sourceScreen;
    this.destinationScreen = destinationScreen;
  }
}

function nextOrPreviousScreen(action, screen, screens) {
  let result = 0;

  if (screens.length <= 1) {
    return result;
  }

  for (let i = 0; i < screens.length; i++) {
    let nextOrPreviousIndex = screen;

    if (WindowActions.isNextDisplayWindowAction(action)) {
      nextOrPreviousIndex++;
    } else if (WindowActions.isPreviousDisplayWindowAction(action)) {
      nextOrPreviousIndex--;
    }

    if (nextOrPreviousIndex < 0) {
      nextOrPreviousIndex = screens.length - 1;
    } else if (nextOrPreviousIndex >= screens.length) {
      nextOrPreviousIndex = 0;
    }

    result = screens[nextOrPreviousIndex];

    break;
  }

  return result;
}

function screenWithAction(action, sourceScreen, screens) {
  if (sourceScreen == null) {
    return;
  }

  let destinationScreen = sourceScreen;

  if (WindowActions.isMovingToScreenWindowAction(action)) {
    destinationScreen = nextOrPreviousScreen(action, sourceScreen, screens);
  }

  return new ScreenDetectionResult(sourceScreen, destinationScreen);
}

/*
function _getInvisibleBorderPadding(metaWindow) {
    let outerRect = metaWindow.get_frame_rect();
    let inputRect = metaWindow.get_buffer_rect();
    let borderX = outerRect.x - inputRect.x;
    let borderY = outerRect.y - inputRect.y;

    return [borderX, borderY];
}

/**
 * Resizes window considering margin settings
 * @param metaWindow
 * @param x
 * @param y
 * @param width
 * @param height
function move_resize_window_with_margins(metaWindow, x, y, width, height){

    let [borderX,borderY] = _getInvisibleBorderPadding(metaWindow);
    let [vBorderX,vBorderY] = _getVisibleBorderPadding(metaWindow);

    log("move_resize_window_with_margins " + metaWindow.get_title() + " " + x + ":" + y + " - " + width
        + ":" + height + " margin " + gridSettings[SETTINGS_WINDOW_MARGIN] + " borders invisible " +
        borderX + ":" + borderY + " visible " + vBorderX + ":" + vBorderY);

    x = x + gridSettings[SETTINGS_WINDOW_MARGIN];
    y = y + gridSettings[SETTINGS_WINDOW_MARGIN];
    width = width - gridSettings[SETTINGS_WINDOW_MARGIN] * 2;
    height = height - gridSettings[SETTINGS_WINDOW_MARGIN] * 2;

    x = x + vBorderX;
    y = y + vBorderY;
    width = width - 2 * vBorderX;
    height = height - 2 * vBorderY ;
    log("After margins and visible border window is " + x + ":" + y + " - " + width + ":" + height);

    metaWindow.move_resize_frame(true, x, y, width, height);
}
*/
