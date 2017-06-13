import template from './users.html';

export const UsersComponent = {
    bindings: {},
    controller: class UsersComponent {
        constructor(UsersService) {
            'ngInject';

            this.UsersService = UsersService;
        }

        $onInit() {
            this.users = [];
            this.getUsers();
        }

        getUsers() {
            this.UsersService.getAll().then(data => this.users = data);
        }

        showChangePassword() {

        }

    },
    template
};