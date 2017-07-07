export class KeyWordsService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/keyWord`;

        this.keyWordsCache = CacheFactory.get('keyWordsCache');
    }

    /**
     * Get all applications registered keywords
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'users',
            keyWordsData = forceRefresh ? null : this.keyWordsCache.get(cacheKey);

        if (keyWordsData) {
            deferred.resolve(keyWordsData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.keyWordsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }
}