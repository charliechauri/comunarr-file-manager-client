export class UsersService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/user`;

        this.usersCache = CacheFactory.get('usersCache');
    }

    /**
     * @authorize [Admin]
     * Get all registered application users (admins, members and common users)
     * @param {boolean} forceRefresh
     */
    get(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'users',
            usersData = forceRefresh ? null : this.usersCache.get(cacheKey);

        if (usersData) {
            deferred.resolve(usersData);
        } else {
            this.$http.get(this.URL).then(response => {
                this.usersCache.put(cacheKey, response.data);
                deferred.resolve(response.data);
            });
        }

        return deferred.promise;
    }

    /**
     * @authorize [Admin]
     * Add a new user
     */
    add(user) {
        return this.$http.post(this.URL, user).then(response => response.data);
    }

    /**
     * @authorize [Admin]
     * Edit a whole user
     */
    edit(user) {
        return this.$http.put(this.URL, user).then(response => response.data);
    }
}