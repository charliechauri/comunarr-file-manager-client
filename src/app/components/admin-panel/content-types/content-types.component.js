/**
 * @name ContentTypesComponent
 * @description Content types management
 */

import angular from 'angular';
import template from './content-types.html';
import dialogTemplate from './content-types.dialog.html';

export const ContentTypesComponent = {
    bindings: {},
    controller: class ContentTypesComponent {
        constructor($scope, $mdDialog, ContentTypesService, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.ContentTypesService = ContentTypesService;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        /**
         * Gets all content types
         */
        $onInit() {
            this.contentTypes = [];
            this.getContentTypes();
        }

        /**
         * Get all content types
         */
        getContentTypes() {
            return this.ContentTypesService.get().then(contentTypes => this.contentTypes = contentTypes);
        }

        /**
         * Add or update a collective
         * @param {any} contentType
         * @param {any} targetEvent
         * @param {string} method 
         */
        addOrEdit(contentType = this.getNewContentType(), targetEvent, method) {
            this.isEditing = !!contentType.id;
            this.selectedContentType = angular.copy(contentType);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(contentType => {
                    contentType.name === contentType.name.trim();
                    if (!this.Validator.isUnique(this.contentTypes, 'name', this.selectedContentType, this.isEditing, true, 'tipo de contenido')) {
                        this.selectedContentType = null;
                        return;
                    }
                    this.ContentTypesService[method](contentType).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedContentType = this.getNewContentType();
                    });
                })
                .catch(() => {
                    this.selectedContentType = this.getNewContentType();
                });
        }

        /**
         * Returns a new instance of a content type
         * @return {any}
         */
        getNewContentType() {
            return { id: null, name: '', status: true };
        }
    },
    template
};