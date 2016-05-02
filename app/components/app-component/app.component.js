import {
    Component
} from 'angular2/core';
import TaskComponent from '../task-component/task.component.js';
import TaskListService from '../../services/task-list.service.js';

@Component({
    selector: 'my-app',
    directives: [TaskComponent],
    providers: [TaskListService],
    templateUrl: '/dist/components/app-component/app.component.html',
})
export default class AppComponent {
    // http://stackoverflow.com/questions/33026015/how-to-inject-angular2-http-service-into-es6-7-class/33036779#33036779
    // Angular2 DI desugar'd
    static get parameters() {
        return [
            [TaskListService]
        ];
    }
    constructor(taskListService) {
        this.listService = taskListService;
        this.list = this.listService.getList();
    }
    addTask() {
        this.listService.add({
            label: this.taskLabel
        });
        this.taskLabel = '';
    }
}
