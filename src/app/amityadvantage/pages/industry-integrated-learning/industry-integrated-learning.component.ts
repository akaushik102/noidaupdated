import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-industry-integrated-learning',
  standalone: true,
  imports: [],
  templateUrl: './industry-integrated-learning.component.html',
  styleUrl: './industry-integrated-learning.component.css'
})
export class IndustryIntegratedLearningComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Industry-Integrated Learning | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore industry-integrated learning at Amity University Noida with practical training, live projects, internships, corporate interaction, industry partnerships, and career-focused education.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Industry Integrated Learning, Corporate Partnerships, Industry Exposure, Internships, Practical Learning, Career Readiness, Amity Advantage'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Industry-Integrated Learning | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Explore industry-integrated learning at Amity University Noida with practical training, live projects, internships, corporate interaction, industry partnerships, and career-focused education.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/industry-integrated-learning'
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://noida.amity.edu/amityadvantage/images/logo.png'
    });

    // ✅ Twitter Tags
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Industry-Integrated Learning | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Explore industry-integrated learning at Amity University Noida with practical training, live projects, internships, corporate interaction, industry partnerships, and career-focused education.'
    });

    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://noida.amity.edu/amityadvantage/images/logo.png'
    });

    // ✅ Canonical URL
    this.setCanonicalURL();
  }

  private setCanonicalURL(): void {
    const canonicalUrl =
      'https://noida.amity.edu/amityadvantage/industry-integrated-learning';

    let link: HTMLLinkElement | null =
      this.document.querySelector("link[rel='canonical']");

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }
}