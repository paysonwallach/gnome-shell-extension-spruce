/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

const WindowActions = spruce.imports.windowActions;

class ScreenDetectionResult {
  constructor(sourceScreen, destinationScreen) {
    this.sourceScreen = sourceScreen;
    this.destinationScreen = destinationScreen;
  }
}

function nextOrPreviousScreen(action, screen, screens) {
  let result = 0;

  if (screens.length <= 1) {
    return result;
  }

  for (let i = 0; i < screens.length; i++) {
    let nextOrPreviousIndex = screen;

    if (WindowActions.isNextDisplayWindowAction(action)) {
      nextOrPreviousIndex++;
    } else if (WindowActions.isPreviousDisplayWindowAction(action)) {
      nextOrPreviousIndex--;
    }

    if (nextOrPreviousIndex < 0) {
      nextOrPreviousIndex = screens.length - 1;
    } else if (nextOrPreviousIndex >= screens.length) {
      nextOrPreviousIndex = 0;
    }

    result = screens[nextOrPreviousIndex];

    break;
  }

  return result;
}

function screenWithAction(action, sourceScreen, screens) {
  if (sourceScreen == null) {
    return;
  }

  let destinationScreen = sourceScreen;

  if (WindowActions.isMovingToScreenWindowAction(action)) {
    destinationScreen = nextOrPreviousScreen(action, sourceScreen, screens);
  }

  return new ScreenDetectionResult(sourceScreen, destinationScreen);
}

/*
function _getInvisibleBorderPadding(metaWindow) {
    let outerRect = metaWindow.get_frame_rect();
    let inputRect = metaWindow.get_buffer_rect();
    let borderX = outerRect.x - inputRect.x;
    let borderY = outerRect.y - inputRect.y;

    return [borderX, borderY];
}

/**
 * Resizes window considering margin settings
 * @param metaWindow
 * @param x
 * @param y
 * @param width
 * @param height
function move_resize_window_with_margins(metaWindow, x, y, width, height){

    let [borderX,borderY] = _getInvisibleBorderPadding(metaWindow);
    let [vBorderX,vBorderY] = _getVisibleBorderPadding(metaWindow);

    log("move_resize_window_with_margins " + metaWindow.get_title() + " " + x + ":" + y + " - " + width
        + ":" + height + " margin " + gridSettings[SETTINGS_WINDOW_MARGIN] + " borders invisible " +
        borderX + ":" + borderY + " visible " + vBorderX + ":" + vBorderY);

    x = x + gridSettings[SETTINGS_WINDOW_MARGIN];
    y = y + gridSettings[SETTINGS_WINDOW_MARGIN];
    width = width - gridSettings[SETTINGS_WINDOW_MARGIN] * 2;
    height = height - gridSettings[SETTINGS_WINDOW_MARGIN] * 2;

    x = x + vBorderX;
    y = y + vBorderY;
    width = width - 2 * vBorderX;
    height = height - 2 * vBorderY ;
    log("After margins and visible border window is " + x + ":" + y + " - " + width + ":" + height);

    metaWindow.move_resize_frame(true, x, y, width, height);
}
*/
