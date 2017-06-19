export const ActiveFilter = () => {
    return isActive => {
        return isActive ? 'Activo' : 'Inactivo';
    };
};