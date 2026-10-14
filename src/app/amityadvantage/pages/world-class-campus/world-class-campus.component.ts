import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-world-class-campus',
  standalone: true,
  imports: [],
  templateUrl: './world-class-campus.component.html',
  styleUrl: './world-class-campus.component.css',
})
export class WorldClassCampusComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'World-Class Campus Infrastructure | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Experience world-class campus facilities at Amity University Noida designed to support academic excellence, research, innovation, and holistic student development.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'World Class Campus, Modern Infrastructure, Campus Facilities, Smart Classrooms, Advanced Laboratories, Student Life, Amity Advantage'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'World-Class Campus Infrastructure | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Experience world-class campus facilities at Amity University Noida designed to support academic excellence, research, innovation, and holistic student development.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/world-class-campus'
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
      content: 'World-Class Campus Infrastructure | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Experience world-class campus facilities at Amity University Noida designed to support academic excellence, research, innovation, and holistic student development.'
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
      'https://noida.amity.edu/amityadvantage/world-class-campus';

    let link: HTMLLinkElement | null = this.document.querySelector(
      "link[rel='canonical']"
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }
}