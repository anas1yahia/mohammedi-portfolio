import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-services.html',
  styleUrl: './my-services.scss'
})
export class MyServicesComponent {
  langService = inject(LanguageService);

  services = computed(() => [
    {
      id: '01',
      label: this.langService.translate('services.branding.label'),
      desc: this.langService.translate('services.branding.desc'),
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      color: '#4fabe9'
    },
    {
      id: '02',
      label: this.langService.translate('services.uiux.label'),
      desc: this.langService.translate('services.uiux.desc'),
      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      color: '#5dc983'
    },
    {
      id: '03',
      label: this.langService.translate('services.motion.label'),
      desc: this.langService.translate('services.motion.desc'),
      icon: 'M23 7l-7 5 7 5V7zM1 17h11a2 2 0 002-2V9a2 2 0 00-2-2H1a2 2 0 00-2 2v6a2 2 0 002 2z',
      color: '#8a43e1'
    },
    {
      id: '04',
      label: this.langService.translate('services.social.label'),
      desc: this.langService.translate('services.social.desc'),
      icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
      color: '#ef7b16'
    }
  ]);
}