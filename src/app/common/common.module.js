import angular from 'angular';
import { EnvironmentService } from './services/environment.service';
import { MenuService } from './services/menu.service';
import { ResponseHandler } from './services/response-handler.service';
import { Validator } from './services/validator.service';
import { UserTypesService } from './services/user-types.service';
import { KeyWordsService } from './services/key-words.service';
import { AuthFactory } from './services/auth.factory';
import { ActiveFilter } from './filters/active.filter';
import { UserTypeFilter } from './filters/user-type.filter';
import { SizeConverter } from './filters/size-converter.filter';
import { PasswordHandlerModule } from './components/password-handler/password-handler.module';
import { NoRegistersFoundModule } from './components/no-registers-found/no-registers-found.module';

export const CommonModule = angular
    .module('co-file-manager-client.common', [
        PasswordHandlerModule,
        NoRegistersFoundModule
    ])
    .service('EnvironmentService', EnvironmentService)
    .service('MenuService', MenuService)
    .service('ResponseHandler', ResponseHandler)
    .service('Validator', Validator)
    .service('UserTypesService', UserTypesService)
    .service('KeyWordsService', KeyWordsService)
    .service('AuthFactory', AuthFactory)
    .filter('Active', ActiveFilter)
    .filter('UserTypeFilter', UserTypeFilter)
    .filter('SizeConverter', SizeConverter)
    .name;