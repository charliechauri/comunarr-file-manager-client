import template from './files.html';

export const FilesComponent = {
    bindings: {},
    controller: class FilesComponent {
        constructor() {
            'ngInject';
        }

        $onInit() {
            console.log(this);
        }
    },
    template
};