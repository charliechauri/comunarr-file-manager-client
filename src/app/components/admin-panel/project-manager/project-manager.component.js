import angular from 'angular';
import template from './project-manager.html';
import dialogTemplate from './project-manager.dialog.html';

export const ProjectManagerComponent = {
    bindings: {},
    controller: class ProjectManagerComponent {
        constructor($scope, $mdDialog, $mdToast, ProjectManager, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.$mdToast = $mdToast;
            this.ProjectManager = ProjectManager;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        $onInit() {
            this.projects = [];
            this.getProjects();
        }

        getProjects() {
            return this.ProjectManager.get().then(projects => this.projects = projects);
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
                    if (!this.Validator.isUnique(this.projects, 'name', this.selectedProject, this.isEditing, true, 'proyecto')) {
                        this.selectedProject = null;
                        return;
                    }
                    this.ProjectManager[method](project).then(this.ResponseHandler.success);
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