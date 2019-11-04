/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const WindowTransformHelpers = spruce.imports.windowTransformHelpers;

var name = WindowActions.CENTER;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  const resultRect = WindowTransformHelpers.copyRect(windowRect);

  resultRect.x =
    Math.round(
      (visibleFrameOfDestinationScreen.width - windowRect.width) / 2.0
    ) + visibleFrameOfDestinationScreen.x;
  resultRect.y =
    Math.round(
      (visibleFrameOfDestinationScreen.height - windowRect.height) / 2.0
    ) + visibleFrameOfDestinationScreen.y;

  return resultRect;
};
