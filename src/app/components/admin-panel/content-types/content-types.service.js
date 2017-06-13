/**
 * @name ContentTypesService
 * @description Create, read, update of content types
 */
export class ContentTypesService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    /**
     * Get all collectives
     */
    get() {
        return this.$http.get('data/content-types.json').then(response => response.data);
    }

    /**
     * Add contenType
     * @param {any} contenType
     * @return {any}
     */
    add(contentType) {
        return this.$http.post('', contentType).then(response => response.data);
    }

    /**
     * Edit contentType
     * @param {any} contentType
     * @return {any}
     */
    edit(contentType) {
        return this.$http.put(`/${contentType.id}`, contentType).then(response => response.data);
    }
}