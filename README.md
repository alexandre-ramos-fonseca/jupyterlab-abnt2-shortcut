# jupyterlab-abnt2-shortcut

A small, independent JupyterLab 4 prebuilt extension that restores `Ctrl+/` for Brazilian ABNT2 keyboards in CodeMirror editors.

## The problem

On a Brazilian ABNT2 keyboard, the physical key that produces `/` is represented by `KeyboardEvent.code === "IntlRo"`. In some JupyterLab CodeMirror contexts, the native `Ctrl+/` shortcut does not receive the expected browser event, so toggling comments with the physical shortcut is unavailable.

## How it works

The extension installs a capture-phase `keydown` listener and handles an event only when all of these conditions match:

- `Ctrl` is pressed;
- `Shift`, `Alt`, and `Meta` are not pressed;
- `KeyboardEvent.code === "IntlRo"`;
- `KeyboardEvent.key === "/"`;
- the event target is inside `.cm-editor`.

When the command is available and enabled, it prevents the browser event and executes JupyterLab's native `codemirror:toggle-comment` command. Events outside `.cm-editor` are ignored. The implementation deliberately does not generalize detection to other keyboard layouts: the current detection is exactly `IntlRo` plus `/`.

## Requirements

- JupyterLab 4.x (the extension declares `>=4.0.0 <5.0.0` compatibility);
- Node.js 18.18 or newer for development;
- a Brazilian ABNT2 keyboard if the layout-specific behavior is needed.

## Installation

Install the package from a built repository checkout:

```sh
yarn install
yarn build
yarn pack
```

Then install the generated JavaScript package with your preferred package manager. This project is a JavaScript JupyterLab extension only; it does not publish a Python package, and this repository does not publish to npm or PyPI as part of its CI.

## Development

Corepack provides the pinned Yarn version:

```sh
corepack enable
yarn install
yarn typecheck
yarn build
```

The build emits the TypeScript library in `lib/` and the JupyterLab prebuilt assets in `static/`. Generated `lib/` output is ignored; `static/` is included in the distributable package.

## Compatibility and limitations

The extension is designed for JupyterLab 4 CodeMirror editors. It does not change JupyterLab's behavior for other layouts, other key combinations, non-CodeMirror fields, or shortcuts outside `.cm-editor`. It does not provide a Python server extension and makes no network requests, stores no keyboard events, and adds no telemetry.
