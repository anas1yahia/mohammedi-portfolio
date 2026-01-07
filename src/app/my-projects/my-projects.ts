import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { BehanceService, BehanceProject } from '../services/behance.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss'
})
export class MyProjectsComponent implements OnInit {
  langService = inject(LanguageService);
  behanceService = inject(BehanceService);

  ngOnInit() {
    this.behanceService.fetchProjects();
  }
}
