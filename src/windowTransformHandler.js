/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 *
 * Released under the terms of the GNU General Public License, version 3
 * (https://gnu.org/licenses/gpl.html)
 *
 * This file incorporates work covered by the following copyright and
 * permission notice:
 *
 *  Copyright (c) 2017 Eric Czarny eczarny@gmail.com
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included
 *  in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
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
