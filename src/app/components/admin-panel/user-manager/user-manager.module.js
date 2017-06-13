import angular from 'angular';
import { UserManager } from './user-manager.service';
import { UserManagerComponent } from './user-manager.component';

export const UserManagerModule = angular
    .module('co-file-manager-client.admin-panel.user-manager', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('user-manager', {
                url: '/administrar-usuarios',
                component: 'coUserManager'
            });
    })
    .service('UserManager', UserManager)
    .component('coUserManager', UserManagerComponent)
    .name;