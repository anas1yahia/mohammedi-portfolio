import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss'
})
export class MyProjectsComponent {
  langService = inject(LanguageService);
}
