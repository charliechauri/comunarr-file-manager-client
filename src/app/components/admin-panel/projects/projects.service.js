/**
 * @name ProjectsService
 */

export class ProjectsService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/comunarr-project`;

        this.projectsCache = CacheFactory.get('projectsCache');
        this.cacheKey = 'projects';
    }

    /**
     * Get all projects
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            projectsData = forceRefresh ? null : this.projectsCache.get(this.cacheKey);

        if (projectsData) {
            deferred.resolve(projectsData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.projectsCache.put(this.cacheKey, response.data);
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
        return this.$http.post(this.URL, project).then(response => {
            let projectsData = this.projectsCache.get(this.cacheKey);
            projectsData.push(response.data.item);
            this.usersCache.put(this.cacheKey, projectsData);

            return response.data;
        });
    }

    /**
     * Edit project
     * @param {any} project
     * @return {any}
     */
    edit(project) {
        return this.$http.put(this.URL, project).then(response => {

            let projectsData = this.projectsCache.get(this.cacheKey);
            projectsData.some(item => {
                const isCurrent = item.id === response.data.item.id;

                if(isCurrent){
                    debugger;
                    item = response.data.item;
                }

                return isCurrent;
            });

            this.projectsCache.put(this.cacheKey, projectsData);

            return response.data;
        });
    }
}