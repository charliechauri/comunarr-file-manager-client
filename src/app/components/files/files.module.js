import angular from 'angular';
import { FilesService } from './files.service';
import { FilesComponent } from './files.component';

export const FilesModule = angular
    .module('co-file-manager-client.files', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('files', {
                url: '/busqueda-de-archivos',
                component: 'coFiles'
            });
    })
    .service('FilesService', FilesService)
    .component('coFiles', FilesComponent)
    .name;