import angular from 'angular';
import template from './projects.html';
import dialogTemplate from './projects.dialog.html';

export const ProjectsComponent = {
    bindings: {},
    controller: class ProjectsComponent {
        constructor($scope, $mdDialog, ProjectsService, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.ProjectsService = ProjectsService;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        $onInit() {
            this.projects = [];
            this.getProjects(false);
        }

        getProjects(forceRefresh) {
            return this.ProjectsService.get(forceRefresh).then(projects => this.projects = projects);
        }

        addOrEdit(project = { id: null, name: '', status: true }, targetEvent, method) {
            this.isEditing = !!project.id;
            this.selectedProject = angular.copy(project);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(project => {
                    project.name === project.name.trim();
                    if (!this.Validator.isUnique(this.projects, 'name', this.selectedProject, this.isEditing, true, 'proyecto')) {
                        this.selectedProject = null;
                        return;
                    }
                    if (!this.isEditing) {
                        delete project.id;
                        delete project.status;
                    }
                    this.ProjectsService[method](project).then(response => {
                        this.ResponseHandler.success(response);
                        this.getProjects();
                    });
                })
                .catch(() => {
                    this.selectedProject = null;
                });
        }

        /**
         * Validate if a project name is unique
         * @param {any} project
         * @return {boolean}
         */
        isUnique(project) {
            if (project.id) { // It is for an update
                return !this.projects.some(pro => pro.name === project.name && pro.id !== project.id);
            } else { // for an addition
                return !this.projects.some(pro => pro.name === project.name);
            }
        }
    },
    template
};