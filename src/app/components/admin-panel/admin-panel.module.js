import angular from 'angular';
import { UserManagerModule } from './user-manager/user-manager.module';
import { ProjectManagerModule } from './project-manager/project-manager.module';
import { CollectiveManagerModule } from './collective-manager/collective-manager.module';
import { GeneralTopicManagerModule } from './general-topic-manager/general-topic-manager.module';
import { SpecificTopicManagerModule } from './specific-topic-manager/specific-topic-manager.module';
import { ContentTypesModule } from './content-types/content-types.module';

export const AdminPanelModule = angular
    .module('co-file-manager-client.admin-panel', [
        UserManagerModule,
        ProjectManagerModule,
        CollectiveManagerModule,
        GeneralTopicManagerModule,
        SpecificTopicManagerModule,
        ContentTypesModule
    ])
    .name;