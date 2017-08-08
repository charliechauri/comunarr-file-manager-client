/**
 * @name ResponseHandler
 */

export const ResponseHandler = $mdToast => {
    'ngInject';

    /**
     * Show success message
     * @param {any} response
     */
    const success = response => {
        $mdToast.show($mdToast.simple()
            .textContent(response.message)
            .position('top')
        );
    };

    /**
     * Show error message
     * @param {any} response
     */
    const error = response => {
        $mdToast.show($mdToast.simple()
            .textContent(response.message)
            .position('top')
        );
    };

    return {
        success,
        error,
        responseError: error
    };
};