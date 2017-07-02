export const UserTypeFilter = UserTypesService => {
    'ngInject';

    let typesOfUser = UserTypesService.get();

    return typeId => {
        return typesOfUser.filter(type => type.id === typeId)[0].name || typesOfUser[2].name;
    };
};