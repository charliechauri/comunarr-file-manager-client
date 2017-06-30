export class PasswordHandler {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    change(form) {
        return this.$http.post('', form).then(response => response.data);
    }
}