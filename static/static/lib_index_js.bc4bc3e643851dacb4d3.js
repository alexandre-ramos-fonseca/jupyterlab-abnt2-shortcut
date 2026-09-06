"use strict";
(self["webpackChunkjupyterlab_abnt2_shortcut"] = self["webpackChunkjupyterlab_abnt2_shortcut"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js"
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const COMMAND_ID = 'codemirror:toggle-comment';
const plugin = {
    id: 'jupyterlab-abnt2-shortcut:plugin',
    description: 'Enable Ctrl+/ on Brazilian ABNT2 keyboards.',
    autoStart: true,
    activate: (app) => {
        const handler = (event) => {
            if (!event.ctrlKey ||
                event.altKey ||
                event.metaKey ||
                event.shiftKey ||
                event.code !== 'IntlRo' ||
                event.key !== '/') {
                return;
            }
            const target = event.target;
            if (!(target instanceof Element) ||
                target.closest('.cm-editor') === null) {
                return;
            }
            if (!app.commands.hasCommand(COMMAND_ID) ||
                !app.commands.isEnabled(COMMAND_ID)) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ }

}]);
//# sourceMappingURL=lib_index_js.bc4bc3e643851dacb4d3.js.map