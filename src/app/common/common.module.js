import angular from 'angular';
import { EnvironmentService } from './services/environment.service';
import { MenuService } from './services/menu.service';
import { ResponseHandler } from './services/response-handler.service';
import { Validator } from './services/validator.service';
import { ActiveFilter } from './filters/active.filter';
import { UserTypeFilter } from './filters/user-type.filter';
import { PasswordHandlerModule } from './components/password-handler/password-handler.module';

export const CommonModule = angular
    .module('co-file-manager-client.common', [
        PasswordHandlerModule
    ])
    .service('EnvironmentService', EnvironmentService)
    .service('MenuService', MenuService)
    .service('ResponseHandler', ResponseHandler)
    .service('Validator', Validator)
    .filter('Active', ActiveFilter)
    .filter('UserTypeFilter', UserTypeFilter)
    .name;