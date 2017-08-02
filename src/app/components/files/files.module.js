import angular from 'angular';
import { FilesService } from './files.service';
import { FileInputDirective } from './file-input/file-input.directive';
import { FilesComponent } from './files.component';

export const FilesModule = angular
    .module('co-file-manager-client.files', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('files', {
                url: '/busqueda-de-archivos',
                component: 'coFiles',
                params: {
                    prevState: ''
                }
            });
    })
    .service('FilesService', FilesService)
    .directive('fileInput', FileInputDirective)
    .component('coFiles', FilesComponent)
    .name;