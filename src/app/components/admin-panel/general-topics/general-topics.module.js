import angular from 'angular';
import { GeneralTopicsService } from './general-topics.service';
import { GeneralTopicsComponent } from './general-topics.component';

export const GeneralTopicsModule = angular
    .module('co-file-manager-client.admin-panel.general-topics', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('general-topics', {
                url: '/administrar-temas-generales',
                component: 'coGeneralTopics'
            });
    })
    .service('GeneralTopicsService', GeneralTopicsService)
    .component('coGeneralTopics', GeneralTopicsComponent)
    .name;