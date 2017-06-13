/**
 * @name ProjectsService
 * @todo integrate to backend
 */

export class ProjectsService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    /**
     * Get all projects
     */
    get() {
        return this.$http.get('data/projects.json').then(response => response.data);
    }

    /**
     * Add project
     * @param {any} project
     * @return {any}
     */
    add(project) {
        return this.$http.post('', project).then(response => response.data);
    }

    /**
     * Edit project
     * @param {any} project
     * @return {any}
     */
    edit(project) {
        return this.$http.put(`/${project.id}`, project).then(response => response.data);
    }
}