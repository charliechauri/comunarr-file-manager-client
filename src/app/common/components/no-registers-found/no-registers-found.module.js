/**
 * @name NoRegistersFoundModule
 * @description Module register for component when an empty catalog is present
 * @author Carlos Echauri
 */
import angular from 'angular';
import { NoRegistersFoundComponent } from './no-registers-found.component';

export const NoRegistersFoundModule = angular
    .module('co-file-manager-client.common.no-registers-found', [])
    .component('noRegistersFound', NoRegistersFoundComponent)
    .name;