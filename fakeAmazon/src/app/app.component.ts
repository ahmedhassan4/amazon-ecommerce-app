import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBeltComponent } from './shared/components/nav-belt/nav-belt.component';
import { NavMainComponent } from './shared/components/nav-main/nav-main.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBeltComponent, NavMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'amazontest';
}
