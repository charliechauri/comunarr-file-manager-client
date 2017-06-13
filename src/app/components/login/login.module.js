import angular from 'angular';
import { LoginComponent } from './login.component';

export const LoginModule = angular
    .module('co-file-manager-client.login', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('login', {
                url: '/iniciar-sesion',
                component: 'coLogin'
            });
    })
    .component('coLogin', LoginComponent)
    .name;