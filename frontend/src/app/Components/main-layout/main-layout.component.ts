import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterOutlet,ToastModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  providers: [MessageService] 

})
export class MainLayoutComponent {

}
