import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Lang = 'ar' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private document = inject(DOCUMENT);
  currentLang = signal<Lang>('ar');
  isTransitioning = signal(false);

  constructor() {
    // Initial sync from URL
    this.syncFromHash();

    // Sync state to URL and document
    effect(() => {
      const lang = this.currentLang();
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      
      // Update URL hash without jumping
      if (window.location.hash !== `#${lang}`) {
        window.history.replaceState(null, '', `#${lang}`);
      }
    });

    // Listen for manual URL changes
    window.addEventListener('hashchange', () => this.syncFromHash());
  }

  private syncFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'en' || hash === 'ar') {
      this.currentLang.set(hash as Lang);
    } else {
      // Default to ar if no valid hash
      this.currentLang.set('ar');
    }
  }

  translations: any = {
    ar: {
      nav: {
        welcome: 'مرحبا',
        help: 'بم أساعدك',
        pricing: 'الاسعار',
        portfolio: 'اعمالي',
        services: 'خدماتي',
        cta: 'قدم مشروعك'
      },
      hero: {
        welcome: '! اهلا بكم',
        name: 'انا محمد الأمين محمدي',
        role: 'مصمم جرافيكي',
        needDesign: 'تحتاج تصميما',
        contactMe: 'تواصل معي',
        statsClients: 'زبون راض عن العمل',
        statsExperience: 'سنوات خبرة',
        service1: 'تصاميم الاغلفة',
        service2: 'تصميم الشعارات',
        service3: 'مونتاج الفيديوهات',
        service4: 'تصاميم السوشل ميديا',
        description: 'محمد الأمين محمدي مصمم جرافيكي وصانع محتوى رقمي 5 سنوات خبرة مختص في جعل مشاريعك عالقة في أذهان زبائنك ومنافسيك'
      },
      projects: {
        title: 'تصاميم أغلفة الكتب والمجلات',
        cat: 'تصميم غلاف'
      },
      workSteps: {
        title: 'خطوات العمل معي',
        step1Title: 'تواصل معي',
        step1Desc: 'أرسل لي تفاصيل مشروعك أو فكرتك عبر البريد الإلكتروني أو الواتساب.',
        step2Title: 'إرسال الملخص',
        step2Desc: 'سنناقش التفاصيل والمتطلبات والميزانية لتحديد نطاق العمل بوضوح.',
        step3Title: 'بدء العمل',
        step3Desc: 'بعد الاتفاق، سأبدأ في تنفيذ المشروع وتسليم النماذج الأولية للمراجعة.',
        ready: 'جاهز للبدء؟',
        wa: 'تواصل واتساب'
      },
      testimonials: {
        title: 'كلمات من أصدقائي'
      }
    },
    en: {
      nav: {
        welcome: 'Welcome',
        help: 'How can I help?',
        pricing: 'Pricing',
        portfolio: 'Portfolio',
        services: 'Services',
        cta: 'Submit Project'
      },
      hero: {
        welcome: 'Welcome!',
        name: "I'm Mohamed El Amine Mohammedi",
        role: 'Graphic Designer',
        needDesign: 'Need a Design',
        contactMe: 'Contact Me',
        statsClients: 'Satisfied Clients',
        statsExperience: 'Years of Experience',
        service1: 'Cover Design',
        service2: 'Logo Design',
        service3: 'Video Editing',
        service4: 'Social Media Design',
        description: 'Mohamed El Amine Mohammedi, graphic designer and digital content creator with 5 years of experience, specialized in making your projects stick in the minds of your customers and competitors.'
      },
      projects: {
        title: 'Book and Magazine Cover Designs',
        cat: 'Cover Design'
      },
      workSteps: {
        title: 'How I Work',
        step1Title: 'Contact Me',
        step1Desc: 'Send me your project details or idea via email or WhatsApp.',
        step2Title: 'Send Brief',
        step2Desc: 'We will discuss details, requirements, and budget to clearly define the scope of work.',
        step3Title: 'Start Working',
        step3Desc: 'After agreement, I will start executing the project and deliver initial drafts for review.',
        ready: 'Ready to start?',
        wa: 'Contact WhatsApp'
      },
      testimonials: {
        title: 'Words from my friends'
      }
    }
  };

  translate(key: string) {
    const keys = key.split('.');
    let result = this.translations[this.currentLang()];
    for (const k of keys) {
      if (result) result = result[k];
    }
    return result || key;
  }

  async toggleLang() {
    if (this.isTransitioning()) return;

    this.isTransitioning.set(true);
    
    // Wait for playhead to reach middle (750ms of 1500ms)
    await new Promise(resolve => setTimeout(resolve, 750));
    
    this.currentLang.update(l => l === 'ar' ? 'en' : 'ar');
    
    // Wait for animation to finish (remaining 750ms)
    await new Promise(resolve => setTimeout(resolve, 750));
    
    this.isTransitioning.set(false);
  }
}