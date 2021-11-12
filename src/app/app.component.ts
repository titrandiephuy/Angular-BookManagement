import { Component } from '@angular/core';
import { NotificationService } from './notification.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookManagement';
  constructor(private notifyService : NotificationService) {
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Book added successfully !!")
}

}
