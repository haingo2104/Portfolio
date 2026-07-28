import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundDecorComponent } from './layout/background-decor/background-decor.component';
import { ScrollProgressComponent } from './layout/scroll-progress/scroll-progress.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackgroundDecorComponent, ScrollProgressComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
