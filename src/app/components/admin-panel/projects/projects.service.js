/**
 * @name ProjectsService
 */

export class ProjectsService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/comunarrProject`;

        this.projectsCache = CacheFactory.get('projectsCache');
    }

    /**
     * Get all projects
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'projects',
            projectsData = forceRefresh ? null : this.projectsCache.get(cacheKey);

        if (projectsData) {
            deferred.resolve(projectsData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.projectsCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * Add project
     * @param {any} project
     * @return {any}
     */
    add(project) {
        return this.$http.post(this.URL, project).then(response => response.data);
    }

    /**
     * Edit project
     * @param {any} project
     * @return {any}
     */
    edit(project) {
        return this.$http.put(this.URL, project).then(response => response.data);
    }
}