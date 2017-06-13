import template from './login.html';

export const LoginComponent = {
    bindings: {},
    controller: class LoginComponent {
        constructor($state, $mdToast) {
            'ngInject';

            this.$state = $state;
            this.$mdToast = $mdToast;
        }

        $onInit() {
            this.credentials = {
                user: '',
                pass: ''
            };
        }

        /**
         * Try to authenticate the user
         * @param {any} credentials { user: string, pass: string }
         * @todo Imp
         */
        login(credentials = { user: '', password: '' }) {
            if (credentials.user === 'charliechauri' && credentials.password === 'pepeelgrillo') {
                this.$mdToast.show(this.$mdToast.simple()
                    .textContent('¡Bienvenido!')
                    .position('top right')
                );
                this.$state.go('files');
            } else {
                this.$mdToast.show(this.$mdToast.simple()
                    .textContent('El usuario o la contraseña con incorrectos')
                    .position('top right')
                );
            }

        }
    },
    template
};