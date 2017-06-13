import angular from 'angular';
import template from './general-topic-manager.html';
import dialogTemplate from './general-topic-manager.dialog.html';

export const GeneralTopicManagerComponent = {
    bindings: {},
    controller: class GeneralTopicManagerComponent {
        constructor($scope, $mdDialog, GeneralTopicManager, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.GeneralTopicManager = GeneralTopicManager;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        $onInit() {
            this.generalTopics = [];
            this.getGeneralTopics();
        }

        getGeneralTopics() {
            return this.GeneralTopicManager.get().then(generalTopics => this.generalTopics = generalTopics);
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
                    if (!this.Validator.isUnique(this.generalTopics, 'name', this.selectedGeneralTopic, this.isEditing, true, 'temas generales')) {
                        this.selectedGeneralTopic = null;
                        return;
                    }
                    this.GeneralTopicManager[method](generalTopic).then(this.ResponseHandler.success);
                })
                .catch(() => {
                    this.selectedGeneralTopic = null;
                });
        }
    },
    template
};