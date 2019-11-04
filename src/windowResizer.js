/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowTransformHelpers = spruce.imports.windowTransformHelpers;

function transformWindowRect(
  windowRect,
  visibleFrameOfDestinationScreen,
  sizeOffset
) {
  let resizedWindowRect = WindowTransformHelpers.copyRect(windowRect);

  resizedWindowRect.width += sizeOffset;
  resizedWindowRect.x -= Math.floor(sizeOffset / 2.0);
  resizedWindowRect = adjustedWindowRectAgainstTopAndBottomEdgesOfScreen(
    windowRect,
    resizedWindowRect,
    visibleFrameOfDestinationScreen
  );

  if (resizedWindowRect.width >= visibleFrameOfDestinationScreen.width) {
    resizedWindowRect.width = visibleFrameOfDestinationScreen.width;
  }

  resizedWindowRect.height += sizeOffset;
  resizedWindowRect.y -= Math.floor(sizeOffset / 2.0);
  resizedWindowRect = adjustedWindowRectAgainstTopAndBottomEdgesOfScreen(
    windowRect,
    resizedWindowRect,
    visibleFrameOfDestinationScreen
  );

  if (resizedWindowRect.height >= visibleFrameOfDestinationScreen.height) {
    resizedWindowRect.height = visibleFrameOfDestinationScreen.height;
    resizedWindowRect.y = windowRect.y;
  }

  if (
    againstAllEdgesOfScreen(windowRect, visibleFrameOfDestinationScreen) &&
    sizeOffset < 0
  ) {
    resizedWindowRect.width += sizeOffset;
    resizedWindowRect.height += sizeOffset;
    resizedWindowRect.x -= Math.floor(sizeOffset / 2.0);
    resizedWindowRect.y -= Math.floor(sizeOffset / 2.0);
  }

  if (
    resizedWindowRectIsTooSmall(
      resizedWindowRect,
      visibleFrameOfDestinationScreen
    )
  ) {
    resizedWindowRect = windowRect;
  }

  return resizedWindowRect;
}

function getMaxX(windowRect) {
  return windowRect.x + windowRect.width;
}

function getMaxY(windowRect) {
  return windowRect.y + windowRect.height;
}

function againstScreenEdge(gap) {
  return Math.abs(gap) <= 5.0;
}

function againstLeftEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen) {
  return againstScreenEdge(windowRect.x - visibleFrameOfDestinationScreen.x);
}

function againstRightEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen) {
  return againstScreenEdge(
    getMaxX(windowRect) - getMaxX(visibleFrameOfDestinationScreen)
  );
}

function againstTopEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen) {
  return againstScreenEdge(
    getMaxY(windowRect) - getMaxY(visibleFrameOfDestinationScreen)
  );
}

function againstBottomEdgeOfScreen(
  windowRect,
  visibleFrameOfDestinationScreen
) {
  return againstScreenEdge(windowRect.y - visibleFrameOfDestinationScreen.y);
}

function againstAllEdgesOfScreen(windowRect, visibleFrameOfDestinationScreen) {
  return (
    againstLeftEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen) &&
    againstRightEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen) &&
    againstTopEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen) &&
    againstBottomEdgeOfScreen(windowRect, visibleFrameOfDestinationScreen)
  );
}

function adjustedWindowRectAgainstLeftAndRightEdgesOfScreen(
  originalWindowRect,
  resizedWindowRect,
  visibleFrameOfDestinationScreen
) {
  const adjustedWindowRect = WindowTransformHelpers.copyRect(resizedWindowRect);

  if (
    againstRightEdgeOfScreen(
      originalWindowRect,
      visibleFrameOfDestinationScreen
    )
  ) {
    adjustedWindowRect.x =
      getMaxX(visibleFrameOfDestinationScreen) - adjustedWindowRect.width;

    if (
      againstLeftEdgeOfScreen(
        originalWindowRect,
        visibleFrameOfDestinationScreen
      )
    ) {
      adjustedWindowRect.width = visibleFrameOfDestinationScreen.width;
    }
  }

  if (
    againstLeftEdgeOfScreen(originalWindowRect, visibleFrameOfDestinationScreen)
  ) {
    adjustedWindowRect.x = visibleFrameOfDestinationScreen.x;
  }

  return adjustedWindowRect;
}

function adjustedWindowRectAgainstTopAndBottomEdgesOfScreen(
  originalWindowRect,
  resizedWindowRect,
  visibleFrameOfDestinationScreen
) {
  const adjustedWindowRect = WindowTransformHelpers.copyRect(resizedWindowRect);

  if (
    againstTopEdgeOfScreen(originalWindowRect, visibleFrameOfDestinationScreen)
  ) {
    adjustedWindowRect.y =
      getMaxY(visibleFrameOfDestinationScreen) - adjustedWindowRect.height;

    if (
      againstBottomEdgeOfScreen(
        originalWindowRect,
        visibleFrameOfDestinationScreen
      )
    ) {
      adjustedWindowRect.height = visibleFrameOfDestinationScreen.height;
    }
  }

  if (
    againstBottomEdgeOfScreen(
      originalWindowRect,
      visibleFrameOfDestinationScreen
    )
  ) {
    adjustedWindowRect.y = visibleFrameOfDestinationScreen.y;
  }

  return adjustedWindowRect;
}

function resizedWindowRectIsTooSmall(
  windowRect,
  visibleFrameOfDestinationScreen
) {
  const minimumWindowRectWidth = Math.floor(
    visibleFrameOfDestinationScreen.width / 4.0
  );
  const minimumWindowRectHeight = Math.floor(
    visibleFrameOfDestinationScreen.height / 4.0
  );

  return (
    windowRect.width <= minimumWindowRectWidth ||
    windowRect.height <= minimumWindowRectHeight
  );
}
