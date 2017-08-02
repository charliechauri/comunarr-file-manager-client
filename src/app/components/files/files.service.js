/**
 * @name FilesService
 */

import angular from 'angular';

export class FilesService {
    constructor($http, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/file`;
    }

    /**
     * Search with simple filters
     * @param {any} filters
     */
    simpleSearch(filters) {
        let queryString = `?UploadedByMe=${filters.uploadedByMe}`;

        delete filters.uploadedByMe;

        for (let key in filters) {
            queryString += !!filters[key] ? `&${key}=${filters[key]}` : '';
        }
        return this.$http.get(this.URL + queryString).then(response => response.data);
    }

    /**
     * Search with complex filters
     * @param {any} filters
     */
    specificSearch(filters) {
        // @todo Filter each filter's property if an element doesn't have a value (.length > 0) or a numeric id (id !== null)
        console.log(filters);
        return this.$http.post(this.URL, filters).then(response => response.data);
    }

    /**
     * @param {any} form
     */
    post(form) {
        let fd = new FormData();
        for (const prop in form) { fd.append(prop, form[prop]); }

        const config = {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        };

        return this.$http.post(this.URL, fd, config).then(response => response.data);

    }

    /**
     * Gets all type of filters for a specific search
     * @return {any}
     */
    getSpecificFilters() {
        return {
            title: [
                {
                    value: '', op: 'OR'
                }
            ],
            author: [
                {
                    value: '', op: 'OR'
                }
            ],
            comunarrProject: [
                {
                    id: null, op: 'OR'
                }
            ],
            collective: [
                {
                    id: null, op: 'OR'
                }
            ],
            generalTopic: [
                {
                    id: null, op: 'OR'
                }
            ],
            specificTopic: [
                {
                    id: null, op: 'OR'
                }
            ],
            contentType: [
                {
                    id: null, op: 'OR'
                }
            ],
            place: [
                {
                    value: '', op: 'OR'
                }
            ],
            relatedDate: [
                {
                    value: '', op: 'OR'
                }
            ],
            fileType: [
                {
                    id: null, op: 'OR'
                }
            ],
            updateDate: [
                {
                    value: '', op: 'OR'
                }
            ],
            keyword: [
                {
                    id: null, op: 'OR'
                }
            ],
        };
    }

    /**
     * Download a file
     * @param {number} id
     * @todo
     */
    download(id) {

    }
}