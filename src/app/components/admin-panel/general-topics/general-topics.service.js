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

        this.cacheKey = 'generalTopics';
    }

    /**
     * Get all general topics
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            generalTopicsData = forceRefresh ? null : this.generalTopicsCache.get(this.cacheKey);

        if (generalTopicsData) {
            deferred.resolve(generalTopicsData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.generalTopicsCache.put(this.cacheKey, response.data);
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
        return this.$http.post(this.URL, generalTopic).then(response => {
            let generalTopicsData = this.generalTopicsCache.get(this.cacheKey) || [];
            generalTopicsData.push(response.data.item);
            this.generalTopicsCache.put(this.cacheKey, generalTopicsData);

            return response.data;
        });
    }

    /**
     * Edit general topic
     * @param {any} generalTopic
     * @return {any}
     */
    edit(generalTopic) {
        return this.$http.put(this.URL, generalTopic).then(response => {
            let generalTopicsData = this.generalTopicsCache.get(this.cacheKey);
            for (let index = 0, length = generalTopicsData.length; index < length; index++) {
                if (generalTopicsData[index].id === response.data.item.id) {
                    generalTopicsData[index] = response.data.item;
                    break;
                }
            }

            this.generalTopicsCache.put(this.cacheKey, generalTopicsData);

            return response.data;
        });
    }
}