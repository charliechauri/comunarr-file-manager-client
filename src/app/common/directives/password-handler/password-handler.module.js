import angular from 'angular';
import { PasswordHandler } from './password-handler.service';
import { PasswordHandlerDirective } from './password-handler.directive';

export const PasswordHandlerModule = angular
    .module('co-file-manager-client.common.password-handler', [])
    .service('PasswordHandler', PasswordHandler)
    .directive('coPasswordHandler', PasswordHandlerDirective)
    .name;