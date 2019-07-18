/*
 * Spruce
 *
 * Copyright (c) 2019 Payson Wallach
 *
 * Released under the terms of the GNU General Public License, version 3
 * (https://gnu.org/licenses/gpl.html)
 */

const Lang = imports.lang;

const Gio = imports.gi.Gio;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const Util = imports.misc.util;

const Gettext = imports.gettext.domain(spruce.metadata["gettext-domain"]);
const _ = Gettext.gettext;

const settings = spruce.imports.convenience.getSettings();

const positions = ["top", "top-right", "right", "bottom-right", "bottom",
                   "bottom-left", "left", "top-left", "center", "maximize",
                   "left-display", "right-display"];


const StatusMenuItem = class StatusMenuItem {
  constructor() { }

  enable() {
    this.button = new PanelMenu.Button(0,
                                       spruce.metadata["name"],
                                       false);

    const gIcon = Gio.icon_new_for_string(spruce.path + "/icons/spruce-symbolic.svg");
    const icon = new St.Icon({
      gicon: gIcon,
      style_class: "system-status-icon"
    });

    this.button.add_child(icon);
    this.button.add_style_class_name("panel-status-button");

    for (const position of positions) {
      let handler = function() {
        Util.spawn(["tidy", position]);
      };
      let menuItem = new PopupMenu.PopupMenuItem(_(position));

      menuItem.connect("activate", Lang.bind(this, handler));
      this.button.menu.addMenuItem(menuItem);
      Main.wm.addKeybinding(
        position,
        settings,
        Meta.KeyBindingFlags.NONE,
        Shell.ActionMode.NORMAL,
        handler
      );
    }
  }

  enable() {
    Main.panel.addToStatusArea("spruce-menu", this.button, 0, "right");
  }

  disable() {
    this.button.destroy();

    for (const position of positions) {
      Main.wm.removeKeybinding(position);
    }
  }
};