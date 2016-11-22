'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.storeFactory = storeFactory;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function storeFactory(rx, dispatcher) {
    return function store(reducers) {
        var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var STATE_CHANGED = new rx.Subject();

        dispatcher.subscribe(function (action) {
            var result = void 0;

            if (_.isFunction(reducers)) {
                result = reduceState(action, state, reducers);
            } else {
                result = _.reduce(reducers, _.partial(reduceState, action), state);
            }

            STATE_CHANGED.onNext(_.assign(state, result));
        });

        return {
            getState: getState,
            connect: connect,
            reset: reset
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
        function connect(scope, key) {
            var _rx$Observable$merge;

            var distinct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var props = key.split('.');

            var observable = (_rx$Observable$merge = rx.Observable.merge(rx.Observable.of(state), STATE_CHANGED)).pluck.apply(_rx$Observable$merge, _toConsumableArray(props));

            if (distinct) {
                observable = observable.distinctUntilChanged(_.identity, _.isEqual);
            }

            return observable.filter(angular.isDefined).takeUntil(scope.$eventToObservable('$destroy'));
        }
    };

    function reduceState(action, currentState, reducer, key) {
        var result = void 0;

        if (key) {
            result = reducer(currentState[key], action);
            return _extends({}, currentState, _defineProperty({}, key, result));
        }

        return reducer(currentState, action);
    }
}

exports.default = storeFactory;