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
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/content-type`;

        this.contentTypesCache = CacheFactory.get('contentTypesCache');
        this.cacheKey = 'contentTypes';
    }

    /**
     * Get all collectives
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {

        let deferred = this.$q.defer(),
            contentTypesData = forceRefresh ? null : this.contentTypesCache.get(this.cacheKey);

        if (contentTypesData) {
            deferred.resolve(contentTypesData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.contentTypesCache.put(this.cacheKey, response.data);
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
        return this.$http.post(this.URL, contentType).then(response => {
            let contentTypesData = this.contentTypesCache.get(this.cacheKey);
            contentTypesData.push(response.data.item);
            this.contentTypesCache.put(this.cacheKey, contentTypesData);

            return response.data;
        });
    }

    /**
     * Edit contentType
     * @param {any} contentType
     * @return {any}
     */
    edit(contentType) {
        return this.$http.put(this.URL, contentType).then(response => {
            let contentTypesData = this.contentTypesCache.get(this.cacheKey);
            for (let index = 0, length = contentTypesData.length; index < length; index++) {
                if (contentTypesData[index].id === response.data.item.id) {
                    contentTypesData[index] = response.data.item;
                    break;
                }
            }

            this.contentTypesCache.put(this.cacheKey, contentTypesData);
            return response.data;
        });
    }
}