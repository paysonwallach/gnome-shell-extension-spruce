/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowTransformHelpers = spruce.imports.windowTransformHelpers;
const CenterWindowCalculation = spruce.imports.commands.centerWindowCalculation;

var moveWindowRectToScreen = (windowRect, visibleFrameOfDestinationScreen) => {
  if (
    WindowTransformHelpers.rectFitsWithinRect(
      windowRect,
      visibleFrameOfDestinationScreen
    )
  ) {
    return CenterWindowCalculation.transform(
      windowRect,
      null,
      visibleFrameOfDestinationScreen
    );
  } else {
    return visibleFrameOfDestinationScreen;
  }
};
