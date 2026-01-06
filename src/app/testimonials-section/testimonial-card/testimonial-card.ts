import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss'
})
export class TestimonialCardComponent {
  @Input() content: string = '';
  @Input() authorName: string = '';
  @Input() authorRole: string = '';
  @Input() authorImage: string = '';
  @Input() isPrimary: boolean = false;
}
