/*
 * Spruce
 *
 * Copyright (c) 2019 Payson Wallach
 *
 * Released under the terms of the GNU General Public License, version 3
 * (https://gnu.org/licenses/gpl.html)
 */

window.spruce = imports.misc.extensionUtils.getCurrentExtension();

const ExtensionUtils = imports.misc.extensionUtils;

const {StatusMenuItem} = spruce.imports.statusMenuItem;
const {registerResources} = spruce.imports.convenience;

let statusMenuItem;

function init() {
  ExtensionUtils.initTranslations();
  registerResources();
}

function enable() {
  statusMenuItem = new StatusMenuItem();
  statusMenuItem.enable();
}

function disable() {
  statusMenuItem.disable();
  statusMenuItem = null;
}
