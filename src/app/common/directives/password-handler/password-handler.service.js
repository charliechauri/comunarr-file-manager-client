export class PasswordHandler {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    change(user) {
        return this.$http.post('', user).then(response => response.data);
    }
}