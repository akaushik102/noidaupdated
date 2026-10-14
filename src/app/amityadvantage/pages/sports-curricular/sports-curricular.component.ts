import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sports-curricular',
  standalone: true,
  imports: [],
  templateUrl: './sports-curricular.component.html',
  styleUrl: './sports-curricular.component.css'
})
export class SportsCurricularComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Sports & Curricular Activities | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Experience dynamic sports and curricular activities at Amity University Noida designed to promote teamwork, leadership, creativity, and overall student well-being.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Sports Activities, Co-Curricular Activities, Student Clubs, Cultural Events, Campus Life, Leadership Development, Amity Advantage'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Sports & Curricular Activities | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Experience dynamic sports and curricular activities at Amity University Noida designed to promote teamwork, leadership, creativity, and overall student well-being.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/sports-curricular'
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
      content: 'Sports & Curricular Activities | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Experience dynamic sports and curricular activities at Amity University Noida designed to promote teamwork, leadership, creativity, and overall student well-being.'
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
      'https://noida.amity.edu/amityadvantage/sports-curricular';

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