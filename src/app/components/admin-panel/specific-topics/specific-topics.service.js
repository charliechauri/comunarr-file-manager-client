/**
 * @name SpecificTopicsService
 * @todo integrate to backend
 */

import angular from 'angular';

export class SpecificTopicsService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    /**
     * Get all specific topics
     */
    get() {
        return this.$http.get('data/specific-topics.json').then(response => response.data);
    }

    getRelatedGeneralTopics() {
        return this.$http.get('data/specific-topic-general-topics.json').then(response => response.data);
    }

    /**
     * Add specific topic
     * @param {any} specificTopic
     * @return {any}
     */
    add(specificTopic) {
        return this.$http.post('', this.format(specificTopic)).then(response => response.data);
    }

    /**
     * Edit specific topic
     * @param {any} specificTopic
     * @return {any}
     */
    edit(specificTopic) {
        const specificTopicToRegister = this.format(specificTopic);
        return this.$http.put(`/${specificTopicToRegister.id}`, specificTopicToRegister).then(response => response.data);
    }

    format(specificTopic) {
        const specificTopicToRegister = angular.copy(specificTopic);
        specificTopicToRegister.idGeneralTopics = specificTopicToRegister.generalTopics.map(generalTopic => generalTopic.id);
        delete specificTopicToRegister.generalTopics;
        return specificTopicToRegister;
    }
}