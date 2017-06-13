/**
 * @name CollectiveManager
 * @todo integrate to backend
 */

import angular from 'angular';

export class CollectiveManager {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    /**
     * Get all collectives
     */
    get() {
        return this.$http.get('data/collectives.json').then(response => response.data);
    }

    getRelatedProjects() {
        return this.$http.get('data/collective-projects.json').then(response => response.data);
    }

    /**
     * Add collective
     * @param {any} collective
     * @return {any}
     */
    add(collective) {
        return this.$http.post('', this.format(collective)).then(response => response.data);
    }

    /**
     * Edit collective
     * @param {any} collective
     * @return {any}
     */
    edit(collective) {
        const collectiveToRegister = this.format(collective);
        return this.$http.put(`/${collectiveToRegister.id}`, collectiveToRegister).then(response => response.data);
    }

    format(collective) {
        const collectiveToRegister = angular.copy(collective);
        collectiveToRegister.idComunarrProjects = collectiveToRegister.comunarrProjects.map(project => project.id);
        delete collectiveToRegister.comunarrProjects;
        return collectiveToRegister;
    }
}