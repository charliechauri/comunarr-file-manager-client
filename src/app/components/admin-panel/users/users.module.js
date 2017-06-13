import angular from 'angular';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';

export const UsersModule = angular
    .module('co-file-manager-client.admin-panel.users', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('users', {
                url: '/administrar-usuarios',
                component: 'coUsers'
            });
    })
    .service('UsersService', UsersService)
    .component('coUsers', UsersComponent)
    .name;