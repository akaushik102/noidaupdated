import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sustainability-green-campus',
  standalone: true,
  imports: [],
  templateUrl: './sustainability-green-campus.component.html',
  styleUrl: './sustainability-green-campus.component.css'
})
export class SustainabilityGreenCampusComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Sustainability & Green Campus | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Discover Amity University Noida’s green campus focused on sustainability, environmental responsibility, energy efficiency, waste management, and eco-conscious learning.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Green Campus, Sustainability, Eco-Friendly Campus, Environmental Responsibility, Sustainable Development, Amity Advantage, Amity University'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Sustainability & Green Campus | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Discover Amity University Noida’s green campus focused on sustainability, environmental responsibility, energy efficiency, waste management, and eco-conscious learning.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/sustainability-green-campus'
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
      content: 'Sustainability & Green Campus | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Discover Amity University Noida’s green campus focused on sustainability, environmental responsibility, energy efficiency, waste management, and eco-conscious learning.'
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
      'https://noida.amity.edu/amityadvantage/sustainability-green-campus';

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