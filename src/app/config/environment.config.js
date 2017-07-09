export const EnvironmentConfig = EnvironmentService => {
    'ngInject';

    if (EnvironmentService.setCurrentByName('local')) {
        console.log('Environment has been succesfully setted');
    }
};