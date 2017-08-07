export const UserTypeFilter = UserTypesService => {
    'ngInject';

    let typesOfUser = UserTypesService.get();

    return typeId => {
        let types = typesOfUser.filter(type => type.id === typeId);

        return types.length > 0 ? types[0].name : typesOfUser[2].name;
    };
};