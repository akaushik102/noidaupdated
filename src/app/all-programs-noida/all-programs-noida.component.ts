import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/noidaweb.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../service/course.model';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

declare var bootstrap: any; // Declare bootstrap globally
declare var gtag: any; // Declare gtag for Google Analytics

@Component({
  selector: 'app-all-programs-noida',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './all-programs-noida.component.html',
  styleUrls: ['./all-programs-noida.component.css'],
})
export class AllProgramsNoidaComponent implements OnInit {
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];

  getAllPhdCourseDeiscipline: any[] = [];

  searchTerm: string = '';
  showAllCourses: boolean = true;
  isLoading: boolean = false;

  constructor(
    private meta: Meta,
    private titleService: Title,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.updateMetaTags();
    this.fetchAllCourses();
  }

  fetchAllCourses(): void {
    this.isLoading = true;

    forkJoin({
      regularCourses: this.apiService.GetAllCourseCampus(),
      phdCourses: this.apiService.GetPhdCourseWithoutDeiscipline(),
    }).subscribe({
      next: (result) => {
        console.log('UG / PG Courses:', result.regularCourses);
        console.log('PhD Courses:', result.phdCourses);

        // -----------------------------------------
        // UG / PG COURSES
        // -----------------------------------------

        const regularCourses: any[] = (result.regularCourses || []).map(
          (item: any) => ({
            ...item,

            // Normalize program type
            programType:
              item.stype?.toString().toUpperCase() === 'PG' ? 'PG' : 'UG',
          }),
        );

        // -----------------------------------------
        // PhD COURSES
        // -----------------------------------------

        const phdCourses: any[] = (result.phdCourses || []).map(
          (item: any) => ({
            ...item,

            // Explicitly identify PhD
            programType: 'PHD',
            stype: 'PHD',
          }),
        );

        // -----------------------------------------
        // STORE PHD COURSES
        // -----------------------------------------

        this.getAllPhdCourseDeiscipline = phdCourses;

        // -----------------------------------------
        // MERGE ALL PROGRAMS
        // -----------------------------------------

        this.allCourses = [...regularCourses, ...phdCourses];

        // -----------------------------------------
        // DEFAULT DISPLAY
        // -----------------------------------------

        this.filteredCourses = [...this.allCourses];

        this.showAllCourses = true;

        this.isLoading = false;
      },

      error: (err) => {
        console.error('Error fetching academic programs:', err);

        this.allCourses = [];
        this.filteredCourses = [];
        this.showAllCourses = false;

        this.isLoading = false;
      },
    });
  }

  onApplyClick(eventName: string): void {
    // console.log('Event Triggered:', eventName);
    // console.log('Placeholder:', 'All Program');

    // Example: Google Analytics (gtag)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'CTA Click',
        event_label: 'Apply Now Click',
        placeholder: 'All Program',
        value: 1,
      });
    }

    // Example: DataLayer (for GTM)
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: eventName,
        placeholder: 'All Program',
        eventCategory: 'CTA Click',
        eventAction: 'Apply Now Click',
        eventLabel: 'All Program',
      });
    }
  }

  filterCourses(): void {
    const searchTerm = this.searchTerm?.trim().toLowerCase() || '';

    if (!searchTerm) {
      // If search term is empty, reset to show all courses
      this.showAllCourses = true;
      this.filteredCourses = this.allCourses;
      return;
    }

    const calculateScore = (keywords: string, slugName: string): number => {
      const keywordString = keywords?.toLowerCase() || '';
      const slugString = slugName?.toLowerCase() || '';
      const keywordArray = keywordString.split(/\s+/);
      const searchLower = searchTerm.toLowerCase();

      if (keywordString === searchLower) return 4;
      if (keywordArray.includes(searchLower)) return 3;
      if (keywordArray.some((word) => word.startsWith(searchLower))) return 2;
      if (keywordString.includes(searchLower)) return 1.5;
      if (slugString === searchLower) return 1;
      if (slugString.includes(searchLower)) return 0.5;

      return 0;
    };

    const prioritizeMatches = (courseList: Course[]): Course[] => {
      return courseList
        .map((course) => ({
          ...course,
          score: calculateScore(course.Keywords, course.SlugName),
        }))
        .filter((course) => course.score > 0)
        .sort((a, b) => b.score - a.score);
    };

    this.filteredCourses = prioritizeMatches(this.allCourses);
    this.showAllCourses = this.filteredCourses.length > 0;
  }

  onSearchTermChange(): void {
    this.filterCourses();
  }

  updateMetaTags(): void {
    this.apiService.getAllprogramsMeta().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // Assuming you want to use the first item in the array
          const metaData = data[0];

          // Update meta tags dynamically after data is fetched
          this.titleService.setTitle(
            metaData.Title || 'Amity University, Noida',
          );
          this.meta.updateTag({
            name: 'description',
            content: metaData.Description || 'Amity University, Noida',
          });
          this.meta.updateTag({
            name: 'keywords',
            content: metaData.Keywords || 'Amity University, Noida',
          });

          // ================= Open Graph Meta Tags =================
          this.meta.updateTag({
            property: 'og:locale',
            content: 'en_IN',
          });

          this.meta.updateTag({
            property: 'og:type',
            content: 'website',
          });

          this.meta.updateTag({
            property: 'og:title',
            content: metaData.Title || 'All Programs – Amity University Noida',
          });

          this.meta.updateTag({
            property: 'og:description',
            content:
              metaData.Description ||
              'Explore all undergraduate, postgraduate, doctoral, and professional programs offered by Amity University Noida.',
          });

          this.meta.updateTag({
            property: 'og:url',
            content: metaData.CanonicalUrl || window.location.href,
          });

          this.meta.updateTag({
            property: 'og:site_name',
            content: 'Amity University Noida',
          });

          this.meta.updateTag({
            property: 'og:image',
            content: 'https://noida.amity.edu/assets/img/breadcrump_bg.jpg',
          });

          this.meta.updateTag({
            property: 'og:image:alt',
            content: 'Amity University Noida Campus',
          });

          // ================= Twitter (X) Meta Tags =================
          this.meta.updateTag({
            name: 'twitter:card',
            content: 'summary_large_image',
          });

          this.meta.updateTag({
            name: 'twitter:title',
            content: metaData.Title || 'All Programs – Amity University Noida',
          });

          this.meta.updateTag({
            name: 'twitter:description',
            content:
              metaData.Description ||
              'Explore all undergraduate, postgraduate, doctoral, and professional programs offered by Amity University Noida.',
          });

          this.meta.updateTag({
            name: 'twitter:image',
            content: 'https://noida.amity.edu/assets/img/breadcrump_bg.jpg',
          });

          this.meta.updateTag({
            name: 'twitter:image:alt',
            content: 'Amity University Noida Campus',
          });

          this.meta.updateTag({
            name: 'twitter:site',
            content: '@AmityUni',
          });

          this.meta.updateTag({
            name: 'twitter:creator',
            content: '@AmityUni',
          });

          // Define and set the canonical URL
          const canonicalUrl = metaData.CanonicalUrl || window.location.href;
          this.setCanonicalLink(canonicalUrl);
          // Call function to inject structured schema
          this.injectStructuredData(metaData);
        } else {
          console.warn('No meta data received or array is empty.');
        }
      },
      error: (error: any) => {
        console.error('Error fetching meta data from API:', error);
        this.setCanonicalLink(window.location.href);
      },
    });
  }

  injectStructuredData(metaData: any): void {
    const baseUrl = 'https://noida.amity.edu';
    const pageUrl = metaData.CanonicalUrl || `${baseUrl}/all-programs`;

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['CollectionPage', 'WebPage'],
          '@id': pageUrl,
          url: pageUrl,
          name: metaData.Title || 'All Programs',
          description:
            metaData.Description ||
            'Explore all undergraduate, postgraduate, doctoral, and professional programs offered by Amity University Noida.',
          isPartOf: {
            '@id': '#organization',
          },
          breadcrumb: {
            '@id': '#breadcrumb-programs',
          },
          mainEntity: {
            '@id': '#program-list',
          },
        },

        {
          '@type': 'ItemList',
          '@id': '#program-list',
          name: 'Programs List',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@type': 'EducationalOccupationalProgram',
                '@id': '#program-btech-cse',
                name: 'B.Tech Computer Science Engineering',
                description:
                  'A four-year undergraduate engineering program focused on computer science and emerging technologies.',
                provider: {
                  '@id': '#university',
                },
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@type': 'EducationalOccupationalProgram',
                '@id': '#program-mba',
                name: 'Master of Business Administration (MBA)',
                description:
                  'A postgraduate program designed to develop business management and leadership skills.',
                provider: {
                  '@id': '#university',
                },
              },
            },
          ],
        },

        {
          '@type': ['CollegeOrUniversity', 'EducationalOrganization'],
          '@id': '#university',
          name: 'Amity University Noida',
          url: `${baseUrl}/`,
          description:
            'Amity University Noida is a leading private university offering world-class education, research, and industry-integrated programs.',
          logo: 'https://noida.amity.edu/assets/images/amity-logo.png',
          sameAs: [
            'https://www.facebook.com/amityuni',
            'https://www.instagram.com/amityuniversity',
            'https://www.linkedin.com/school/amity-university',
            'https://twitter.com/AmityUniversity',
          ],
        },

        {
          '@type': 'Organization',
          '@id': '#organization',
          name: 'Amity University Noida',
          url: `${baseUrl}/`,
        },

        {
          '@type': 'BreadcrumbList',
          '@id': '#breadcrumb-programs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${baseUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'All Programs',
              item: pageUrl,
            },
          ],
        },
      ],
    };

    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  private setCanonicalLink(url: string): void {
    // Attempt to find an existing canonical link
    let link: HTMLLinkElement | null = document.querySelector(
      'link[rel="canonical"]',
    );

    if (!link) {
      // If not found, create a new canonical link element
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    // Set the href attribute
    link.setAttribute('href', url);
  }

  formatFacultyName(sfullname: string): string {
    return sfullname
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]+/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
