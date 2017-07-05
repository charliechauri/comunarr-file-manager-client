/**
 * @name GeneralTopicsService
 * @todo integrate to backend
 */

export class GeneralTopicsService {
    constructor($http, $q, CacheFactory) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;

        this.generalTopicsCache = CacheFactory.get('generalTopicsCache');
    }

    /**
     * Get all general topics
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'generalTopics',
            generalTopicsData = forceRefresh ? null : this.generalTopicsCache.get(cacheKey);

        if (generalTopicsData) {
            deferred.resolve(generalTopicsData);
        } else {
            this.$http.get('data/general-topics.json').then(response => {
                this.generalTopicsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * Add general topic
     * @param {any} generalTopic
     * @return {any}
     */
    add(generalTopic) {
        return this.$http.post('', generalTopic).then(response => response.data);
    }

    /**
     * Edit general topic
     * @param {any} generalTopic
     * @return {any}
     */
    edit(generalTopic) {
        return this.$http.put(`/${generalTopic.id}`, generalTopic).then(response => response.data);
    }
}