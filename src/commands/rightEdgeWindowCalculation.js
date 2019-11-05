/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const WindowTransformHelpers = spruce.imports.windowTransformHelpers;

var name = WindowActions.RIGHT_EDGE;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  const oneHalfRect = WindowTransformHelpers.copyRect(
    visibleFrameOfDestinationScreen
  );

  oneHalfRect.width = Math.floor(oneHalfRect.width / 2.0);
  oneHalfRect.x += oneHalfRect.width;

  if (
    Math.abs(
      WindowTransformHelpers.getMidY(windowRect) -
        WindowTransformHelpers.getMidY(oneHalfRect)
    ) <= 1.0
  ) {
    const twoThirdsRect = WindowTransformHelpers.copyRect(oneHalfRect);

    twoThirdsRect.width = Math.floor(
      (visibleFrameOfDestinationScreen.width * 2) / 3.0
    );
    twoThirdsRect.x =
      visibleFrameOfDestinationScreen.x +
      visibleFrameOfDestinationScreen.width -
      twoThirdsRect.width;

    if (
      WindowTransformHelpers.rectCenteredWithinRect(oneHalfRect, windowRect)
    ) {
      return twoThirdsRect;
    }

    if (
      WindowTransformHelpers.rectCenteredWithinRect(twoThirdsRect, windowRect)
    ) {
      const oneThirdRect = WindowTransformHelpers.copyRect(oneHalfRect);

      oneThirdRect.width = Math.floor(
        visibleFrameOfDestinationScreen.width / 3.0
      );
      oneThirdRect.x =
        visibleFrameOfDestinationScreen.x +
        visibleFrameOfDestinationScreen.width -
        oneThirdRect.width;

      return oneThirdRect;
    }
  }

  return oneHalfRect;
};
