import template from './password-handler.dialog.html';

export const PasswordHandlerDirective = () => {

    return {
        scope: {
            user: '&user',
            showChangePassword: '&showChangePassword',
        },
        controller: class PasswordHandlerDirective {
            constructor($scope, $mdDialog, ResponseHandler, PasswordHandler) {
                'ngInject';

                this.$scope = $scope;
                this.$mdDialog = $mdDialog;
                this.ResponseHandler = ResponseHandler;
                this.PasswordHandler = PasswordHandler;
            }

            $onInit() {
                this.$scope.showChangePassword = this.changePassword;
            }

            changePassword() {
                this.$mdDialog
                    .show({
                        preserveScope: true,
                        scope: this.$scope,
                        template
                    }).then(user => {
                        this.PasswordHandler
                            .change(user)
                            .then(this.ResponseHandler.success)
                            .catch();
                    });
            }
        }
    };
};