import angular from 'angular';
import { EnvironmentService } from './services/environment.service';
import { MenuService } from './services/menu.service';
import { ResponseHandler } from './services/response-handler.service';
import { Validator } from './services/validator.service';
import { ActiveFilter } from './filters/active.filter';

export const CommonModule = angular
    .module('co-file-manager-client.common', [])
    .service('EnvironmentService', EnvironmentService)
    .service('MenuService', MenuService)
    .service('ResponseHandler', ResponseHandler)
    .service('Validator', Validator)
    .filter('Active', ActiveFilter)
    .name;