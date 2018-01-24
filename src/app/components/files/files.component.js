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
        constructor($scope, $window, $mdToast, $mdDialog, localStorageService, FilesService, ProjectsService, CollectivesService, GeneralTopicsService, SpecificTopicsService, ContentTypesService, KeyWordsService, $stateParams, $state, ResponseHandler, UsersService) {
            'ngInject';

            this.$scope = $scope;
            this.$window = $window;
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
            this.ResponseHandler = ResponseHandler;
            this.UsersService = UsersService;
        }

        $onInit() {
            if (this.$stateParams.prevState === 'login') {
                // Reload state to load menús
                /* this.$state.go(this.$state.current, { prevState: 'files' }, { reload: true }); */
                this.$window.location.reload();
                return;
            }

            this.fileTypes = ['avi', 'doc', 'jpg', 'mov', 'mp3', 'mpg', 'pdf', 'png', 'ppt', 'txt', 'wmv', 'xls', 'zip'];
            this.user = this.localStorageService.get('user');
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
                    idComunarrProject: undefined,
                    idCollective: undefined,
                    idGeneralTopic: undefined,
                    uploadedByMe: true
                },
                specific: this.FilesService.getSpecificFilters()
            };
            this.results = [];

            this.$scope.fileChanged = this.fileChanged;

            this.ProjectsService.get().then(comunarrProjects => this.comunarrProjects = comunarrProjects);

            // Build collectives
            this.CollectivesService.getRelatedProjects().then(relations => {
                this.CollectivesService.get().then(collectives => {
                    collectives.forEach(collective => {
                        const relation = relations.filter(relation => relation.idCollective === collective.id);
                        collective.idComunarrProject = relation.length > 0 ? relation[0].idComunarrProject : null;
                    });
                    this.collectives = collectives;
                });
            });

            this.GeneralTopicsService.get().then(generalTopics => this.generalTopics = generalTopics);

            // Build specific topics
            this.SpecificTopicsService.getRelatedGeneralTopics().then(relations => {
                this.SpecificTopicsService.get().then(specificTopics => {
                    specificTopics.forEach(specificTopic => {
                        const relation = relations.filter(relation => relation.idSpecificTopic === specificTopic.id);
                        specificTopic.idGeneralTopic = relation.length > 0 ? relation[0].idGeneralTopic : null;
                    });
                    this.specificTopics = specificTopics;
                });
            });
            this.ContentTypesService.get().then(contentTypes => this.contentTypes = contentTypes.filter(ct => ct.status));

            this.keyWords = [];
            this.getKeyWords(false);

            this.FilesService.getFileTypes().then(fileTypesCatalog => this.fileTypesCatalog = fileTypesCatalog);
            this.UsersService.get().then(data => this.users = data);
        }

        /**
         * Validate if at least one of the simple filters is selected or has been selected once
         * @param {any} filters 
         * @return {bool}
         */
        isAtLeastOneFilterSelected(filters) {
            let { name, author, idComunarrProject, idCollective, idGeneralTopic, uploadedByMe } = filters;
            return (uploadedByMe) ||
                (uploadedByMe === false && (name && name.length > 0) || (author && author.length > 0) || !!idComunarrProject || !!idCollective || !!idGeneralTopic);
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

            const filters = searchType === 'simple' ? angular.copy(this.filters.simple) : angular.copy(this.filters.specific);

            // Hide filters UI
            if (searchType === 'simple') {
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
                    autoWrap: false,
                    escapeToClose: false,
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogFormTemplate
                })
                .then(formData => {
                    formData.keyWords = formData.keyWords.map(keyWord => keyWord.name);
                    for (const key in formData) {
                        if (formData.hasOwnProperty(key)) {
                            if (!formData[key]) {
                                delete formData[key];
                            }
                        }
                    }

                    if (formData.relatedDate) {

                        if (formData.relatedDate.toISOString) {
                            formData.relatedDate = formData.relatedDate.toISOString().substring(0, 10);
                        } else {
                            formData.relatedDate = formData.relatedDate.substring(0, 10);
                        }
                    }

                    this.FilesService[method](formData).then(() => {
                        this.$mdToast.show(this.$mdToast.simple()
                            .textContent('Éxito: se subió de forma correcta el archivo')
                            .position('top right')
                        );
                        this.form = {};
                        this.isEditing = false;
                        this.getKeyWords(true);
                        this.search(this.selectedTabIndex === 1 ? 'specific' : 'simple');
                    });
                })
                .catch(err => {
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
         * Validate that chip's name has a length > 4
         * @param {any} $chip { name: string }
         */
        validateChip($chip) {
            if (typeof $chip === 'object' && $chip.name.length < 4) {
                this.$mdToast.show(this.$mdToast.simple()
                    .textContent('Cada palabra clave debe tener una longitud mayor a 4')
                    .position('top right')
                );
                this.form.keyWords.pop();
            }
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

        /**
         * Download physical file from server
         * @param {*} fileResult
         */
        download(fileResult) {
            this.FilesService.download(fileResult.id).then(this.ResponseHandler.success);
        }

        /**
         * Validate if the form is correct
         * @param {any} filters 
         */
        isSpecificSearchFormValid(filters) {
            let isValid = true;
            const textFilters = ['author', 'place'];
            const idFilters = ['idComunarrProject', 'idCollective', 'idGeneralTopic', 'idSpecificTopic', 'idUser', 'idContentType', 'idFileType', 'keyWords'];
            const dateFilters = ['updateDate', 'relatedDate'];


            isValid = (filters.name && filters.name.length > 0) || textFilters.some(key => filters[key][0].value.length > 0) || idFilters.some(key => filters[key][0].id !== null) || (dateFilters.some(key => filters[key][0] !== null || filters[key][1] !== null));

            return isValid;
        }
    },
    template
};