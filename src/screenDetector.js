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
  if (screens.length <= 1) {
    return 0;
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

    return screens[nextOrPreviousIndex];
  }
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
