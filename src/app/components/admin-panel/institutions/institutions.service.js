/**
 * @name InstitutionsService
 * @description Create, read, update of institutions
 */
export class InstitutionsService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/institution`;

        this.institutionsCache = CacheFactory.get('institutionsCache');
        this.cacheKey = 'institutions';
    }

    /**
     * Get all collectives
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {

        let deferred = this.$q.defer(),
            institutionsData = forceRefresh ? null : this.institutionsCache.get(this.cacheKey);

        if (institutionsData) {
            deferred.resolve(institutionsData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.institutionsCache.put(this.cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * Add institution
     * @param {any} institution
     * @return {any}
     */
    add(contentType) {
        return this.$http.post(this.URL, institutionsCache).then(response => {
            let institutionsData = this.institutionsCache.get(this.cacheKey);
            institutionsData.push(response.data.item);
            this.institutionsCache.put(this.cacheKey, institutionsData);

            return response.data;
        });
    }

    /**
     * Edit institution
     * @param {any} institution
     * @return {any}
     */
    edit(institution) {
        return this.$http.put(this.URL, institution).then(response => {
            let institutionsData = this.institutionsCache.get(this.cacheKey);
            for (let index = 0, length = institutionsData.length; index < length; index++) {
                if (institutionsData[index].id === response.data.item.id) {
                    institutionsData[index] = response.data.item;
                    break;
                }
            }

            this.institutionsCache.put(this.cacheKey, institutionsData);
            return response.data;
        });
    }
}