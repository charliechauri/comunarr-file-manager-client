/**
 * @todo
 * 1. Add/Edit file set correct dates
 * 2. Assign correct models to filters.specific
 * 3. Display file details
 * 4. Validate who can edit a file
 */
import angular from 'angular';
import template from './files.html';
import dialogFormTemplate from './files.form.dialog.html';
import dialogDetailsTemplate from './files.details.dialog.html';

export const FilesComponent = {
    bindings: {},
    controller: class FilesComponent {
        constructor($scope, $mdToast, $mdDialog, FilesService, ProjectsService, CollectivesService, GeneralTopicsService, SpecificTopicsService, ContentTypesService) {
            'ngInject';

            this.$scope = $scope;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.FilesService = FilesService;

            this.ProjectsService = ProjectsService;
            this.CollectivesService = CollectivesService;
            this.GeneralTopicsService = GeneralTopicsService;
            this.SpecificTopicsService = SpecificTopicsService;
            this.ContentTypesService = ContentTypesService;
        }

        $onInit() {
            this.form = {};

            this.privacyTypes = [
                { id: 1, name: 'Sólo yo' },
                { id: 2, name: 'Miembros del equipo' },
                { id: 3, name: 'Todos' }
            ];
            this.showSimpleSearchFilters = true;
            this.showSpecificSearchFilters = true;
            this.filters = {
                simple: {
                    name: '',
                    author: '',
                    idProject: null,
                    idCollective: null,
                    idGeneralTopic: null
                }
            };
            this.filters.specific = this.FilesService.getSpecificFilters();
            this.results = [];

            this.$scope.fileChanged = this.fileChanged;

            this.ProjectsService.get().then(comunarrProjects => this.comunarrProjects = comunarrProjects);

            // Build collectives
            this.CollectivesService.getRelatedProjects().then(relations => {
                this.CollectivesService.get().then(collectives => {
                    collectives.forEach(collective => {
                        collective.idComunarrProject = relations.filter(relation => relation.idCollective === collective.id)[0].idComunarrProject;
                    });
                    this.collectives = collectives;
                });
            });

            this.GeneralTopicsService.get().then(generalTopics => this.generalTopics = generalTopics);

            // Build specific topics
            this.SpecificTopicsService.getRelatedGeneralTopics().then(relations => {
                this.SpecificTopicsService.get().then(specificTopics => {
                    specificTopics.forEach(specificTopic => {
                        specificTopic.idGeneralTopic = relations.filter(relation => relation.idSpecificTopic === specificTopic.id)[0].idGeneralTopic;
                    });
                    this.specificTopics = specificTopics;
                });
            });
            this.ContentTypesService.get().then(contentTypes => this.contentTypes = contentTypes);
        }

        /**
         * Search information based on filters and search type
         * @param {string} searchType
         * @todo
         */
        search(searchType) {
            this.results = [];

            const filters = searchType === 'simple' ? this.filters.simple : this.filters.specific;

            // Hide filters UI
            if (searchType === 'simple') {
                this.showSimpleSearchFilters = false;
                this.FilesService.simpleSearch(filters).then(results => this.results = results);
            } else if (searchType === 'specific') {
                this.showSpecificSearchFilters = false;
                this.FilesService.specificSearch(filters).then(results => this.results = results);
            }
        }

        /**
         * Display file selection
         */
        showSelectFile() {
            const inputFile = angular.element(document.querySelector('#fileInput'))[0];
            inputFile.click();
        }

        /**
         * Add or edit a file
         * @param {any} targetEvent
         * @param {string} method
         * @param {any} file Only on edition
         */
        addOrEditFile(targetEvent, method, file) {
            if (method === 'edit') {
                this.isEditing = true;
                this.form = angular.copy(file);
            }
            this.$mdDialog
                .show({
                    escapeToClose: false,
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogFormTemplate
                })
                .then(formData => {
                    this.FilesService.post(formData).then(response => {
                        this.$mdToast.show(this.$ctrl.$mdToast.simple()
                            .textContent('Éxito: se subió de forma correcta el archivo')
                            .position('top right')
                        );
                    });
                })
                .catch(() => {
                    this.form = {};
                    this.isEditing = false;
                });
        }

        /**
         * Add filter element
         * @param {string} key
         * @param {string} type
         */
        addFilter(key, type) {
            if (this.filters.specific[key].length <= 5) {
                this.filters.specific[key].push(type === 'value' ? { value: '', op: 'OR' } : { id: null, op: 'OR' });
            }
        }

        /**
         * Delete filter element
         * @param {string} key
         * @param {string} type
         * @param {any} item
         */
        deleteFilter(key, type, item) {
            this.filters.specific[key].splice(this.filters.specific[key].map(filter => filter.value).indexOf(item[type]), 1);
        }

        /**
         * If a collective is present in the selected projects filter returns true
         * @param {any} comunarrProjectFilters
         * @return {boolean}
         */
        filterCollective(comunarrProjectFilters) {
            return collective => {
                return comunarrProjectFilters.some(filter => filter.id === collective.idComunarrProject);
            };
        }

        /**
         * If a specific topic is present in the selected general topics filter returns true
         * @param {any} comunarrPrgeneralTopicFiltersojectFilters
         * @return {boolean}
         */
        filterSpecificTopic(generalTopicFilters) {
            return specificTopic => {
                return generalTopicFilters.some(filter => filter.id === specificTopic.idGeneralTopic);
            };
        }

        /**
         * Mostrar detalle de resultado
         * @param {any} result
         */
        showDetail(result, targetEvent) {
            this.form = angular.copy(result);

            this.$mdDialog.show({
                preserveScope: true,
                scope: this.$scope,
                targetEvent,
                template: dialogDetailsTemplate
            }).then(() => {
                this.form = {};
            });
        }
    },
    template
};