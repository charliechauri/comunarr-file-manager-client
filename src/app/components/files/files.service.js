/**
 * @name FilesService
 */

import angular from 'angular';
import FileSaver from 'file-saver';

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
        let queryString = `?uploadedByMe=${filters.uploadedByMe}`;

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
        return this.$http.post(`${this.EnvironmentService.getCurrent().BASE_URL}/specific-search`, filters).then(response => response.data);
    }

    /**
     * @param {any} form
     */
    add(form) {
        let fd = new FormData();
        for (const prop in form) {
            if (prop !== 'keyWords') {
                fd.append(prop, form[prop]);
            } else {
                for (let index = 0, length = form[prop].length; index < length; index++) {
                    fd.append(prop, form[prop][index]);
                }
            }
        }

        const config = {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        };

        return this.$http.post(this.URL, fd, config).then(response => response.data);

    }

    /**
     * Updates file
     * @param {any} form
     */
    edit(form) {
        form = this.deleteUnnecessaryProperties(form);
        let fd = new FormData();
        for (const prop in form) {
            if (prop !== 'keyWords') {
                fd.append(prop, form[prop]);
            } else {
                for (let index = 0, length = form[prop].length; index < length; index++) {
                    fd.append(prop, form[prop][index]);
                }
            }
        }

        const config = {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        };

        return this.$http.put(this.URL, fd, config).then(response => response.data);
    }

    /**
     * Delete properties that the get method return in each register for edition purposes
     * @param {any} form
     * @return {any}
     */
    deleteUnnecessaryProperties(form) {
        [
            'collective',
            'comunarrProject',
            'generalTopic',
            'specificTopic',
            'privacyType',
            'contentType',
            'fileType',
            'updateDate',
            'uploadedBy',
            'idUser',
            'idKeyWord',
            'fileTypeImage',
            'relatedDate'
        ].forEach(key => {
            delete form[key];
        });

        return form;
    }

    /**
     * Gets all type of filters for a specific search
     * @return {any}
     */
    getSpecificFilters() {
        return {
            name: [
                {
                    value: '', op: 'OR'
                }
            ],
            author: [
                {
                    value: '', op: 'OR'
                }
            ],
            place: [
                {
                    value: '', op: 'OR'
                }
            ],
            idComunarrProject: [
                {
                    id: null, op: 'OR'
                }
            ],
            idCollective: [
                {
                    id: null, op: 'OR'
                }
            ],
            idGeneralTopic: [
                {
                    id: null, op: 'OR'
                }
            ],
            idSpecificTopic: [
                {
                    id: null, op: 'OR'
                }
            ],
            idContentType: [
                {
                    id: null, op: 'OR'
                }
            ],
            relatedDate: [null, null],
            idFileType: [
                {
                    id: null, op: 'OR'
                }
            ],
            updateDate: [null, null],
            keyWords: [
                {
                    id: null, op: 'OR'
                }
            ],
        };
    }

    /**
     * Download a file
     * @param {number} id
     * @return {any} file
     */
    download(id) {
        return this.$http.get(`${this.URL}/${id}`, { responseType: 'blob' }).then(response => {
            try {
                let fileName = response.headers('X-filename');
                let blob = new Blob([response.data], { type: response.headers('Content-Type') });
                FileSaver.saveAs(blob, fileName);
                return { message: 'Archvo descargado' };
            } catch (ex) {
                // Fallback to download file directly from server
                window.open(`${this.URL}/${id}`);
            }
        });
    }

    /**
     * Get all file types
     * This method does not implement cache because it creates automatically everytime a new file is added and it is a new type of file
     * @return {any} promise
     */
    getFileTypes() {
        return this.$http.get(`${this.URL}-type`).then(response => response.data);
    }
}
