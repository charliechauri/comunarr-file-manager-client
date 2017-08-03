import angular from 'angular';
import template from './general-topics.html';
import dialogTemplate from './general-topics.dialog.html';

export const GeneralTopicsComponent = {
    bindings: {},
    controller: class GeneralTopicsComponent {
        constructor($scope, $mdDialog, GeneralTopicsService, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.GeneralTopicsService = GeneralTopicsService;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        $onInit() {
            this.generalTopics = [];
            this.getGeneralTopics(false);
        }

        getGeneralTopics(forceRefresh) {
            return this.GeneralTopicsService.get(forceRefresh).then(generalTopics => this.generalTopics = generalTopics);
        }

        addOrEdit(generalTopic = { id: null, name: '', status: true }, targetEvent, method) {
            this.isEditing = !!generalTopic.id;
            this.selectedGeneralTopic = angular.copy(generalTopic);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(generalTopic => {
                    generalTopic.name === generalTopic.name.trim();
                    if (!this.Validator.isUnique(this.generalTopics, 'name', this.selectedGeneralTopic, this.isEditing, true, 'temas generales')) {
                        this.selectedGeneralTopic = null;
                        return;
                    }

                    if(!this.isEditing){
                        delete generalTopic.id;
                        delete generalTopic.status;
                    }

                    this.GeneralTopicsService[method](generalTopic).then(response => {
                        this.ResponseHandler.success(response);
                        this.getGeneralTopics();
                    });
                })
                .catch(() => {
                    this.selectedGeneralTopic = null;
                });
        }
    },
    template
};