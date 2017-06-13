import template from './user-manager.html';

export const UserManagerComponent = {
    bindings: {},
    controller: class UserManagerComponent {
        constructor(UserManager) {
            'ngInject';

            this.UserManager = UserManager;
        }

        $onInit() {
            this.users = [];
            this.getUsers();
        }

        getUsers() {
            this.UserManager.getAll().then(data => this.users = data);
        }

        showChangePassword() {

        }

    },
    template
};