export class PasswordHandler {
    constructor($http, EnvironmentService) {
        'ngInject';
        this.$http = $http;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/password`;

    }

    change(form) {
        this.URL = `${!!form.password ? '/own' : ''}`; // Admin or user
        return this.$http.post(this.URL, form).then(response => response.data);
    }
}