import angular from 'angular';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CollectivesModule } from './collectives/collectives.module';
import { GeneralTopicsModule } from './general-topics/general-topics.module';
import { SpecificTopicsModule } from './specific-topics/specific-topics.module';
import { ContentTypesModule } from './content-types/content-types.module';

export const AdminPanelModule = angular
    .module('co-file-manager-client.admin-panel', [
        UsersModule,
        ProjectsModule,
        CollectivesModule,
        GeneralTopicsModule,
        SpecificTopicsModule,
        ContentTypesModule
    ])
    .name;