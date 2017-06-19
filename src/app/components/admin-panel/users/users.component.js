import angular from 'angular';
import template from './users.html';
import dialogTemplate from './users.dialog.html';

export const UsersComponent = {
    bindings: {},
    controller: class UsersComponent {
        constructor($scope, $mdDialog, UsersService, Validator) {
            'ngInject';

            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.UsersService = UsersService;
            this.Validator = Validator;
        }

        $onInit() {
            this.users = [];
            this.getUsers();
        }

        getUsers() {
            this.UsersService.getAll().then(data => this.users = data);
        }

        getNewUser() {
            return {
                name: '',
                userName: '',
                password: '',
                confirmPassword: ''
            };
        }

        addOrEdit(user = this.getNewUser(), targetEvent, method) {
            this.isEditing = !!user.id;
            this.selectedUser = angular.copy(user);

            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    targetEvent,
                    template: dialogTemplate
                })
                .then(user => {
                    user.name === user.name.trim();
                    if (!this.Validator.isUnique(this.users, 'name', this.selectedUser, this.isEditing, true, 'usuario')) {
                        this.selectedUser = null;
                        return;
                    }
                    this.UsersService[method](user).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedUser = this.getNewUser();
                    });
                })
                .catch(() => {
                    this.selectedUser = this.getNewUser();
                });
        }
    },
    template
};