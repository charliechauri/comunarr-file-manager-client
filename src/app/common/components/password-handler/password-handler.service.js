export class PasswordHandler {
    constructor($http, EnvironmentService) {
        'ngInject';
        this.$http = $http;
        this.BASE_URL = `${EnvironmentService.getCurrent().BASE_URL}/user/password`;

    }

    /**
     * If form.password is not defined, then the functionality is intended for admin users, else a user is changing its own password
     * @param {any} form { password: string, newPassword: string, confirmPassword: string }
     */
    change(form) {
        this.URL = `${this.BASE_URL + (!!form.password ? '' : '/admin')}`; // Admin or user
        return this.$http.post(this.URL, form).then(response => response.data);
    }
}