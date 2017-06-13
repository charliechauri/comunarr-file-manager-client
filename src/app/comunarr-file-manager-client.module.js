import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import ngLoadingBar from 'angular-loading-bar';
import { AdminPanelModule } from './components/admin-panel/admin-panel.module';
import { FilesModule } from './components/files/files.module';
import { UserModule } from './components/user/user.module';
import { LoginModule } from './components/login/login.module';
import { CommonModule } from './common/common.module';
import { ComunarrFileManagerClientComponent } from './comunarr-file-manager-client.component';

import 'angular-material/angular-material.min.css';
import 'angular-loading-bar/build/loading-bar.css';
import './comunarr-file-manager-client.css';

export const ComunarrFileManagerClient = angular
    .module('co-file-manager-client', [
        uiRouter,
        ngAnimate,
        ngAria,
        ngMaterial,
        ngMessages,
        ngSanitize,
        ngLoadingBar,
        AdminPanelModule,
        FilesModule,
        UserModule,
        LoginModule,
        CommonModule
    ])
    .config($urlRouterProvider => {
        'ngInject';
        $urlRouterProvider.otherwise('/busqueda-de-archivos');
    })
    .config($mdThemingProvider => {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue-grey')
            .warnPalette('red');
    })
    .component('coFileManagerClient', ComunarrFileManagerClientComponent)
    .name;