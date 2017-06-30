import angular from 'angular';
import { PasswordHandler } from './password-handler.service';
import { PasswordHandlerComponent } from './password-handler.component';

export const PasswordHandlerModule = angular
    .module('co-file-manager-client.common.password-handler', [])
    .service('PasswordHandler', PasswordHandler)
    .component('coPasswordHandler', PasswordHandlerComponent)
    .name;