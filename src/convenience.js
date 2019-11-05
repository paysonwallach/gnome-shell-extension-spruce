/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 *
 * Released under the terms of the GNU General Public License, version 3
 * (https://gnu.org/licenses/gpl.html)
 */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const ExtensionUtils = imports.misc.extensionUtils;

/**
 * registerResources:
 * @bundleID: (optional): the gresource bundle id
 *
 * Loads and registers a gresource bundle for @bundleID. If @bundleID is not
 * provided, it is taken from metadata["settings-schema"].
 */
function registerResources(bundleID) {
  let extension = ExtensionUtils.getCurrentExtension();

  bundleID = bundleID || extension.metadata["settings-schema"];

  Gio.Resource.load(
    GLib.build_filenamev([extension.dir.get_path(), bundleID + ".gresource"])
  )._register();
}
