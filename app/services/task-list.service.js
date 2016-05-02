import {Injectable} from 'angular2/core';
@Injectable()
export default class TaskListService {
  constructor() {
      this.list = [
          {
              label: 'task 1',
              checked: true
          },
          {
              label: 'task 2',
              checked: false
          },
          {
              label: 'task 3',
              checked: false
          },
          {
              label: 'task 4',
              checked: false
          }
      ]
  }
  getList() {
    return this.list;
  }
  add(task){
      this.list = this.list || [];
      this.list.push(task);
  }
}
