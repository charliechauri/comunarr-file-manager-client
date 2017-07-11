import template from './login.html';

export const LoginComponent = {
    bindings: {},
    controller: class LoginComponent {
        constructor($state, $mdToast, localStorageService) {
            'ngInject';

            this.$state = $state;
            this.$mdToast = $mdToast;
            this.localStorageService = localStorageService;
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
         * @todo Implement
         */
        login(credentials = { user: '', password: '' }) {
            if (credentials.user === 'comunarr' && credentials.password === 'Comunarr2017') {
                this.localStorageService.set('userInfo', { user: credentials.user, password: credentials.password, privacyType: 1, id: 1 });
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