import angular from 'angular';
import { ProjectManager } from './project-manager.service';
import { ProjectManagerComponent } from './project-manager.component';

export const ProjectManagerModule = angular
    .module('co-file-manager-client.admin-panel.project-manager', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('project-manager', {
                url: '/administrar-proyectos',
                component: 'coProjectManager'
            });
    })
    .service('ProjectManager', ProjectManager)
    .component('coProjectManager', ProjectManagerComponent)
    .name;