import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './global/navbar/navbar';
import { SocialIconsComponent } from './global/social-icons/social-icons';
import { MyProjectsComponent } from './my-projects/my-projects';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section';
import { WorkStepsComponent } from './work-steps/work-steps';
import { LanguageService } from './services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, SocialIconsComponent, MyProjectsComponent, TestimonialsSectionComponent, WorkStepsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  langService = inject(LanguageService);
  protected readonly title = signal('mohammedi-portfolio');
}
