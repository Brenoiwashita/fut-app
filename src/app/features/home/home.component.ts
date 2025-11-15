import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from "./components/container/container.component";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ContainerComponent, MenuComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
