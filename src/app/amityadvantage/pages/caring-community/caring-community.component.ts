import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-caring-community',
  standalone: true,
  imports: [],
  templateUrl: './caring-community.component.html',
  styleUrl: './caring-community.component.css'
})
export class CaringCommunityComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Caring Community & Student Well-being | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore Amity University Noida’s caring community focused on student well-being through counseling support, wellness initiatives, student clubs, safety, inclusivity, and holistic development.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Caring Community, Student Support, Campus Life, Student Wellness, Amity Advantage, Amity University'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Caring Community & Student Well-being | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Explore Amity University Noida’s caring community focused on student well-being through counseling support, wellness initiatives, student clubs, safety, inclusivity, and holistic development.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://noida.amity.edu/amityadvantage/caring-community'
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
      content: 'Caring Community & Student Well-being | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Explore Amity University Noida’s caring community focused on student well-being through counseling support, wellness initiatives, student clubs, safety, inclusivity, and holistic development.'
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
      'https://noida.amity.edu/amityadvantage/caring-community';

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