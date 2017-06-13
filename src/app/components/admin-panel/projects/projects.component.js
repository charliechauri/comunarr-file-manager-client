import angular from 'angular';
import template from './projects.html';
import dialogTemplate from './projects.dialog.html';

export const ProjectsComponent = {
    bindings: {},
    controller: class ProjectsComponent {
        constructor($scope, $mdDialog, $mdToast, ProjectsService, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.$mdToast = $mdToast;
            this.ProjectsService = ProjectsService;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        $onInit() {
            this.projects = [];
            this.getProjects();
        }

        getProjects() {
            return this.ProjectsService.get().then(projects => this.projects = projects);
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
                    this.ProjectsService[method](project).then(this.ResponseHandler.success);
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