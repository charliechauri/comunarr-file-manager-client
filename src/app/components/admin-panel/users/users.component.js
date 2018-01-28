import angular from 'angular';
import Promise from 'ypromise';
import template from './users.html';
import dialogTemplate from './users.dialog.html';

export const UsersComponent = {
    bindings: {},
    controller: class UsersComponent {
        constructor($scope, $mdDialog, UsersService, UserTypesService, Validator, ResponseHandler, InstitutionsService) {
            'ngInject';

            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.UsersService = UsersService;
            this.UserTypesService = UserTypesService;
            this.Validator = Validator;
            this.ResponseHandler = ResponseHandler;
            this.InstitutionsService = InstitutionsService;
        }

        $onInit() {
            this.users = [];
            this.institutions = [];
            this.userTypes = this.UserTypesService.get();

            Promise.all([this.getUsers(false), this.getInstitutions(false)]).then(() => {
                this.users.forEach((user, index) => {
                    const institution = this.institutions.find(inst => user.idInstitution === inst.id);
                    this.users[index].institution = institution ? institution.name : 'N/A';
                    this.$scope.$apply();
                });
            });
        }

        getUsers(forceRefresh) {
            return this.UsersService.get(forceRefresh).then(data => this.users = data);
        }

        getNewUser() {
            return {
                name: '',
                userName: '',
                idInstitution: null,
                password: '',
                confirmPassword: '',
                idUserType: 3,
                status: true
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
                    if (!this.isEditing) {
                        delete user.status;
                    }
                    this.UsersService[method](user).then(response => {
                        this.ResponseHandler.success(response);
                        this.selectedUser = this.getNewUser();
                        this.getUsers();
                    });
                })
                .catch(() => {
                    this.selectedUser = this.getNewUser();
                });
        }

        getInstitutions(forceRefresh) {
            return this.InstitutionsService.get(forceRefresh).then(data => this.institutions = data);
        }
    },
    template
};