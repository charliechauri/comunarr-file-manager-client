export class Validator {
    constructor($mdToast) {
        'ngInject';

        this.$mdToast = $mdToast;
    }

    /**
     * Validate an object property uniqueness in an array of objects
     * @param {any} list
     * @param {string} propertyName
     * @param {string} propertyValue
     * @return {boolean} true if is unique
     */
    isUnique(list, propertyName, element, isEditing, showError, catalogName) {
        const isUnique = !list.some(item => item[propertyName] === element[propertyName] && (isEditing ? element.id !== item.id : true));

        if (showError && !isUnique) {
            this.$mdToast.show(this.$mdToast.simple()
                .textContent(`El nombre del ${catalogName} debe ser único`)
                .position('top right')
            );
        }
        return isUnique;
    }



}