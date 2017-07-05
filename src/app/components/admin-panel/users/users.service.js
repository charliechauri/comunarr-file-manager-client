export class UsersService {
    constructor(EnvironmentService, $http, $q, CacheFactory) {
        'ngInject';

        this.EnvironmentService = EnvironmentService;
        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;

        this.usersCache = CacheFactory.get('usersCache');
    }

    /**
     * @authorize [Admin]
     * Get all registered application users (admins, members and common users)
     * @param {boolean} forceRefresh
     */
    getAll(forceRefresh) {
        let deferred = this.$q.defer(),
            cacheKey = 'users',
            usersData = forceRefresh ? null : this.usersCache.get(cacheKey);

        if (usersData) {
            deferred.resolve(usersData);
        } else {
            this.$http.get('data/users.json').then(response => {
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
        return this.$http.post('', user).then(response => response.data);
    }

    /**
     * @authorize [Admin]
     * Edit a whole user
     */
    edit(user) {
        return this.$http.put('', user).then(response => response.data);
    }

    /**
     * @authorize [User]
     * Change own password
     */
    changePassword(user) {
        return this.$http.put('', user).then(response => response.data);
    }
}