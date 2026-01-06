import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './global/navbar/navbar';
import { SocialIconsComponent } from './global/social-icons/social-icons';
import { MyProjectsComponent } from './my-projects/my-projects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SocialIconsComponent, MyProjectsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mohammedi-portfolio');
}
