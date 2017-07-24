export const HttpConfig = $qProvider => {
    'ngInject';
    $qProvider.errorOnUnhandledRejections(false);
};