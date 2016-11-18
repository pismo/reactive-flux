export function dispatcherFactory(rx) {
    const ACTION_DISPATCH = new rx.Subject();

    return {
        dispatch,
        subscribe
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

export default dispatcherFactory;