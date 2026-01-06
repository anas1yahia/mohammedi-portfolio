import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  navItems = signal([
    { label: 'بم أساعدك', path: '/help', styles: { 'font-size': '14px', 'color': '#717070' } },
    { label: 'الاسعار', path: '/pricing', styles: { 'font-size': '13px', 'color': '#646362' } },
    { label: 'اعمالي', path: '/portfolio', styles: { 'font-size': '13px', 'color': '#777676' } },
    { label: 'خدماتي', path: '/services', styles: { 'font-size': '13px', 'color': '#6f6f6e' } }
  ]);
}
