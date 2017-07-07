/**
 * @name ContentTypesService
 * @description Create, read, update of content types
 */
export class ContentTypesService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/contentType`;

        this.contentTypesCache = CacheFactory.get('contentTypesCache');
    }

    /**
     * Get all collectives
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {

        let deferred = this.$q.defer(),
            cacheKey = 'projects',
            contentTypesData = forceRefresh ? null : this.contentTypesCache.get(cacheKey);

        if (contentTypesData) {
            deferred.resolve(contentTypesData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.contentTypesCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * Add contenType
     * @param {any} contenType
     * @return {any}
     */
    add(contentType) {
        return this.$http.post(this.URL, contentType).then(response => response.data);
    }

    /**
     * Edit contentType
     * @param {any} contentType
     * @return {any}
     */
    edit(contentType) {
        return this.$http.put(this.URL, contentType).then(response => response.data);
    }
}