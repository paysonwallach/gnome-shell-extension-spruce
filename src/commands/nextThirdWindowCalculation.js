/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;
const NextOrPreviousThirds = spruce.imports.nextOrPreviousThird;

var name = WindowActions.NEXT_THIRD;
var transform = (
  windowRect,
  visibleFrameOfSourceScreen,
  visibleFrameOfDestinationScreen
) => {
  return NextOrPreviousThirds.findNextThird(
    windowRect,
    visibleFrameOfDestinationScreen
  );
};
