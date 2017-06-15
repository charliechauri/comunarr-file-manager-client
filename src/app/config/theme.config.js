export const ComunarrThemeConfig = $mdThemingProvider => {
    'ngInject';

    $mdThemingProvider.definePalette('primary', {
        '50': 'ecc8aa',
        '100': 'de9f6c',
        '200': 'd3813e',
        '300': 'a55f25',
        '400': '8c5020',
        '500': '73421a',
        '600': '5a3414',
        '700': '41250f',
        '800': '281709',
        '900': '0f0903',
        'A100': 'fbc191',
        'A200': 'f8892e',
        'A400': 'ab5815',
        'A700': '8c4d1b',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            'A100',
            'A200'
        ],
        'contrastLightColors': [
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A400',
            'A700'
        ]
    });

    $mdThemingProvider.definePalette('accent', {
        '50': 'dda068',
        '100': 'cb782e',
        '200': '9d5d23',
        '300': '633b16',
        '400': '4a2c11',
        '500': '311d0b',
        '600': '180e05',
        '700': '000000',
        '800': '000000',
        '900': '000000',
        'A100': 'f89942',
        'A200': 'ce6507',
        'A400': '63350c',
        'A700': '48290e',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            'A100'
        ],
        'contrastLightColors': [
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A200',
            'A400',
            'A700'
        ]
    });

    $mdThemingProvider.definePalette('warn', {
        '50': 'f5a4a4',
        '100': 'ee5f5f',
        '200': 'e82c2c',
        '300': 'b91414',
        '400': '9e1111',
        '500': '820e0e',
        '600': '660b0b',
        '700': '4b0808',
        '800': '2f0505',
        '900': '130202',
        'A100': 'ff9090',
        'A200': 'ff2a2a',
        'A400': 'bf0404',
        'A700': '9d0c0c',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            'A100'
        ],
        'contrastLightColors': [
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A200',
            'A400',
            'A700'
        ]
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('primary')
        .accentPalette('accent')
        .warnPalette('warn');
};