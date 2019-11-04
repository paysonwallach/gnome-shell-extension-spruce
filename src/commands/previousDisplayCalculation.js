/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const NextOrPreviousScreen = spruce.imports.nextOrPreviousScreen;

var name = WindowActions.PREVIOUS_DISPLAY;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  return NextOrPreviousScreen.moveWindowRectToScreen(
    windowRect,
    visibleFrameOfDestinationScreen
  );
};
