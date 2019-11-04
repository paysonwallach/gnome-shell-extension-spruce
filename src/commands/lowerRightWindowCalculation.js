/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const WindowTransformHelpers = spruce.imports.windowTransformHelpers;

var name = WindowActions.LOWER_RIGHT;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  const oneQuarterRect = WindowTransformHelpers.copyRect(
    visibleFrameOfDestinationScreen
  );

  oneQuarterRect.width = Math.floor(
    visibleFrameOfDestinationScreen.width / 2.0
  );
  oneQuarterRect.height = Math.floor(
    visibleFrameOfDestinationScreen.height / 2.0
  );
  oneQuarterRect.x += oneQuarterRect.width;
  oneQuarterRect.y =
    visibleFrameOfDestinationScreen.y +
    Math.floor(visibleFrameOfDestinationScreen.height / 2.0) +
    (visibleFrameOfDestinationScreen.height % 2.0);

  if (
    Math.abs(
      WindowTransformHelpers.getMidY(windowRect) -
        WindowTransformHelpers.getMidY(oneQuarterRect)
    ) <= 1.0
  ) {
    const twoThirdsRect = WindowTransformHelpers.copyRect(oneQuarterRect);

    twoThirdsRect.width = Math.floor(
      (visibleFrameOfDestinationScreen.width * 2) / 3.0
    );
    twoThirdsRect.x =
      visibleFrameOfDestinationScreen.x +
      visibleFrameOfDestinationScreen.width -
      twoThirdsRect.width;

    if (
      WindowTransformHelpers.rectCenteredWithinRect(oneQuarterRect, windowRect)
    ) {
      return twoThirdsRect;
    }

    if (
      WindowTransformHelpers.rectCenteredWithinRect(twoThirdsRect, windowRect)
    ) {
      const oneThirdRect = WindowTransformHelpers.copyRect(oneQuarterRect);

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

  return oneQuarterRect;
};
