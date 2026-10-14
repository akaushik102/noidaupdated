import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-global-exposure',
  standalone: true,
  imports: [],
  templateUrl: './global-exposure.component.html',
  styleUrl: './global-exposure.component.css'
})
export class GlobalExposureComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Global Exposure & International Opportunities | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Discover international learning opportunities at Amity University Noida with global collaborations, study abroad programs, and diverse academic exposure.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Global Exposure, International Education, Student Exchange Programs, Global Learning, International Collaborations, Study Abroad, Amity Advantage'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Global Exposure & International Opportunities | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Discover international learning opportunities at Amity University Noida with global collaborations, study abroad programs, and diverse academic exposure.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/global-exposure'
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://noida.amity.edu/amityadvantage/images/logo.png'
    });

    // ✅ Twitter/X Tags
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Global Exposure & International Opportunities | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Discover international learning opportunities at Amity University Noida with global collaborations, study abroad programs, and diverse academic exposure.'
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
      'https://noida.amity.edu/amityadvantage/global-exposure';

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