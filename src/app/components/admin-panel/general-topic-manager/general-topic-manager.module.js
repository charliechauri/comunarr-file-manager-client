import angular from 'angular';
import { GeneralTopicManager } from './general-topic-manager.service';
import { GeneralTopicManagerComponent } from './general-topic-manager.component';

export const GeneralTopicManagerModule = angular
    .module('co-file-manager-client.admin-panel.general-topic-manager', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('general-topic-manager', {
                url: '/administrar-temas-generales',
                component: 'coGeneralTopicManager'
            });
    })
    .service('GeneralTopicManager', GeneralTopicManager)
    .component('coGeneralTopicManager', GeneralTopicManagerComponent)
    .name;