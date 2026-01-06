import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero-section/hero-section';
import { MyProjectsComponent } from '../my-projects/my-projects';
import { WorkStepsComponent } from '../work-steps/work-steps';
import { TestimonialsSectionComponent } from '../testimonials-section/testimonials-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    MyProjectsComponent,
    WorkStepsComponent,
    TestimonialsSectionComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {}
