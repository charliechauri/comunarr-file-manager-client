export class UserTypesService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    get() {
        return [
            { id: 1, name: 'Administrador' },
            { id: 2, name: 'Miembro de equipo' },
            { id: 3, name: 'Usuario regular' }
        ];
    }
}