/**
 * @name CacheConfig
 * @description Caché configuration for all catalogs
 */
export const CacheConfig = CacheFactory => {
    'ngInject';

    const cacheNames = [
        'projectsCache',
        'collectivesCache',
        'collectiveProjectsCache',
        'generalTopicsCache',
        'specificTopicsCache',
        'specificTopicGeneralTopicsCache',
        'contentTypesCache',
        'usersCache',
        'keyWordsCache'
    ];

    const config = {
        storageMode: 'localStorage',
        maxAge: 3600000, // 1 hour;
        deleteOnExpire: 'aggressive'
    };

    cacheNames.forEach(name => {
        CacheFactory(name, config);
    });
};