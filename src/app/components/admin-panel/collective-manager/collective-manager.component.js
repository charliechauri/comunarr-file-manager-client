import angular from 'angular';
import template from './collective-manager.html';
import dialogTemplate from './collective-manager.dialog.html';

export const CollectiveManagerComponent = {
    bindings: {},
    controller: class CollectiveManagerComponent {
        constructor($scope, $mdDialog, CollectiveManager, ProjectManager, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.CollectiveManager = CollectiveManager;
            this.ProjectManager = ProjectManager;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        /**
         * Gets all collectives, projects and the relationship between them. Then build for each collective adds the related projects
         */
        $onInit() {
            this.collectives = [];
            this.CollectiveManager.getRelatedProjects().then(relations => {
                this.getCollectives().then(() => {
                    this.getProjects().then(() => {
                        this.collectives.forEach(collective => {
                            collective.comunarrProjects = [];

                            const relationsToCollective = relations.filter(relation => relation.idCollective === collective.id);

                            relationsToCollective.forEach(relationToCollective => {
                                collective.comunarrProjects.push(this.projects.find(project => project.id === relationToCollective.idComunarrProject));
                            });
                        });
                    });
                });
            });
        }

        /**
         * Get all collectives
         */
        getCollectives() {
            return this.CollectiveManager.get().then(collectives => this.collectives = collectives);
        }

        /**
         * Get all projects
         */
        getProjects() {
            return this.ProjectManager.get().then(projects => this.projects = projects);
        }

        /**
         * Validate if a project is in a collective
         * @param {any} project
         * @param {any} collective
         */
        isProjectInCollective(project, collective) {
            return collective.comunarrProjects.find(pro => pro.id === project.id);
        }


        /**
         * Add/remove a project in a collective
         * @param {any} project
         * @param {any} collective
         */
        toggleProjectToCollective(project, collective) {
            const isAlready = collective.comunarrProjects.find(pro => pro.id === project.id);

            if (isAlready) {
                const index = collective.comunarrProjects.map(pro => pro.id).indexOf(project.id);
                collective.comunarrProjects.splice(index, 1);
            } else {
                collective.comunarrProjects.push(project);
            }
        }

        /**
         * Add or update a collective
         * @param {any} collective
         * @param {any} targetEvent
         * @param {string} method 
         */
        addOrEdit(collective = this.getNewCollective(), targetEvent, method) {
            this.isEditing = !!collective.id;
            this.selectedCollective = angular.copy(collective);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(collective => {
                    if (!this.Validator.isUnique(this.collectives, 'name', this.selectedCollective, this.isEditing, true, 'colectivo')) {
                        this.selectedCollective = null;
                        return;
                    }
                    this.CollectiveManager[method](collective).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedCollective = this.getNewCollective();
                    });
                })
                .catch(() => {
                    this.selectedCollective = this.getNewCollective();
                });
        }

        /**
         * Returns a new instance of a collective
         * @return {any}
         */
        getNewCollective() {
            return { id: null, name: '', status: true, comunarrProjects: [] };
        }
    },
    template
};