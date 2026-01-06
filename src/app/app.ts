import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './global/navbar/navbar';
import { SocialIconsComponent } from './global/social-icons/social-icons';
import { MyProjectsComponent } from './my-projects/my-projects';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section';
import { WorkStepsComponent } from './work-steps/work-steps';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SocialIconsComponent, MyProjectsComponent, TestimonialsSectionComponent, WorkStepsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mohammedi-portfolio');
}
