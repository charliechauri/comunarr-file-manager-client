export class MenuService {
    constructor($timeout) {
        'ngInject';

        this.$timeout = $timeout;

        this.allItems = [
            { label: 'Usuarios', state: 'user-manager', privacyType: 1 },
            { label: 'Proyectos', state: 'project-manager', privacyType: 1 },
            { label: 'Collectivos', state: 'collective-manager', privacyType: 1 },
            { label: 'Temas generales', state: 'general-topic-manager', privacyType: 1 },
            { label: 'Temas específicos', state: 'specific-topic-manager', privacyType: 1 },
            { label: 'Buscar archivos', state: 'files', privacyType: 3 },
            { label: 'Cambiar contraseña', state: 'user', privacyType: 3 }
        ];
    }

    /**
     * Get menu items for the application
     * Privacy type
     * 1 - Administrator
     * 2 - Team members
     * 3 - Regular users
     * @param {number} privacyType
     */
    getItems(privacyType = 3) {
        return this.$timeout(() => {
            return this.allItems.filter(item => item.privacyType >= privacyType);
        });
    }
}