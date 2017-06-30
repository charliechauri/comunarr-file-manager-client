export const UserTypeFilter = () => {
    return type => {
        let typeOfUser = '';
        switch (type) {
            case 1:
                typeOfUser = 'Administrador';
                break;
            case 2:
                typeOfUser = 'Miembro de equipo';
                break;
            case 3:
                typeOfUser = 'Usuario regular';
                break;
            default:
                break;
        }

        return typeOfUser;
    };
};