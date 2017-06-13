/**
 * @name ContentTypesModule
 * @description Module for content types management
 */
import angular from 'angular';
import { ContentTypesService } from './content-types.service';
import { ContentTypesComponent } from './content-types.component';

export const ContentTypesModule = angular
    .module('co-file-manager-client.content-types', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('content-types', {
                url: '/tipos-de-contenido',
                component: 'coContentTypes'
            });
    })
    .service('ContentTypesService', ContentTypesService)
    .component('coContentTypes', ContentTypesComponent)
    .name;