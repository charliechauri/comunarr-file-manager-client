/**
 * @name InstitutionsModule
 * @description Module for institutions management
 */
import angular from 'angular';
import { InstitutionsService } from './institutions.service';
import { InstitutionsComponent } from './institutions.component';

export const InstitutionsModule = angular
    .module('co-file-manager-client.institutions', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('institutions', {
                url: '/instituciones',
                component: 'coInstitutions'
            });
    })
    .service('InstitutionsService', InstitutionsService)
    .component('coInstitutions', InstitutionsComponent)
    .name;