import { Component } from '@angular/core';
import { TestimonialCardComponent } from './testimonial-card/testimonial-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, TestimonialCardComponent],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.scss'
})
export class TestimonialsSectionComponent {
  testimonials = [
    {
      content: `كانت قدرتك على التنظيم والترتيب مذهلة لقد جعلت كل مرحلة من مراحل العمل واضحة ومخططا لها بدقة مما سهل علينا اتخاذ الخطوات الصحيحة في الوقت المناسب إلى جانب ذلك أدهشني بعد نظرك في التخطيط والتوجيه فقد استطعت رؤية الصورة الكاملة للمشروع والعمل على تحقيقها بشكل احترافي ومتكامل ما أقدره أيضا هو مرونتك في التعامل مع التغييرات والتحديات التي واجهتنا لم يكن هناك طلب أو تعديل إلا واستقبلته بابتسامة وباحترافية عالية مما جعلني أشعر بثقة كبيرة في أنك الشخص المناسب لهذه المهمة`,
      authorName: 'محمود الهندي',
      authorRole: 'مؤلف ومنتج موسيقي',
      authorImage: 'assets/testimonials/mahmoud.png',
      isPrimary: true
    },
    {
      content: `بشار شاب خلوق ومحترم ومريح في التعامل على الصعيد الشخصي ويتلقى الملاحظات بصدر رحب، وعلى المهارات التقنية فهو متمكن من الأدوات التي يستخدمها ويقدم النصح والإرشاد لاستخدام أفضل الأدوات`,
      authorName: 'أسماء الأنديجاني',
      authorRole: 'كاتبة',
      authorImage: 'assets/testimonials/asma.png',
      isPrimary: false
    },
    {
      content: `اشكر حرصك على اداء عملك بمهنية واحترافيه ماقصرت معي رغم كل التحديات كنت تسعى دائماً لإيجاد الحلول ، مستمرين ان شاءالله معك مو اخر تعاون مع تمنياتي لك بمزيد من التألق والابداع`,
      authorName: 'سارة الدبيان',
      authorRole: 'مصممة',
      authorImage: 'assets/testimonials/sara.png',
      isPrimary: false
    }
  ];
}
