/**
 * @name SpecificTopicsService
 * @todo integrate to backend
 */

import angular from 'angular';

export class SpecificTopicsService {
    constructor($http, $q, CacheFactory) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;

        this.specificTopicsCache = CacheFactory.get('specificTopicsCache');
        this.specificTopicGeneralTopicsCache = CacheFactory.get('specificTopicGeneralTopicsCache');
    }

    /**
     * Get all specific topics
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'specificTopics',
            specificTopicsData = forceRefresh ? null : this.specificTopicsCache.get(cacheKey);

        if (specificTopicsData) {
            deferred.resolve(specificTopicsData);
        } else {
            this.$http.get('data/specific-topics.json').then(response => {
                this.specificTopicsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * Get all specific topics
     * @param {boolean} forceRefresh
     */
    getRelatedGeneralTopics(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'specificTopicGeneralTopics',
            specificTopicsGeneralTopicsData = forceRefresh ? null : this.specificTopicGeneralTopicsCache.get(cacheKey);

        if (specificTopicsGeneralTopicsData) {
            deferred.resolve(specificTopicsGeneralTopicsData);
        } else {
            this.$http.get('data/specific-topic-general-topics.json').then(response => {
                this.specificTopicGeneralTopicsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
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