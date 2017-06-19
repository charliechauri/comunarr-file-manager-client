export class UsersService {
    constructor(EnvironmentService, $http) {
        'ngInject';

        this.EnvironmentService = EnvironmentService;
        this.$http = $http;
    }

    /**
     * @authorize [Admin]
     * Get all registered application users (admins, members and common users)
     */
    getAll() {
        return this.$http.get('data/users.json').then(response => response.data);
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