import angular from 'angular';
import { CollectivesService } from './collectives.service';
import { CollectivesComponent } from './collectives.component';

export const CollectivesModule = angular
    .module('co-file-manager-client.admin-panel.collectives', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('collectives', {
                url: '/administrar-colectivos',
                component: 'coCollectives'
            });
    })
    .service('CollectivesService', CollectivesService)
    .component('coCollectives', CollectivesComponent)
    .name;