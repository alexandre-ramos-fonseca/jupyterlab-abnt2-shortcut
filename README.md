# JupyterLab ABNT2 Shortcut

A small JupyterLab 4 extension that restores `Ctrl+/` for toggling comments when using a Brazilian ABNT2 keyboard in CodeMirror editors.

## The problem

On a Brazilian ABNT2 keyboard, the physical key that produces `/` is represented by `KeyboardEvent.code === "IntlRo"`. In some JupyterLab CodeMirror contexts, the native `Ctrl+/` shortcut does not receive the expected browser event, so toggling comments with the physical shortcut is unavailable.

## How it works

The extension installs a capture-phase `keydown` listener and handles an event only when all of these conditions match:

- `Ctrl` is pressed;
- `Shift`, `Alt`, and `Meta` are not pressed;
- `KeyboardEvent.code === "IntlRo"`;
- `KeyboardEvent.key === "/"`;
- the event target is inside `.cm-editor`.

When the command is available and enabled, it prevents the browser event and executes JupyterLab's native `codemirror:toggle-comment` command. Events outside `.cm-editor` are ignored.

The implementation deliberately does not generalize detection to other keyboard layouts: the current detection is exactly `IntlRo` plus `/`.

## Requirements

- JupyterLab 4.x (`>=4.0.0 <5.0.0`);
- Node.js 18.18 or newer when installing from source;
- a Brazilian ABNT2 keyboard for the layout-specific behavior.

## Quick start from source

Until the extension is published to a package registry, the simplest installation is from a local checkout:

```sh
git clone https://github.com/alexandre-ramos-fonseca/jupyterlab-abnt2-shortcut.git
cd jupyterlab-abnt2-shortcut
corepack enable
yarn install --immutable
yarn build
jupyter labextension develop . --overwrite
```

Restart JupyterLab after installation.

Check that JupyterLab sees the extension with:

```sh
jupyter labextension list
```

### Verify the shortcut

1. Open a notebook or another CodeMirror editor in JupyterLab.
2. Place the cursor on a line of code, or select several lines.
3. Press the physical ABNT2 `Ctrl+/` combination.
4. The selected line or lines should toggle between commented and uncommented states.

The extension does not replace other JupyterLab shortcuts and does nothing outside CodeMirror editors.

## Building a package

To create a distributable JavaScript package from the checkout:

```sh
yarn install --immutable
yarn build
yarn pack
```

This project is a JavaScript-only JupyterLab extension. It does not contain a Python package and is not currently published to npm or PyPI.

## Development

Corepack provides the pinned Yarn version:

```sh
corepack enable
yarn install --immutable
yarn typecheck
yarn build
```

The build emits the TypeScript library in `lib/` and the JupyterLab prebuilt assets in `static/`. Generated `lib/` output is ignored; `static/` is included in the distributable package.

## Compatibility and limitations

The extension is designed for JupyterLab 4 CodeMirror editors. It does not change JupyterLab's behavior for other layouts, other key combinations, non-CodeMirror fields, or shortcuts outside `.cm-editor`.

It makes no network requests, stores no keyboard events, and adds no telemetry.

## License

MIT. See [LICENSE](LICENSE).
