/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 *
 * Released under the terms of the GNU General Public License, version 3
 * (https://gnu.org/licenses/gpl.html)
 */

const Atk = imports.gi.Atk;
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

const Commands = spruce.imports.commands;
const {moveFocusedWindow} = spruce.imports.windowTransformHandler;
const settings = imports.misc.extensionUtils.getSettings(
  spruce.metadata["settings-schema"]
);

var StatusMenuItem = class StatusMenuItem {
  constructor() {}

  enable() {
    this.button = new PanelMenu.Button(0, spruce.metadata["name"], false);
    this.button.accessible_role = Atk.Role.TOGGLE_BUTTON;

    const gIcon = Gio.icon_new_for_string(
      "resource:///org/gnome/shell/extensions/spruce/icons/spruce-symbolic.svg"
    );
    const icon = new St.Icon({
      gicon: gIcon,
      style_class: "system-status-icon"
    });

    this.button.add_child(icon);
    this.button.add_style_class_name("panel-status-button");

    for (const command in Commands) {
      const action = spruce.imports.commands[command];
      const menuItem = new PopupMenu.PopupMenuItem(_(action.name));
      const handler = moveFocusedWindow.bind(this, action);

      menuItem.connect("activate", handler);
      this.button.menu.addMenuItem(menuItem);

      Main.wm.addKeybinding(
        action.name,
        settings,
        Meta.KeyBindingFlags.NONE,
        Shell.ActionMode.NORMAL,
        handler
      );
    }

    Main.panel.addToStatusArea("spruce-menu", this.button, 0, "right");
  }

  disable() {
    this.button.destroy();

    for (const command in Commands) {
      Main.wm.removeKeybinding(spruce.imports.commands[command].name);
    }
  }
};
