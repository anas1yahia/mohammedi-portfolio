import { Component, signal, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  langService = inject(LanguageService);

  navItems = computed(() => [
    { label: this.langService.translate('nav.help'), path: '/', fragment: 'work-steps', styles: { 'font-size': '14px', 'color': '#717070' } },
    { label: this.langService.translate('nav.pricing'), path: '/', fragment: 'work-steps', styles: { 'font-size': '13px', 'color': '#646362' } },
    { label: this.langService.translate('nav.portfolio'), path: '/', fragment: 'portfolio', styles: { 'font-size': '13px', 'color': '#777676' } },
    { label: this.langService.translate('nav.services'), path: '/', fragment: 'work-steps', styles: { 'font-size': '13px', 'color': '#6f6f6e' } }
  ]);

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  toggleLanguage() {
    this.langService.toggleLang();
  }
}
