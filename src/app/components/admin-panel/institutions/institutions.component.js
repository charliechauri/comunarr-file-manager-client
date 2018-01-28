/**
 * @name InstitutionsComponent
 * @description Institutions management
 */

import angular from 'angular';
import template from './institutions.html';
import dialogTemplate from './institutions.dialog.html';

export const InstitutionsComponent = {
    bindings: {},
    controller: class InstitutionsComponent {
        constructor($scope, $mdDialog, InstitutionsService, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.InstitutionsService = InstitutionsService;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        /**
         * Gets all institutions
         */
        $onInit() {
            this.institutions = [];
            this.getInstitutions(false);
        }

        /**
         * Get all institutions
         */
        getInstitutions(forceRefresh) {
            return this.InstitutionsService.get(forceRefresh).then(institutions => this.institutions = institutions);
        }

        /**
         * Add or update an institution
         * @param {any} institution
         * @param {any} targetEvent
         * @param {string} method 
         */
        addOrEdit(institution = this.getNewInstitution(), targetEvent, method) {
            this.isEditing = !!institution.id;
            this.selectedInstitution = angular.copy(institution);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(institution => {
                    institution.name === institution.name.trim();
                    if (!this.Validator.isUnique(this.institution, 'name', this.selectedInstitution, this.isEditing, true, 'institución')) {
                        this.selectedInstitution = null;
                        return;
                    }

                    if (!this.isEditing) {
                        delete institution.id;
                        delete institution.status;
                    }

                    this.InstitutionsService[method](institution).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedInstitution = this.getNewInstitution();
                        this.getInstitutions(true);
                    });
                })
                .catch(() => {
                    this.selectedInstitution = this.getNewInstitution();
                });
        }

        /**
         * Returns a new instance of an institution
         * @return {any}
         */
        getNewInstitution() {
            return { id: null, name: '', status: true };
        }
    },
    template
};