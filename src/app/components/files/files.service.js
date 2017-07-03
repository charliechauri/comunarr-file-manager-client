/**
 * @name FilesService
 */

import angular from 'angular';

export class FilesService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    /**
     * @param {any} 
     */
    get() {
        return this.$http.get('./data/files.json').then(response => response.data);
    }

    /**
     * @todo Integrate to backend
     * @param {any} form
     */
    post(form) {
        let fd = new FormData();
        for (const prop in form) { fd.append(prop, form[prop]); }

        const config = {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        };

        return this.$http.post('URL', fd, config).then(response => response.data);

    }

    getSimpleFilters() {
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
}