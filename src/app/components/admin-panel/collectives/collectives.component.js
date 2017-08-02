import angular from 'angular';
import template from './collectives.html';
import dialogTemplate from './collectives.dialog.html';

export const CollectivesComponent = {
    bindings: {},
    controller: class CollectivesComponent {
        constructor($scope, $mdDialog, CollectivesService, ProjectsService, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.CollectivesService = CollectivesService;
            this.ProjectsService = ProjectsService;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        /**
         * Gets all collectives, projects and the relationship between them. Then build for each collective adds the related projects
         */
        $onInit() {
            this.collectives = [];
            this.assignProjectIdIntoCollectives(false);
        }

        /**
         * Get all collectives
         */
        getCollectives(forceRefresh) {
            return this.CollectivesService.get(forceRefresh).then(collectives => this.collectives = collectives);
        }

        /**
         * Get all projects
         */
        getProjects(forceRefresh) {
            return this.ProjectsService.get(forceRefresh).then(projects => this.projects = projects);
        }

        assignProjectIdIntoCollectives(forceRefresh) {
            this.CollectivesService.getRelatedProjects(forceRefresh).then(relations => {
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
                    collective.name === collective.name.trim();
                    if (!this.Validator.isUnique(this.collectives, 'name', this.selectedCollective, this.isEditing, true, 'colectivo')) {
                        this.selectedCollective = null;
                        return;
                    }

                    if (!this.isEditing) {
                        delete collective.id;
                        delete collective.status;
                    }
                    this.CollectivesService[method](collective).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedCollective = this.getNewCollective();
                        this.assignProjectIdIntoCollectives(true);
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