import template from './comunarr-file-manager-client.html';

export const ComunarrFileManagerClientComponent = {
    bindings: {},
    controller: class ComunarrFileManagerClientComponent {
        constructor($mdSidenav, $state, $mdToast, MenuService) {
            'ngInject';

            this.$mdSidenav = $mdSidenav;
            this.$state = $state;
            this.$mdToast = $mdToast;
            this.MenuService = MenuService;
        }

        $onInit() {
            this.menuItems = [];
            /**
             * @todo Calculate privacyTypeOfCurrentUser
             */
            const privacyTypeOfCurrentUser = 1;
            this.getMenu(privacyTypeOfCurrentUser);
        }

        /**
         * Get and bind menu items
         * @param {number} privacyType 1 - Admin, 2 - Team member, 3 - Regular user
         * @return {any} promise
         */
        getMenu(privacyType) {
            return this.MenuService.getItems(privacyType).then(items => this.menuItems = items);
        }

        /**
         * Toogle sidenav
         */
        toggleSidenav() { this.$mdSidenav('side-nav').toggle(); }

        /**
         * Change state
         * @param {string} state
         */
        changeState(state) {
            this.toggleSidenav();
            this.$state.go(state);
        }

        /**
         * Get the label name of the current menu item
         */
        getCurrentLabelState() {
            const currentItem = this.menuItems.find(item => item.state === this.$state.current.name);
            return currentItem ? currentItem.label : '';
        }

        /**
         * Log out user and redirect to login state
         * @todo Clean session
         */
        logOut() {
            this.$mdToast.show(this.$mdToast.simple()
                .textContent('Has finalizado tu sesión')
                .position('top right')
            );

            this.$state.go('login');
        }
    },
    template
};