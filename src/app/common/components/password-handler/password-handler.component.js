import template from './password-handler.html';
import dialogTemplate from './password-handler.dialog.html';

export const PasswordHandlerComponent = {
    bindings: {
        user: '<',
        isAdmin: '<',
        showChangePassword: '&'
    },
    controller: class PasswordHandlerComponent {
        constructor($scope, $mdDialog, ResponseHandler, PasswordHandler) {
            'ngInject';

            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.ResponseHandler = ResponseHandler;
            this.PasswordHandler = PasswordHandler;
            this.form = this.newForm();
        }

        $onInit() { }

        changePassword() {
            this.$mdDialog
                .show({
                    preserveScope: true,
                    scope: this.$scope,
                    template: dialogTemplate
                }).then(form => {
                    const newForm = this.isAdmin ? { idUser: this.user.id, password: form.newPassword } : { password: form.password, newPassword: form.newPassword };

                    this.PasswordHandler
                        .change(newForm)
                        .then(response => {
                            this.ResponseHandler.success(response);
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