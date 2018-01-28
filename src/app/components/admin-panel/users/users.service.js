export class UsersService {
    constructor($http, $q, CacheFactory, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.CacheFactory = CacheFactory;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/user`;

        this.usersCache = CacheFactory.get('usersCache');
        this.cacheKey = 'users';
    }

    /**
     * @authorize Any registered member
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
        return this.$http.post(this.URL, user).then(response => {
            let usersData = this.usersCache.get(this.cacheKey) || [];
            usersData.push(response.data.item);
            this.usersCache.put(this.cacheKey, usersData);
            return response.data;
        });
    }

    /**
     * @authorize [Admin]
     * Edit a whole user
     */
    edit(user) {
        delete user.institution;
        return this.$http.put(this.URL, user).then(response => {
            let usersData = this.usersCache.get(this.cacheKey);
            for (let index = 0; index < usersData.length; index++) {
                if (usersData[index].id === response.data.item.id) {
                    usersData[index] = response.data.item;
                    break;
                }
            }

            this.usersCache.put(this.cacheKey, usersData);
            return response.data;
        });
    }
}