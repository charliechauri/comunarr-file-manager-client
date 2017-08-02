/**
 * @todo
 * 1. Assign correct models to filters.specific
 */
import angular from 'angular';
import template from './files.html';
import dialogFormTemplate from './files.form.dialog.html';
import dialogDetailsTemplate from './files.details.dialog.html';

export const FilesComponent = {
    bindings: {},
    controller: class FilesComponent {
        constructor($scope, $mdToast, $mdDialog, localStorageService, FilesService, ProjectsService, CollectivesService, GeneralTopicsService, SpecificTopicsService, ContentTypesService, KeyWordsService, $stateParams, $state) {
            'ngInject';

            this.$scope = $scope;
            this.$mdToast = $mdToast;
            this.$mdDialog = $mdDialog;
            this.localStorageService = localStorageService;
            this.FilesService = FilesService;

            this.ProjectsService = ProjectsService;
            this.CollectivesService = CollectivesService;
            this.GeneralTopicsService = GeneralTopicsService;
            this.SpecificTopicsService = SpecificTopicsService;
            this.ContentTypesService = ContentTypesService;
            this.KeyWordsService = KeyWordsService;
            this.$stateParams = $stateParams;
            this.$state = $state;
        }

        $onInit() {
            if (this.$stateParams.prevState === 'login') {
                // Reload state to load menús
                this.$state.go(this.$state.current, { prevState: 'files' }, { reload: true });
                return;
            }

            this.fileTypes = ['avi', 'doc', 'jpg', 'mov', 'mp3', 'mpg', 'pdf', 'png', 'ppt', 'txt', 'wmv', 'xls', 'zip'];
            this.userInfo = this.localStorageService.get('userInfo');
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
                    idComunarrProject: null,
                    idCollective: null,
                    idGeneralTopic: null,
                    uploadedByMe: false
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

                        console.log(collective);
                        console.log(relations);
                        collective.idComunarrProject = relations.filter(relation => relation.idCollective === collective.id)[0].idComunarrProject;
                        console.log(collective);
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

            this.keyWords = [];
            this.getKeyWords(false);
        }

        isAtLeastOneFilterSelected(filters) {
            let { name, author, idComunarrProject, idCollective, idGeneralTopic, uploadedByMe } = filters;

            return uploadedByMe || (name && name.length > 0) || (author && author.length) || !!idComunarrProject || !!idCollective || !!idGeneralTopic;
        }

        /**
         * Gets all registered keywords
         * @param {boolean} forceRefresh
         */
        getKeyWords(forceRefresh) {
            return this.KeyWordsService.get(forceRefresh).then(keyWords => this.keyWords = keyWords);
        }

        /**
         * Filter keywords by users input
         */
        filterKeyWords(query) {
            return query ? this.keyWords.filter(keyWord => {
                let lowercaseQuery = angular.lowercase(query);
                const re = new RegExp(lowercaseQuery, 'g');
                return keyWord.name.match(re);
            }) : this.keyWords;
        }

        /**
         * Search information based on filters and search type
         * @param {string} searchType
         * @todo
         */
        search(searchType) {
            this.searchPerformed = true;
            this.results = [];

            const filters = searchType === 'simple' ? this.filters.simple : this.filters.specific;

            // Hide filters UI
            if (searchType === 'simple') {
                this.showSimpleSearchFilters = false;
                this.FilesService.simpleSearch(filters).then(data => {
                    this.setResults(data, this);
                });
            } else if (searchType === 'specific') {
                this.showSpecificSearchFilters = false;
                this.FilesService.specificSearch(filters).then(data => {
                    this.setResults(data, this);
                });
            }
        }

        /**
         * Change all image files
         * @param {any} data
         */
        setResults(data, ctrl) {
            data.forEach(item => {
                item.fileTypeImage = 'default';
                for (let index = 0, length = ctrl.fileTypes.length; index < length; index++) {
                    if (item.fileType.indexOf(ctrl.fileTypes[index]) !== -1) {
                        item.fileTypeImage = ctrl.fileTypes[index];
                        break;
                    }
                }
            });

            ctrl.results = data;
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
                this.selectedKeyWord = null;
                this.searchText = '';
                this.isEditing = true;
                this.form = angular.copy(file);

                this.form.keyWords = file.idKeyWord && file.idKeyWord.length > 0 ? file.idKeyWord.map(id => {
                    return this.keyWords.find(keyWord => keyWord.id === id);
                }) : [];

                file.keyWords = angular.copy(this.form.keyWords);
            } else {
                this.form = {};
                this.form.keyWords = [];
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
                    formData.keyWords = formData.keyWords.map(keyWord => keyWord.name);

                    this.FilesService.post(formData).then(() => {
                        this.$mdToast.show(this.$ctrl.$mdToast.simple()
                            .textContent('Éxito: se subió de forma correcta el archivo')
                            .position('top right')
                        );
                        this.form = {};
                        this.isEditing = false;
                    });
                })
                .catch(() => {
                    this.form = {};
                    this.isEditing = false;
                });
        }

        /**
         * Add keyword to file editing or creating
         * @param {any} $chip
         */
        addKeyWord($chip) {
            return (typeof $chip === 'object') ? $chip : { name: $chip };
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
         * @param {any} generalTopicFilters
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
         * @param {any} targetEvent
         */
        showDetail(result, targetEvent) {
            this.form = angular.copy(result);

            this.form.keyWords = result.idKeyWord && result.idKeyWord.length > 0 ? result.idKeyWord.map(id => {
                return this.keyWords.find(keyWord => keyWord.id === id);
            }) : [];

            console.log(this.form.keyWords);

            this.$mdDialog.show({
                preserveScope: true,
                scope: this.$scope,
                targetEvent,
                template: dialogDetailsTemplate
            }).then(() => {
                this.form = {};
            });
        }

        resetResults() {
            this.searchPerformed = false;
            this.results = [];
        }
    },
    template
};