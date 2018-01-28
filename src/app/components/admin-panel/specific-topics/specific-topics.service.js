/**
 * @name SpecificTopicsService
 */

import angular from 'angular';

export class SpecificTopicsService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = this.URL = `${EnvironmentService.getCurrent().BASE_URL}/specific-topic`;

        this.specificTopicsCache = CacheFactory.get('specificTopicsCache');
        this.specificTopicGeneralTopicsCache = CacheFactory.get('specificTopicGeneralTopicsCache');

        this.cacheKey = 'specificTopics';
    }

    /**
     * Get all specific topics
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            specificTopicsData = forceRefresh ? null : this.specificTopicsCache.get(this.cacheKey);

        if (specificTopicsData) {
            deferred.resolve(specificTopicsData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.specificTopicsCache.put(this.cacheKey, response.data);
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
            this.$http.get(`${this.URL}-general-topic`).then(response => {
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
        return this.$http.post(this.URL, this.format(specificTopic)).then(response => {
            let specificTopicsData = this.specificTopicsCache.get(this.cacheKey) || [];
            specificTopicsData.push(response.data.item);
            this.specificTopicsCache.put(this.cacheKey, specificTopicsData);
            return response.data;
        });
    }

    /**
     * Edit specific topic
     * @param {any} specificTopic
     * @return {any}
     */
    edit(specificTopic) {
        const specificTopicToRegister = this.format(specificTopic);
        return this.$http.put(this.URL, specificTopicToRegister).then(response => {
            let specificTopicsData = this.specificTopicsCache.get(this.cacheKey);
            for (let index = 0, length = specificTopicsData.length; index < length; index++) {
                if (specificTopicsData[index].id === response.data.item.id) {
                    specificTopicsData[index] = response.data.item;
                    break;
                }
            }

            this.specificTopicsCache.put(this.cacheKey, specificTopicsData);
            return response.data;
        });
    }

    format(specificTopic) {
        const specificTopicToRegister = angular.copy(specificTopic);
        specificTopicToRegister.idGeneralTopic = specificTopicToRegister.generalTopics.map(generalTopic => generalTopic.id);
        delete specificTopicToRegister.generalTopics;
        return specificTopicToRegister;
    }
}