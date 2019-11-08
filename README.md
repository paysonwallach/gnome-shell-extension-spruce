<div align="center">
  <h1>Spruce</h1>
  <p>Arrange windows from the comfort of your keyboard</p>
  <a href=https://github.com/paysonwallach/spruce/release/latest>
    <img src=https://img.shields.io/github/v/tag/paysonwallach/spruce?style=flat-square>
  </a>
  <a href=https://github.com/paysonwallach/spruce/blob/master/LICENSE>
    <img src=https://img.shields.io/github/license/paysonwallach/spruce?style=flat-square>
  </a>
  <a href=https://buymeacoffee.com/paysonwallach>
    <img src=https://img.shields.io/badge/donate-Buy%20me%20a%20coffe-yellow?style=flat-square>
  </a>
  <br>
  <br>
  <br>
</div>

[Spruce](https://github.com/paysonwallach/spruce) is a GNOME Shell extension implementation of [Spectacle](https://github.com/eczarny/spectacle), a macOS app that lets you easily arrange and tile windows, even across multiple displays.

## Installation

### From source using [`meson`](http://mesonbuild.com/)

Clone this repository or download the [latest release](https://github.com/paysonwallach/spruce/releases/latest).

```sh
git clone https://github.com/paysonwallach/spruce.git
```

Configure the build directory at the root of the project.

```sh
meson --prefix=$HOME/.local build
```

Install with `ninja`.

```sh
ninja -C build install
```

## Loading the extension

Restart GNOME shell.

- **X11/Xorg:** <kbd>Alt</kbd> + <kbd>F2</kbd> + `restart` or `r`
- **Wayland:** Log out and log back in

Enable the extension with [GNOME Tweaks](https://gitlab.gnome.org/GNOME/gnome-tweaks) or `gnome-extensions`.

```sh
gnome-extensions enable spruce@paysonwallach.com
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Code of Conduct

By participating in this project, you agree to abide by the terms of the [Code of Conduct](https://github.com/paysonwallach/spruce/blob/master/CODE_OF_CONDUCT.md).

## License

[Spruce](https://github.com/paysonwallach/spruce) is licensed under the [GNU Public License v3.0](https://github.com/paysonwallach/spruce/blob/master/LICENSE).
