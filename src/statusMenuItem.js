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

const Config = imports.misc.config;
const Util = imports.misc.util;

const Gettext = imports.gettext.domain();
const _ = Gettext.gettext;

const Commands = spruce.imports.commands;
const WindowActions = spruce.imports.windowActions;

const {moveFocusedWindow} = spruce.imports.windowTransformHandler;
const settings = imports.misc.extensionUtils.getSettings(
  spruce.metadata["settings-schema"]
);

var StatusMenuItem = class StatusMenuItem {
  constructor() {}

  enable() {
    const MENU_SEPARATOR_ITEM = "menu-separator-item";

    const gIcon = Gio.icon_new_for_string(
      "resource:///org/gnome/shell/extensions/spruce/icons/spruce-symbolic.svg"
    );
    const icon = new St.Icon({
      gicon: gIcon,
      style_class: "system-status-icon"
    });

    this.button = new PanelMenu.Button(0, spruce.metadata["name"], false);
    this.button.accessible_role = Atk.Role.MENU;

    this.button.add_child(icon);
    this.button.add_style_class_name("panel-status-button");

    const commands = [];
    for (const command in Commands) {
      commands.push(spruce.imports.commands[command]);
    }
    const menuItems = [
      WindowActions.CENTER,
      WindowActions.FULLSCREEN,
      MENU_SEPARATOR_ITEM,
      WindowActions.LEFT_EDGE,
      WindowActions.RIGHT_EDGE,
      WindowActions.TOP_EDGE,
      WindowActions.BOTTOM_EDGE,
      MENU_SEPARATOR_ITEM,
      WindowActions.UPPER_LEFT_CORNER,
      WindowActions.LOWER_LEFT_CORNER,
      WindowActions.UPPER_RIGHT_CORNER,
      WindowActions.LOWER_RIGHT_CORNER,
      MENU_SEPARATOR_ITEM,
      WindowActions.NEXT_THIRD,
      WindowActions.PREVIOUS_THIRD,
      MENU_SEPARATOR_ITEM,
      WindowActions.NEXT_DISPLAY,
      WindowActions.PREVIOUS_DISPLAY,
      MENU_SEPARATOR_ITEM,
      WindowActions.LARGER,
      WindowActions.SMALLER
    ];
    const settings = new Gio.Settings({
      schema: spruce.metadata["settings-schema"]
    });

    for (const item of menuItems) {
      let menuItem;

      if (item === MENU_SEPARATOR_ITEM) {
        menuItem = new PopupMenu.PopupSeparatorMenuItem();
      } else {
        const action = commands.filter(command => command.name === item)[0];
        const handler = moveFocusedWindow.bind(this, action);
        const keybinding = settings.get_value(action.name);
        const accelLabelBinConfig = { x_align: St.Align.END };
        const accelLabelBin = new St.Bin(accelLabelBinConfig);

        Main.wm.addKeybinding(
          action.name,
          settings,
          Meta.KeyBindingFlags.NONE,
          Shell.ActionMode.NORMAL,
          handler
        );

        menuItem = new PopupMenu.PopupMenuItem(_(action.name));

        // get first accelerator from keybinding values
        let accelLabelText = keybinding.get_child_value(0)
          .get_string()[0]
          .replace(/<Control>|<Ctrl>/g, "⌃")
          .replace(/<Alt>/g, "⎇")
          .replace(/<Super>/g, "◆")
          .replace(/<Shift>/g, "⇧")
          .replace(/Left/g, "←")
          .replace(/Up/g, "↑")
          .replace(/Right/g, "→")
          .replace(/Down/g, "↓");

        const accelLabel = new St.Label({
          text: accelLabelText
        });

        accelLabelBin.child = accelLabel;
        accelLabelBinConfig.expand = true;

        if (Config.PACKAGE_VERSION.startsWith("3.34")) {
          menuItem.add(accelLabelBin, accelLabelBinConfig);
        } else {
          menuItem.actor.add(accelLabelBin, accelLabelBinConfig);
        }

        menuItem.connect("activate", handler);
      }

      this.button.menu.addMenuItem(menuItem);
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
