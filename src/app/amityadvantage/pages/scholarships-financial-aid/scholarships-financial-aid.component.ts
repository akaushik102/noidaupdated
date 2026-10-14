import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-scholarships-financial-aid',
  standalone: true,
  imports: [],
  templateUrl: './scholarships-financial-aid.component.html',
  styleUrl: './scholarships-financial-aid.component.css'
})
export class ScholarshipsFinancialAidComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {

    // ✅ Meta Title
    this.titleService.setTitle(
      'Financial Aid & Scholarship Programs'
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Amity University Noida offers merit-based scholarships and financial aid to support academic excellence and student success. Explore eligibility and benefits.'
    });

    // ✅ Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Amity Scholarships, Financial Aid, Merit Scholarships, Student Financial Assistance, Amity Advantage, Education Funding'
    });

    // ✅ Open Graph Tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Financial Aid & Scholarship Programs'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Amity University Noida offers merit-based scholarships and financial aid to support academic excellence and student success. Explore eligibility and benefits.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content:
        'https://noida.amity.edu/amityadvantage/scholarships-financial-aid'
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });

    // Optional Social Sharing Image
    this.metaService.updateTag({
      property: 'og:image',
      content:
        'https://noida.amity.edu/amityadvantage/images/logo.png'
    });

    // ✅ Canonical URL
    this.setCanonicalURL();
  }

  private setCanonicalURL(): void {
    const canonicalUrl =
      'https://noida.amity.edu/amityadvantage/scholarships-financial-aid';

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