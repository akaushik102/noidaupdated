import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-life-facilities',
  standalone: true,
  imports: [],
  templateUrl: './life-facilities.component.html',
  styleUrl: './life-facilities.component.css'
})
export class LifeFacilitiesComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Amity University Noida Campus Life 2026 | Facilities, Hostels & Labs'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore hostels, labs, libraries, dining, recreation and student support at Amity Noida on a campus built for comfort, growth and daily life. Visit today!'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Campus Life, Student Facilities, Hostel Facilities, Student Amenities, Library Facilities, Recreation, Campus Experience, Amity Advantage'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Amity University Noida Campus Life 2026 | Facilities, Hostels & Labs'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Explore hostels, labs, libraries, dining, recreation and student support at Amity Noida on a campus built for comfort, growth and daily life. Visit today!'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/life-facilities'
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
      content: 'Amity University Noida Campus Life 2026 | Facilities, Hostels & Labs'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Explore hostels, labs, libraries, dining, recreation and student support at Amity Noida on a campus built for comfort, growth and daily life. Visit today!'
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
      'https://noida.amity.edu/amityadvantage/life-facilities';

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