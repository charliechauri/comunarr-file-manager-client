/**
 * @name CollectivesService
 * @todo integrate to backend
 */

import angular from 'angular';

export class CollectivesService {
    constructor($http, $q, CacheFactory) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;

        this.collectivesCache = this.CacheFactory.get('collectivesCache');
        this.collectiveProjectsCache = this.CacheFactory.get('collectiveProjectsCache');
    }

    /**
     * Get all collectives
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'collectives',
            collectivesData = forceRefresh ? null : this.collectivesCache.get(cacheKey);

        if (collectivesData) {
            deferred.resolve(collectivesData);
        } else {
            this.$http.get('data/collectives.json').then(response => {
                this.collectivesCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * Get relation between collectives and projects
     * @param {boolean} forceRefresh
     */
    getRelatedProjects(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'collectiveProjects',
            collectiveProjectsData = forceRefresh ? null : this.collectiveProjectsCache.get(cacheKey);

        if (collectiveProjectsData) {
            deferred.resolve(collectiveProjectsData);
        } else {
            this.$http.get('data/collective-projects.json').then(response => {
                this.collectiveProjectsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
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