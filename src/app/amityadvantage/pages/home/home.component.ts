import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit(): void {
    // ✅ Page Title

    this.titleService.setTitle(
      'Why Study at Amity University Noida | The Amity Advantage',
    );

    // ✅ Meta Description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore the Amity Advantage at Amity University Noida with world-class infrastructure, global exposure, industry-integrated learning, research opportunities, and strong placement support.',
    });

    // ✅ Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Amity Advantage, Amity University, Top Private University, Higher Education India, Placements, Scholarships, Campus Life',
    });

    // ✅ Open Graph
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Why Study at Amity University Noida | The Amity Advantage',
    });

    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Explore the Amity Advantage at Amity University Noida with world-class infrastructure, global exposure, industry-integrated learning, research opportunities, and strong placement support.',
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://noida.amity.edu/amityadvantage/',
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://noida.amity.edu/amityadvantage/images/logo.png',
    });

    // ✅ Twitter Cards
    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Why Study at Amity University Noida | The Amity Advantage',
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content:
        'Explore the Amity Advantage at Amity University Noida with world-class infrastructure, global exposure, industry-integrated learning, research opportunities, and strong placement support.',
    });

    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://noida.amity.edu/amityadvantage/images/logo.png',
    });

    // ✅ Canonical URL
    this.setCanonicalURL();

    // ✅ Elfsight
    this.loadElfsightScript();
    this.startSlider();
  }


  // ✅ Canonical URL
  private setCanonicalURL(): void {
    const canonicalUrl = 'https://noida.amity.edu/amityadvantage/';

    let link: HTMLLinkElement | null = this.document.querySelector(
      "link[rel='canonical']",
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', canonicalUrl);
  }

  // ✅ Elfsight script
  loadElfsightScript() {
    const scriptId = 'elfsight-platform-script';

    if (document.getElementById(scriptId)) {
      (window as any).elfsight = (window as any).elfsight || {
        refresh: () => { },
      };
      setTimeout(() => (window as any).elfsight.refresh(), 500);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }

  // ✅ Owl Carousel
  ngAfterViewInit() {
    setTimeout(() => {
      $('.owl-slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        nav: false,
        dots: true,
      });
    });
  }

  currentSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | undefined;

  bannerImages = [
    {
      src: 'advantage-assets/images/slider1.jpg',
      alt: 'Amity Advantage banner 1'
    },
    {
      src: 'advantage-assets/images/slider2.jpg',
      alt: 'Amity Advantage banner 2'
    },
    {
      src: 'advantage-assets/images/slider3.jpg',
      alt: 'Amity Advantage banner 3'
    },
    {
      src: 'advantage-assets/images/slider4.jpg',
      alt: 'Amity Advantage banner 4'
    },
    {
      src: 'advantage-assets/images/slider5.jpg',
      alt: 'Amity Advantage banner 5'
    }
  ];

  
  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.bannerImages.length;
    this.restartSlider();
  }

  previousSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.bannerImages.length) %
      this.bannerImages.length;
    this.restartSlider();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.restartSlider();
  }

  private startSlider(): void {
    this.stopSlider();

    this.slideInterval = setInterval(() => {
      this.currentSlide =
        (this.currentSlide + 1) % this.bannerImages.length;
    }, 4000);
  }

  private restartSlider(): void {
    this.startSlider();
  }

  private stopSlider(): void {
    if (this.slideInterval !== undefined) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }
}
