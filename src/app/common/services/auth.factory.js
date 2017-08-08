export const AuthFactory = ($injector, EnvironmentService, localStorageService) => {
    'ngInject';

    /**
     * Hashes a string
     * @param {string} str
     * @return {string} encoded string
     */
    const utf8ToB64 = str => {
        return window.btoa(unescape(encodeURIComponent(str)));
    };

    /**
     * Login user to the app
     * @param {string} username 
     * @param {string} password 
     */
    const login = (credentials = { username: '', password: '' }) => {
        return $injector.get('$http').post(`${EnvironmentService.getCurrent().BASE_URL}/login`, credentials).then(response => response.data);
    };

    /**
     * Add Authorization headers to HTTP requests
     * @param {any} config
     */
    const request = config => {
        if (config.url === `${EnvironmentService.getCurrent().BASE_URL}/login`) {
            return config;
        }

        const user = localStorageService.get('user');
        const hash = utf8ToB64(`${user.userName}:${user.password}`);
        config.headers.Authorization = `Basic ${hash}`;
        return config;
    };

    /**
     * Handle http error responses
     * @param {any} response
     */
    const responseError = response => {
        const err = response.data;

        $injector.get('$mdToast').show($injector.get('$mdToast').simple()
            .textContent(err.message)
            .position('top')
        );

        return $injector.get('$q').reject(response);
    };

    return {
        login,
        request,
        responseError
    };
};