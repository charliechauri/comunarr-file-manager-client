import template from './files.html';
import dialogTemplate from './files.dialog.html';

export const FilesComponent = {
    bindings: {},
    controller: class FilesComponent {
        constructor($mdDialog, FilesService, ProjectsService, CollectivesService, GeneralTopicsService, SpecificTopicsService, ContentTypesService) {
            'ngInject';
            this.$mdDialog = $mdDialog;
            this.FilesService = FilesService;
            this.ProjectsService = ProjectsService;
            this.CollectivesService = CollectivesService;
            this.GeneralTopicsService = GeneralTopicsService;
            this.SpecificTopicsService = SpecificTopicsService;
            this.ContentTypesService = ContentTypesService;
        }

        $onInit() {
            this.JSON = JSON;
            this.collectives = [];
            this.comunarrProjects = [];
            this.generalTopics = [];
            this.specificTopics = [];
            this.contentTypes = [];

            this.showSimpleSearchFilters = true;
            this.showSpecificSearchFilters = true;
            this.filters = this.FilesService.getSimpleFilters();
            this.results = [];
            this.getProjects();
            this.getCollectives();
            this.getGeneralTopics();
            this.getSpecificTopics();
            this.getContentTypes();
            this.results = [
                {
                    id: 1,
                    title: 'Relatoria PROFECTAR Sisoguichi agosto 2016. Autonomía de pueblos originarios',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 2,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 3,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 4,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 5,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 6,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 7,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 8,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 9,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                },
                {
                    id: 10,
                    title: 'Archivo 1',
                    author: 'Emma Medrano',
                    comunarrProject: 'Economía solidaria',
                    collective: 'Samachique',
                    generalTopic: 'Artesanía',
                    icon: 'img/docs-icons/avi.svg'
                }
            ];
        }

        /**
        * Get all projects
        */
        getProjects() {
            return this.ProjectsService.get().then(comunarrProjects => this.comunarrProjects = comunarrProjects);
        }

        /**
         * Gets all collectives
         */
        getCollectives() {
            return this.CollectivesService.get().then(data => this.collectives = data);
        }

        /**
         * Get all general topics
         */
        getGeneralTopics() {
            return this.GeneralTopicsService.get().then(generalTopics => this.generalTopics = generalTopics);
        }

        /**
         * Get all specific topics
         */
        getSpecificTopics() {
            return this.SpecificTopicsService.get().then(specificTopics => this.specificTopics = specificTopics);
        }

        /**
         * Get all content types
         */
        getContentTypes() {
            return this.ContentTypesService.get().then(contentTypes => this.contentTypes = contentTypes);
        }

        /**
         * Set results to an empty array
         */
        resetResults() {
            this.results = [];
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