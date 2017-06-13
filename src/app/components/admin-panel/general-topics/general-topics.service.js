/**
 * @name GeneralTopicsService
 * @todo integrate to backend
 */

export class GeneralTopicsService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    /**
     * Get all general topics
     */
    get() {
        return this.$http.get('data/general-topics.json').then(response => response.data);
    }

    /**
     * Add general topic
     * @param {any} generalTopic
     * @return {any}
     */
    add(generalTopic) {
        return this.$http.post('', generalTopic).then(response => response.data);
    }

    /**
     * Edit general topic
     * @param {any} generalTopic
     * @return {any}
     */
    edit(generalTopic) {
        return this.$http.put(`/${generalTopic.id}`, generalTopic).then(response => response.data);
    }
}