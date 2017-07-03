import angular from 'angular';
import template from './files.html';
import dialogTemplate from './files.dialog.html';

export const FilesComponent = {
    bindings: {},
    controller: class FilesComponent {
        constructor($scope, $mdToast, $mdDialog, FilesService, ProjectsService, CollectivesService, GeneralTopicsService, SpecificTopicsService, ContentTypesService) {
            'ngInject';

            this.$scope = $scope;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.FilesService = FilesService;

            // Fill all catalogs
            ProjectsService.get().then(comunarrProjects => this.comunarrProjects = comunarrProjects);
            CollectivesService.get().then(data => this.collectives = data);
            GeneralTopicsService.get().then(generalTopics => this.generalTopics = generalTopics);
            SpecificTopicsService.get().then(specificTopics => this.specificTopics = specificTopics);
            ContentTypesService.get().then(contentTypes => this.contentTypes = contentTypes);
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
            this.filters = this.FilesService.getSimpleFilters();
            this.results = [];

            this.$scope.fileChanged = this.fileChanged;
        }

        /**
         * Search information based on filters and search type
         * @param {string} searchType
         * @todo
         */
        search(searchType) {
            if (searchType === 'simple') {
                this.showSimpleSearchFilters = false;
            } else if (searchType === 'specific') {
                this.showSpecificSearchFilters = false;
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
         * Add new file
         * @param {any} targetEvent
         * @param {string} method
         */
        addOrEditFile(targetEvent, method) {
            this.isEditing = method !== 'add';
            this.$mdDialog
                .show({
                    escapeToClose: false,
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
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
                });
        }

        /**
         * Add filter element
         * @param {string} key
         * @param {string} type
         */
        addFilter(key, type) {
            if (this.filters[key].length <= 5) {
                if (type === 'value') {
                    this.filters[key].push({ value: '', op: 'OR' });
                } else if (type === 'id') {
                    this.filters[key].push({ id: null, op: 'OR' });
                }
            }
        }

        /**
         * Delete filter element
         * @param {string} key
         * @param {string} type
         * @param {any} item
         */
        deleteFilter(key, type, item) {
            this.filters[key].splice(this.filters[key].map(filter => filter.value).indexOf(item[type]), 1);
        }

        /**
         * Mostrar detalle de resultado
         * @param {any} result
         */
        showDetail(result) {
            this.$mdDialog.show({
                template: dialogTemplate,
                locals: { result }
            });
        }
    },
    template
};