"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dispatcherFactory = dispatcherFactory;
function dispatcherFactory(rx) {
    var ACTION_DISPATCH = new rx.Subject();

    return {
        dispatch: dispatch,
        subscribe: subscribe
    };

    /**
     * dispatch
     *
     * dispatchs the given action to all the stores that are subscribed
     *
     * @param {Action} action a action to be dispatched
     */
    function dispatch(action) {
        ACTION_DISPATCH.onNext(action);
    }

    /**
     * subscribe
     *
     * @param {function} callback a callback to be called when a new action is dispatched
     * @returns {Observer} Observer
     */
    function subscribe(callback) {
        return ACTION_DISPATCH.subscribe(callback);
    }
}

exports.default = dispatcherFactory;