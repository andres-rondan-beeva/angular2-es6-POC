import {
    Component
} from 'angular2/core';

@Component({
    selector: 'task',
    inputs: ['taskItem'],
    templateUrl: '/dist/components/task-component/task.component.html'
})
export default class TaskComponent {
    constructor() {
        
    }
}
