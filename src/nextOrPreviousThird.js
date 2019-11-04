/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
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
