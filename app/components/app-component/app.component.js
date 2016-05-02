import {Component} from 'angular2/core';
import TaskComponent from '../task-component/task.component.js';

@Component({
  selector: 'my-app',
  directives: [TaskComponent],
  templateUrl: '/dist/components/app-component/app.component.html',
})
export default class AppComponent{

  constructor() {
      this.sampleTask = {label: 'hello task!'};
  }
}
