import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

const COMMAND_ID = 'codemirror:toggle-comment';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-abnt2-shortcut:plugin',
  description: 'Enable Ctrl+/ on Brazilian ABNT2 keyboards.',
  autoStart: true,

  activate: (app: JupyterFrontEnd): void => {
    const handler = (event: KeyboardEvent): void => {
      if (
        !event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.shiftKey ||
        event.code !== 'IntlRo' ||
        event.key !== '/'
      ) {
        return;
      }

      const target = event.target;

      if (
        !(target instanceof Element) ||
        target.closest('.cm-editor') === null
      ) {
        return;
      }

      if (
        !app.commands.hasCommand(COMMAND_ID) ||
        !app.commands.isEnabled(COMMAND_ID)
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      void app.commands.execute(COMMAND_ID).catch(error => {
        console.error('jupyterlab-abnt2-shortcut:', error);
      });
    };

    window.addEventListener('keydown', handler, true);
  }
};

export default plugin;
