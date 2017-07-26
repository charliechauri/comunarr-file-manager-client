import template from './password-handler.html';
import dialogTemplate from './password-handler.dialog.html';

export const PasswordHandlerComponent = {
    bindings: {
        user: '<',
        isAdmin: '<',
        showChangePassword: '&'
    },
    controller: class PasswordHandlerComponent {
        constructor($scope, $mdDialog, ResponseHandler, PasswordHandler, localStorageService) {
            'ngInject';

            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.ResponseHandler = ResponseHandler;
            this.PasswordHandler = PasswordHandler;
            this.localStorageService = localStorageService;
            this.form = this.newForm();
        }

        $onInit() { }

        changePassword(targetEvent) {
            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    template: dialogTemplate,
                    targetEvent
                }).then(form => {
                    let user = this.localStorageService.get('user');
                    form.id = user.id;
                    form.password = !this.isAdmin ? form.password : undefined;
                    this.PasswordHandler
                        .change(form)
                        .then(response => {
                            this.ResponseHandler.success(response);
                            if (!this.isAdmin) {
                                user.password = form.newPassword;
                                this.localStorageService.set('user', user);
                            }
                            this.form = this.newForm();
                        })
                        .catch(() => this.form = this.newForm());
                }).catch(() => this.form = this.newForm());
        }

        newForm() {
            return { password: '', newPassword: '', confirmPassword: '' };
        }
    },
    template
};