import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss'
})
export class MyProjectsComponent {
  langService = inject(LanguageService);
  isDetailsOpen = signal(false);
  selectedProject = signal<any>(null);

  openDetails(project: any) {
    this.selectedProject.set(project);
    this.isDetailsOpen.set(true);
  }

  closeDetails() {
    this.isDetailsOpen.set(false);
  }
}
