export const EnvironmentConfig = EnvironmentService => {
    'ngInject';

    if (EnvironmentService.setCurrent('local')) {
        console.log('Environment has been succesfully setted');
    }
};