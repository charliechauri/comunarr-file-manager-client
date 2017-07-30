import template from './no-registers-found.html';

export const NoRegistersFoundComponent = {
    bindings: {
        typeOfRegisters: '@'
    },
    controller: class NoRegistersFoundComponent {
        constructor() {
            'ngInject';
        }

        $onInit() { }
    },
    template
};