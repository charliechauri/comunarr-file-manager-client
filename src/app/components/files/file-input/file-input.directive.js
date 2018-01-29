export const FileInputDirective = ($parse, $mdToast) => {
    'ngInject';

    return {
        restrict: 'A',
        link: (scope, element, attrs) => {

            const maxLimit = 1024 * 1024 * 1024; // 1GB

            element.bind('change', () => {
                const freeSpace = scope.$ctrl.freeSpace; // in bytes

                if(element && element.length > 0 && element[0].files.length > 0 && (element[0].files[0].size) * 2.1 >= freeSpace){
                    $mdToast.show($mdToast.simple()
                        .textContent('Error: No hay espacio suficiente para guardar este archivo')
                        .position('top right')
                    );
                    return;
                }

                if (element && element.length > 0 && element[0].files.length > 0 && element[0].files[0].size >= maxLimit) {
                    $mdToast.show($mdToast.simple()
                        .textContent('Error: el tamaño máximo de archivo es 1 GB')
                        .position('top right')
                    );
                    return;
                }

                if (element && element.length > 0 && element[0].files.length > 0 && element[0].files[0].type === 'application/x-msdownload') {
                    $mdToast.show($mdToast.simple()
                        .textContent('Error: no es posible subir archivos .exe')
                        .position('top right')
                    );
                    return;
                }
                $parse(attrs.fileInput).assign(scope, element[0].files[0]);
                scope.$apply();
            });
        }
    };
};