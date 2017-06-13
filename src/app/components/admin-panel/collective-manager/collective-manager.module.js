import angular from 'angular';
import { CollectiveManager } from './collective-manager.service';
import { CollectiveManagerComponent } from './collective-manager.component';

export const CollectiveManagerModule = angular
    .module('co-file-manager-client.admin-panel.collective-manager', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('collective-manager', {
                url: '/administrar-colectivos',
                component: 'coCollectiveManager'
            });
    })
    .service('CollectiveManager', CollectiveManager)
    .component('coCollectiveManager', CollectiveManagerComponent)
    .name;