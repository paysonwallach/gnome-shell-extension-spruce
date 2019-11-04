/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */
const WorkspaceManager = global.workspace_manager;

const Meta = imports.gi.Meta;

const Main = imports.ui.main;

const {screenWithAction} = spruce.imports.screenDetector;

/**
 * Get focused window by iterating though the windows on the active workspace.
 * @returns {Object} The focused window object. False if no focussed window was found.
 */
function getFocusedWindow(workspace) {
  let windows = workspace.list_windows();
  let focusedWindow = global.display.focus_window;

  if (!focusedWindow || !windows.includes(focusedWindow)) {
    return;
  }

  if (focusedWindow.is_attached_dialog()) {
    focusedWindow = focusedWindow.get_transient_for();
  }

  return focusedWindow;
}

var moveFocusedWindow = action => {
  const workspace = WorkspaceManager.get_active_workspace();
  const focusedWindow = getFocusedWindow(workspace);

  if (!focusedWindow) {
    return;
  }

  const screen = focusedWindow.get_monitor();
  const screens = Main.layoutManager.monitors;
  const screenDetectionResult = screenWithAction(action, screen, screens);

  let windowTransformResult = null;

  windowTransformResult = action.transform(
    focusedWindow.get_frame_rect(),
    workspace.get_work_area_for_monitor(screenDetectionResult.sourceScreen),
    workspace.get_work_area_for_monitor(screenDetectionResult.destinationScreen)
  );

  // window must be un-maximized before moving
  if (focusedWindow.get_maximized() !== 0) {
    focusedWindow.unmaximize(Meta.MaximizeFlags.BOTH);
  }

  focusedWindow.move_resize_frame(
    true,
    windowTransformResult.x,
    windowTransformResult.y,
    windowTransformResult.width,
    windowTransformResult.height
  );
  focusedWindow.move_to_monitor(screenDetectionResult.destinationScreen);
};
