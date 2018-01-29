export class DiskSpaceService {
    constructor($http, EnvironmentService) {
        'ngInject';

        this.$http = $http;
        this.URL = `${EnvironmentService.getCurrent().BASE_URL}/disk-space`;
    }

    /**
     * Get available space in disk
     */
    get() {
        return this.$http.get(this.URL).then(response => {
            return response.data;
        });
    }
}