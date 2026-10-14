import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-innovation-research',
  standalone: true,
  imports: [],
  templateUrl: './innovation-research.component.html',
  styleUrl: './innovation-research.component.css'
})
export class InnovationResearchComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Innovation & Research Excellence | Amity University Noida'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Experience innovation and academic excellence at Amity University Noida through research programs, technology-driven learning, and industry-oriented projects.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Innovation, Research Excellence, Research Centers, Patents, Technology Innovation, Industry Collaboration, Amity Advantage, Amity University'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Innovation & Research Excellence | Amity University Noida'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Experience innovation and academic excellence at Amity University Noida through research programs, technology-driven learning, and industry-oriented projects.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/innovation-research'
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
      content: 'Innovation & Research Excellence | Amity University Noida'
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Experience innovation and academic excellence at Amity University Noida through research programs, technology-driven learning, and industry-oriented projects.'
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
      'https://noida.amity.edu/amityadvantage/innovation-research';

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