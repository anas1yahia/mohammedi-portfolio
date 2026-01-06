import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-work-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-steps.html',
  styleUrl: './work-steps.scss'
})
export class WorkStepsComponent {
  langService = inject(LanguageService);

  steps = computed(() => [
    {
      title: this.langService.translate('workSteps.step1Title'),
      description: this.langService.translate('workSteps.step1Desc'),
      color: '#a3f05d', // Original Green
      stepNumber: '01',
      iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
    },
    {
      title: this.langService.translate('workSteps.step2Title'),
      description: this.langService.translate('workSteps.step2Desc'),
      color: '#8b5cf6', // Original Purple
      stepNumber: '02',
      iconPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8'
    },
    {
      title: this.langService.translate('workSteps.step3Title'),
      description: this.langService.translate('workSteps.step3Desc'),
      color: '#fca5a5', // Original Salmon
      stepNumber: '03',
      iconPath: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3 3 6 6 3-3-6-6z M20.69 3.31a2.18 2.18 0 0 0-2.91.09c-.84.71-1.39 2.08-1.12 3.79.25 1.59 1.15 2.76 2.01 3.44 1.3 1.04 3.7 1.56 5.33.67.92-.5 1.1-1.63.78-2.61-.45-1.39-1.92-3.8-4.09-5.38z'
    }
  ]);
}
