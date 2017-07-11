/**
 * @name GeneralTopicsService
 */

export class GeneralTopicsService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/general-topic`;

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
            this.$http.get(this.URL).then(response => {
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
        return this.$http.post(this.URL, generalTopic).then(response => response.data);
    }

    /**
     * Edit general topic
     * @param {any} generalTopic
     * @return {any}
     */
    edit(generalTopic) {
        return this.$http.put(this.URL, generalTopic).then(response => response.data);
    }
}