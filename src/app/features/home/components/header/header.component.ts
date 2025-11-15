import { Component } from '@angular/core';
import { User } from '../../../../shared/user.interface';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public userData: User;
  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if(user) {
      this.userData = JSON.parse(user);
    }
  }

}
