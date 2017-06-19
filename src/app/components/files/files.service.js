/**
 * @name FilesService
 */

export class FilesService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    get() {

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