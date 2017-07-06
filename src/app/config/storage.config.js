export const StorageConfig = localStorageServiceProvider => {
    'ngInject';

    localStorageServiceProvider
        .setPrefix('co')
        .setStorageType('localStorage');
};