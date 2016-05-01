import {Component} from 'angular2/core';

@Component({
  selector: 'my-app',
  templateUrl: '/dist/components/app-component/app.component.html',
})
export default class AppComponent{

  constructor() {
      this.greeting = 'hello world!';
  }
}
