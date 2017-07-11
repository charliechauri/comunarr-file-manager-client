export class EnvironmentService {
    constructor() {
        'ngInject';

        this.current = null;

        this.list = [
            {
                ID: 1,
                NAME: 'local',
                BASE_URL: 'http://localhost:8000/'
            },
            {
                ID: 2,
                NAME: 'deployed',
                BASE_URL: './api'
            }
        ];
    }

    setCurrentByName(name = 'local') {
        this.current = this.list.filter(env => env.NAME === name)[0] || null;
        const success = !!this.current;
        return success;
    }

    getCurrent() {
        return this.current;
    }
}