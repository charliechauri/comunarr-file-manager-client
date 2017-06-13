import angular from 'angular';
import template from './specific-topic-manager.html';
import dialogTemplate from './specific-topic-manager.dialog.html';

export const SpecificTopicManagerComponent = {
    bindings: {},
    controller: class SpecificTopicManagerComponent {
        constructor($scope, $mdDialog, SpecificTopicManager, GeneralTopicManager, ResponseHandler, Validator) {
            'ngInject';
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.SpecificTopicManager = SpecificTopicManager;
            this.GeneralTopicManager = GeneralTopicManager;
            this.ResponseHandler = ResponseHandler;
            this.Validator = Validator;
        }

        /**
         * Gets all specific topics, general topics and the relationship between them. Then for each specific topic adds the related generalTopic
         */
        $onInit() {
            this.specificTopics = [];
            this.SpecificTopicManager.getRelatedGeneralTopics().then(relations => {
                this.getSpecificTopics().then(() => {
                    this.getGeneralTopics().then(() => {
                        this.specificTopics.forEach(specificTopic => {
                            specificTopic.generalTopics = [];

                            const relationsToSpecificTopic = relations.filter(relation => relation.idSpecificTopic === specificTopic.id);

                            relationsToSpecificTopic.forEach(relationToSpecificTopic => {
                                specificTopic.generalTopics.push(this.generalTopics.find(generalTopic => generalTopic.id === relationToSpecificTopic.idGeneralTopic));
                            });
                        });
                    });
                });
            });
        }

        /**
         * Get all specific topics
         */
        getSpecificTopics() {
            return this.SpecificTopicManager.get().then(specificTopics => this.specificTopics = specificTopics);
        }

        /**
         * Get all general topics
         */
        getGeneralTopics() {
            return this.GeneralTopicManager.get().then(generalTopics => this.generalTopics = generalTopics);
        }

        /**
         * Validate if a general topic is in a specific topic
         * @param {any} generalTopic
         * @param {any} specificTopic
         */
        isGeneralTopicInSpecificTopic(generalTopic, specificTopic) {
            return specificTopic.generalTopics.find(gt => gt.id === generalTopic.id);
        }

        /**
         * Add/remove a general topic in a specific topic
         * @param {any} generalTopic
         * @param {any} specificTopic
         */
        toggleGeneralTopicToSpecificTopic(generalTopic, specificTopic) {
            const isAlready = specificTopic.generalTopics.find(gt => gt.id === generalTopic.id);

            if (isAlready) {
                const index = specificTopic.generalTopics.map(gt => gt.id).indexOf(generalTopic.id);
                specificTopic.generalTopics.splice(index, 1);
            } else {
                specificTopic.generalTopics.push(generalTopic);
            }
        }

        /**
         * Add or update a specific topic
         * @param {any} specificTopic
         * @param {any} targetEvent
         * @param {string} method 
         */
        addOrEdit(specificTopic = this.getNewSpecificTopic(), targetEvent, method) {
            this.isEditing = !!specificTopic.id;
            this.selectedSpecificTopic = angular.copy(specificTopic);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(specificTopic => {
                    if (!this.Validator.isUnique(this.specificTopics, 'name', this.selectedSpecificTopic, this.isEditing, true, 'tema específico')) {
                        this.selectedSpecificTopic = null;
                        return;
                    }
                    this.SpecificTopicManager[method](specificTopic).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedSpecificTopic = this.getNewSpecificTopic();
                    });
                })
                .catch(() => {
                    this.selectedSpecificTopic = this.getNewSpecificTopic();
                });
        }

        /**
         * Returns a new instance of a specificTopic
         * @return {any}
         */
        getNewSpecificTopic() {
            return { id: null, name: '', status: true, generalTopics: [] };
        }
    },
    template
};