export class KeyWordsService {
    constructor($http, $q, CacheFactory) {
        'ngInject';
        
        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;

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
            this.$http.get('data/key-words.json').then(response => {
                this.keyWordsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }
}