export function storeFactory(rx, dispatcher) {
    return function store(reducers, state = {}) {
        const STATE_CHANGED = new rx.Subject();

        dispatcher.subscribe((action) => {
            let result;

            if (_.isFunction(reducers)) {
                result = reduceState(action, state, reducers);
            } else {
                result = _.reduce(reducers, _.partial(reduceState, action), state);
            }

            STATE_CHANGED.onNext(_.assign(state, result));
        });

        return {
            getState,
            connect,
            reset
        };

        /**
         * getState
         *
         * @returns the current store state
         */
        function getState() {
            return state;
        }

        /**
         * reset - it resets the current store state
         */
        function reset() {
            state = {};
            STATE_CHANGED.onNext(state);
        }

        /**
         * connect
         *
         * @param {$scope} Angular $scope
         * @param {String} The path that will be watched
         * @param {boolean} [distinct=true] A flag to say if only notify when a different item was emitted
         * @returns {Observable} Observable to be subscribed
         */
        function connect(scope, key, distinct = true) {
            const props = key.split('.');

            let observable = rx.Observable
                .merge(rx.Observable.of(state), STATE_CHANGED)
                .pluck(...props);

            if (distinct) {
                observable = observable.distinctUntilChanged(_.identity, _.isEqual);
            }

            return observable
                .filter(angular.isDefined)
                .takeUntil(scope.$eventToObservable('$destroy'));
        }
    };

    function reduceState(action, currentState, reducer, key) {
        let result;

        if (key) {
            result = reducer(currentState[key], action);
            return { ...currentState, [key]: result };
        }

        return reducer(currentState, action);
    }
}

export default storeFactory;
