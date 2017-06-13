import angular from 'angular';
import { UserComponent } from './user.component';

export const UserModule = angular
    .module('co-file-manager-client.user', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('user', {
                url: '/usuario',
                component: 'coUser'
            });
    })
    .component('coUser', UserComponent)
    .name;