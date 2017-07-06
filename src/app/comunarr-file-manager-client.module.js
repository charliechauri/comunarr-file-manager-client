import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import ngLoadingBar from 'angular-loading-bar';
import ngCache from 'angular-cache';
import ngStorage from 'angular-local-storage';
import { AdminPanelModule } from './components/admin-panel/admin-panel.module';
import { FilesModule } from './components/files/files.module';
import { LoginModule } from './components/login/login.module';
import { CommonModule } from './common/common.module';
import { RouterConfig } from './config/router.config';
import { ThemingConfig } from './config/theming.config';
import { ComunarrThemeConfig } from './config/theme.config';
import { StorageConfig } from './config/storage.config';
import { CacheConfig } from './config/cache.config';
import { DateLocalConfig } from './config/date-local.config';
import { ComunarrFileManagerClientComponent } from './comunarr-file-manager-client.component';

import 'angular-material/angular-material.min.css';
import 'angular-loading-bar/build/loading-bar.css';
import 'animate.css/animate.css';
import './comunarr-file-manager-client.css';

export const ComunarrFileManagerClient = angular
    .module('co-file-manager-client', [
        uiRouter,
        ngAnimate,
        ngAria,
        ngMaterial,
        ngMessages,
        ngSanitize,
        ngLoadingBar,
        ngCache,
        ngStorage,
        AdminPanelModule,
        FilesModule,
        LoginModule,
        CommonModule
    ])
    .config(RouterConfig)
    .config(ThemingConfig)
    .config(ComunarrThemeConfig)
    .config(StorageConfig)
    .config(DateLocalConfig)
    .run(CacheConfig)
    .component('coFileManagerClient', ComunarrFileManagerClientComponent)
    .name;