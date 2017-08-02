/**
 * @name CollectivesService
 * @description Collectives manager
 * @author Carlos Echauri
 */

import angular from 'angular';

export class CollectivesService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/collective`;

        this.collectivesCache = this.CacheFactory.get('collectivesCache');
        this.collectiveProjectsCache = this.CacheFactory.get('collectiveProjectsCache');

        this.cacheKey = 'collectives';
    }

    /**
     * Get all collectives
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            collectivesData = forceRefresh ? null : this.collectivesCache.get(this.cacheKey);

        if (collectivesData) {
            deferred.resolve(collectivesData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.collectivesCache.put(this.cacheKey, response.data);
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
            this.$http.get(`${this.URL}-comunarr-project`).then(response => {
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
        return this.$http.post(this.URL, this.format(collective)).then(response => {
            let collectivesData = this.collectivesCache.get(this.cacheKey);
            collectivesData.push(response.data.item);
            this.collectivesCache.put(this.cacheKey, collectivesData);

            return response.data;
        });
    }

    /**
     * Edit collective
     * @param {any} collective
     * @return {any}
     */
    edit(collective) {
        const collectiveToRegister = this.format(collective);

        return this.$http.put(this.URL, collectiveToRegister).then(response => {
            let collectivesData = this.collectivesCache.get(this.cacheKey);

            for (let index = 0, length = collectivesData.length; index < length; index++) {
                if (collectivesData[index].id === response.data.item.id) {
                    collectivesData[index] = response.data.item;
                    break;
                }
            }

            return response.data;
        });
    }

    format(collective) {
        const collectiveToRegister = angular.copy(collective);
        collectiveToRegister.idComunarrProject = collectiveToRegister.comunarrProjects.map(project => project.id);
        delete collectiveToRegister.comunarrProjects;
        return collectiveToRegister;
    }
}