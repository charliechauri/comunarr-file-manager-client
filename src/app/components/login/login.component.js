import template from './login.html';

export const LoginComponent = {
    bindings: {},
    controller: class LoginComponent {
        constructor($state, $mdToast, localStorageService, AuthFactory) {
            'ngInject';

            this.$state = $state;
            this.$mdToast = $mdToast;
            this.localStorageService = localStorageService;
            this.AuthFactory = AuthFactory;
        }

        $onInit() {
            this.credentials = {
                user: '',
                pass: ''
            };
        }

        /**
         * Try to authenticate the user
         * @param {any} credentials { username: string, pass: string }
         */
        login(credentials = { username: '', password: '' }) {

            this.AuthFactory
                .login(credentials)
                .then(user => {
                    this.localStorageService.set('user', user);
                    this.$mdToast.show(this.$mdToast.simple()
                        .theme('success-toast')
                        .textContent('¡Bienvenido!')
                        .position('top')
                    );
                    this.$state.go('files', { prevState: 'login' });
                });
        }
    },
    template
};