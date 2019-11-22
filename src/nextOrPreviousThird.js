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

function thirdsFromVisibleFrameOfScreen(visibleFrameOfDestinationScreen) {
  let thirds = [];

  for (let i = 0; i < 3; i++) {
    const third = WindowTransformHelpers.copyRect(
      visibleFrameOfDestinationScreen
    );

    third.x =
      visibleFrameOfDestinationScreen.x +
      Math.floor(visibleFrameOfDestinationScreen.width / 3.0) * i;
    third.width = Math.floor(visibleFrameOfDestinationScreen.width / 3.0);
    thirds.push(third);
  }

  for (let i = 0; i < 3; i++) {
    const third = WindowTransformHelpers.copyRect(
      visibleFrameOfDestinationScreen
    );

    third.y =
      visibleFrameOfDestinationScreen.y +
      visibleFrameOfDestinationScreen.height -
      Math.floor(visibleFrameOfDestinationScreen.height / 3.0) * ++i;
    third.height = Math.floor(visibleFrameOfDestinationScreen.height / 3.0);
    thirds.push(third);
  }

  return thirds;
}

var findNextThird = (
  windowRect,
  visibleFrameOfDestinationScreen
) => {
  const thirds = thirdsFromVisibleFrameOfScreen(
    visibleFrameOfDestinationScreen
  );

  let result = thirds[0];

  for (let i = 0; i < thirds.length; i++) {
    const third = thirds[i];

    if (WindowTransformHelpers.rectCenteredWithinRect(third, windowRect)) {
      let j = i;

      if (++j >= thirds.length) {
        j = 0;
      }

      result = thirds[j];

      break;
    }
  }

  return result;
};

var findPreviousThird = (
  windowRect,
  visibleFrameOfDestinationScreen
) => {
  const thirds = thirdsFromVisibleFrameOfScreen(
    visibleFrameOfDestinationScreen
  );

  let result = thirds[0];

  for (let i = 0; i < thirds.length; i++) {
    const third = thirds[i];

    if (WindowTransformHelpers.rectCenteredWithinRect(third, windowRect)) {
      let j = i;

      if (--j < 0) {
        j = thirds.length - 1;
      }

      result = thirds[j];

      break;
    }
  }

  return result;
};
