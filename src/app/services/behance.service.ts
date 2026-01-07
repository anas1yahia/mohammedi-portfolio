import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface BehanceProject {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  description: string;
  pubDate: string;
  categories: string[];
  fullDescription?: string;
  images?: string[];
  detailsLoaded?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BehanceService {
  // Behance profile: https://www.behance.net/almohammedi_dz
  private readonly USERNAME = 'almohammedi_dz';
  
  projects = signal<BehanceProject[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  async fetchProjects() {
    this.loading.set(true);
    this.error.set(null);

    try {
      // Try multiple CORS proxies in order
      const proxies = [
        'https://api.codetabs.com/v1/proxy?quest=',
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?'
      ];
      
      const behanceUrl = `https://www.behance.net/feeds/user?username=${this.USERNAME}`;
      
      let rssText: string | null = null;
      
      for (const proxy of proxies) {
        try {
          const url = `${proxy}${encodeURIComponent(behanceUrl)}`;
          rssText = await firstValueFrom(
            this.http.get(url, { responseType: 'text' })
          );
          break; // Success, exit loop
        } catch (proxyError) {
          // Silently try next proxy
          continue;
        }
      }
      
      if (!rssText) {
        throw new Error('All proxies failed');
      }
      
      // Parse XML RSS feed
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(rssText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      
      if (items.length === 0) {
        throw new Error('No projects found in feed');
      }
      
      const projects: BehanceProject[] = Array.from(items).map((item, index) => {
        const title = item.querySelector('title')?.textContent || 'Untitled';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        const description = item.querySelector('description')?.textContent || '';
        const category = item.querySelector('category')?.textContent || 'Design';
        
        // Try to get thumbnail from media:thumbnail first, then fall back to description
        const mediaThumbnail = item.querySelector('thumbnail')?.getAttribute('url') || 
                               item.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url');
        
        const thumbnail = mediaThumbnail || this.extractImageFromHtml(description);
        
        // Extract ALL images from the description HTML
        const allImages = this.extractAllImagesFromHtml(description);
        
        return {
          id: link || `project-${index}`,
          name: title,
          url: link,
          thumbnail: thumbnail,
          description: this.stripHtml(description),
          fullDescription: description, // Store full HTML for later use
          pubDate: pubDate,
          categories: [category],
          images: allImages.length > 0 ? allImages : [thumbnail],
          detailsLoaded: false // Need to fetch full details later
        };
      });
      
      this.projects.set(projects);
    } catch (err: any) {
      console.error('Behance RSS Error:', err);
      // Fallback to mock data
      this.loadFallbackData();
    } finally {
      this.loading.set(false);
    }
  }

  private loadFallbackData() {
    // Fallback projects when API fails
    const fallbackProjects: BehanceProject[] = [
      {
        id: '1',
        name: 'Book Cover Design - Forbidden Feelings',
        url: `https://www.behance.net/${this.USERNAME}`,
        thumbnail: 'assets/projects/placeholder.jpg',
        description: 'Professional book cover design with modern aesthetics',
        pubDate: new Date(2024, 11, 1).toISOString(),
        categories: ['Graphic Design']
      },
      {
        id: '2',
        name: 'Book Cover Design - On the Vortex Edge',
        url: `https://www.behance.net/${this.USERNAME}`,
        thumbnail: 'assets/projects/placeholder.jpg',
        description: 'Creative book cover design with compelling visuals',
        pubDate: new Date(2024, 10, 15).toISOString(),
        categories: ['Graphic Design']
      },
      {
        id: '3',
        name: 'Book Cover Design - The Path to Destruction',
        url: `https://www.behance.net/${this.USERNAME}`,
        thumbnail: 'assets/projects/placeholder.jpg',
        description: 'Artistic book cover design with unique typography',
        pubDate: new Date(2024, 9, 20).toISOString(),
        categories: ['Graphic Design']
      }
    ];
    
    this.projects.set(fallbackProjects);
    this.error.set(null); // Don't show error with fallback data
  }

  private extractImageFromHtml(html: string): string {
    if (!html) return '';
    
    // Try multiple patterns to extract images
    const patterns = [
      /<img[^>]+src=["']([^"']+)["']/i,
      /src=["']([^"']+\.(?:jpg|jpeg|png|gif|webp))["']/i,
      /https?:\/\/[^\s<>"]+\.(?:jpg|jpeg|png|gif|webp)/i
    ];
    
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
      if (match && match[0]) {
        return match[0];
      }
    }
    
    return '';
  }

  private extractAllImagesFromHtml(html: string): string[] {
    if (!html) return [];
    
    const images: string[] = [];
    
    // Pattern 1: Extract from img tags with single quotes
    const imgTagPattern1 = /<img[^>]+src='([^']+)'/gi;
    let match;
    while ((match = imgTagPattern1.exec(html)) !== null) {
      images.push(match[1]);
    }
    
    // Pattern 2: Extract from img tags with double quotes
    const imgTagPattern2 = /<img[^>]+src="([^"]+)"/gi;
    while ((match = imgTagPattern2.exec(html)) !== null) {
      images.push(match[1]);
    }
    
    // Pattern 3: Extract direct Behance CDN URLs (including projects/ path)
    const behanceCdnPattern = /https:\/\/mir-s3-cdn-cf\.behance\.net\/(?:project_modules|projects)\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp)/gi;
    const cdnMatches = html.match(behanceCdnPattern);
    if (cdnMatches) {
      images.push(...cdnMatches);
    }
    
    // Pattern 4: Any image URLs in the content
    const genericImagePattern = /https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp)/gi;
    const genericMatches = html.match(genericImagePattern);
    if (genericMatches) {
      images.push(...genericMatches);
    }
    
    // Remove duplicates and filter out small/icon images
    const uniqueImages = [...new Set(images)]
      .filter(url => 
        !url.includes('avatar') && 
        !url.includes('profile') && 
        !url.includes('icon') &&
        !url.includes('logo')
      )
      .slice(0, 20);
    
    return uniqueImages;
  }

  private stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 200);
  }

  getProjectYear(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
  }

  async fetchProjectDetails(project: BehanceProject): Promise<BehanceProject> {
    // No need to fetch - we'll display the project in iframe
    return project;
  }
}
