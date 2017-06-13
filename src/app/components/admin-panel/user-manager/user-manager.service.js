export class UserManager {
    constructor(EnvironmentService, $http) {
        'ngInject';
        
        this.EnvironmentService = EnvironmentService;
        this.$http = $http;
    }

    /**
     * Get all registered application users (admins, members and common users)
     */
    getAll() {
        return this.$http.get('data/users.json').then(response => response.data);
    }

    /**
     * Change password for a specific user
     */
    changePassword(){

    }
}