import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './global/navbar/navbar';
import { SocialIconsComponent } from './global/social-icons/social-icons';
import { FooterComponent } from './global/footer/footer';
import { LanguageService } from './services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, SocialIconsComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  langService = inject(LanguageService);
  protected readonly title = signal('mohammedi-portfolio');
}
