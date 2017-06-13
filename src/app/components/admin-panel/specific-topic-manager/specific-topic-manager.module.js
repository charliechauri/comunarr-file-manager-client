import angular from 'angular';
import { SpecificTopicManager } from './specific-topic-manager.service';
import { SpecificTopicManagerComponent } from './specific-topic-manager.component';

export const SpecificTopicManagerModule = angular
    .module('co-file-manager-client.admin-panel.specific-topic-manager', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('specific-topic-manager', {
                url: '/administrar-temas-especificos',
                component: 'coSpecificTopicManager'
            });
    })
    .service('SpecificTopicManager', SpecificTopicManager)
    .component('coSpecificTopicManager', SpecificTopicManagerComponent)
    .name;