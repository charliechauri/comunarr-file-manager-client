/**
 * @name AuthConfig
 * @description Register of http interceptor for authorization and error reponse handler
 * @author Carlos Echauri
 */
export const AuthConfig = $httpProvider => {
    'ngInject';
    
    $httpProvider.interceptors.push('AuthFactory');
};