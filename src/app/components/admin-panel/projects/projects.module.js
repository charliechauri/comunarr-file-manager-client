import angular from 'angular';
import { ProjectsService } from './projects.service';
import { ProjectsComponent } from './projects.component';

export const ProjectsModule = angular
    .module('co-file-manager-client.admin-panel.projects', [])
    .config($stateProvider => {
        'ngInject';

        $stateProvider
            .state('projects', {
                url: '/administrar-proyectos',
                component: 'coProjects'
            });
    })
    .service('ProjectsService', ProjectsService)
    .component('coProjects', ProjectsComponent)
    .name;