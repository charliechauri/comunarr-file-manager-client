import angular from 'angular';
import { SpecificTopicsService } from './specific-topics.service';
import { SpecificTopicsComponent } from './specific-topics.component';

export const SpecificTopicsModule = angular
    .module('co-file-manager-client.admin-panel.specific-topics', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('specific-topics', {
                url: '/administrar-temas-especificos',
                component: 'coSpecificTopics'
            });
    })
    .service('SpecificTopicsService', SpecificTopicsService)
    .component('coSpecificTopics', SpecificTopicsComponent)
    .name;