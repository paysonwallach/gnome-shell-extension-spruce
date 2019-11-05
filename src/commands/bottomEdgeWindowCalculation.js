/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const WindowTransformHelpers = spruce.imports.windowTransformHelpers;

var name = WindowActions.BOTTOM_EDGE;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  const oneHalfRect = WindowTransformHelpers.copyRect(
    visibleFrameOfDestinationScreen
  );

  oneHalfRect.height = Math.floor(oneHalfRect.height / 2.0);
  oneHalfRect.y += oneHalfRect.height + (visibleFrameOfDestinationScreen.height % 2.0);

  if (
    Math.abs(
      WindowTransformHelpers.getMidX(windowRect) -
        WindowTransformHelpers.getMidX(oneHalfRect)
    ) <= 1.0
  ) {
    const twoThirdsRect = WindowTransformHelpers.copyRect(oneHalfRect);

    twoThirdsRect.height = Math.floor(
      (visibleFrameOfDestinationScreen.height * 2) / 3.0
    );
    twoThirdsRect.y =
      visibleFrameOfDestinationScreen.y +
      visibleFrameOfDestinationScreen.height -
      twoThirdsRect.height;

    if (
      WindowTransformHelpers.rectCenteredWithinRect(oneHalfRect, windowRect)
    ) {
      return twoThirdsRect;
    }

    if (
      WindowTransformHelpers.rectCenteredWithinRect(twoThirdsRect, windowRect)
    ) {
      const oneThirdRect = WindowTransformHelpers.copyRect(oneHalfRect);

      oneThirdRect.height = Math.floor(
        visibleFrameOfDestinationScreen.height / 3.0
      );
      oneThirdRect.y =
        visibleFrameOfDestinationScreen.y +
        visibleFrameOfDestinationScreen.height -
        oneThirdRect.height;

      return oneThirdRect;
    }
  }

  return oneHalfRect;
};
