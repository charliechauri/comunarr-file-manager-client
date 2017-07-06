export const ThemingConfig = $mdThemingProvider => {
    'ngInject';

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue-grey')
        .warnPalette('red');
};