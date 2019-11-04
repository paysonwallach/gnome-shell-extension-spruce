/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const WindowResizer = spruce.imports.windowResizer;

var name = WindowActions.SMALLER;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  return WindowResizer.transformWindowRect(
    windowRect,
    visibleFrameOfDestinationScreen,
    -30.0
  );
};
