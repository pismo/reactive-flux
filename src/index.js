import angular from 'angular';
import rxAngular from 'rx-angular';
import storeFactory from './lib/store';
import dispatcherFactory from './lib/dispatcher';

export const fluxModule = angular
    .module('reactive-flux', ['rx'])
    .factory('store', storeFactory)
    .factory('dispatcher', dispatcherFactory);

export default fluxModule;
 
