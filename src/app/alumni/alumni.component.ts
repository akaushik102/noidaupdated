
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface Alumnus {
  name: string;
  designation: string;
  image: string;
}

@Component({
  selector: 'app-alumni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumni.component.html',
  styleUrls:
    [
      './main.css',
      './animate.min.css',
      './Desktop-form.css',
      './owl.carousel.min.css',
      './responsive.css',
      './alumni.component.css',
    ]
})
export class AlumniComponent {


  activeFaq: number = 0;

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }

  currentIndex = 0;
  itemsPerView = 3;

  alumni: Alumnus[] = [
    {
      name: 'Rahul Malhotra',
      designation: 'Director, Intel Corporation',
      image: '/assets/alumni/rahul-malhotra.webp'
    },
    {
      name: 'Atish Majumdar',
      designation: 'President, Mankind Pharma',
      image: '/assets/alumni/atish-majumdar.webp'
    },
    {
      name: 'Kanika Bakshi',
      designation: 'Director, Oracle India',
      image: '/assets/alumni/kanika-bakshi.webp'
    },
    {
      name: 'Abhishek Bhattacharya',
      designation: 'President, Blockchain, Cornell Tech',
      image: '/assets/alumni/abhishek-bhattacharya.webp'
    },
    {
      name: 'Piyush Khatreja',
      designation: 'Standard Chartered Bank, Singapore',
      image: '/assets/alumni/piyush-khatreja.webp'
    },
    {
      name: 'Shrenik Jain',
      designation: 'CIO and Senior Vice President IT, Siemens Middle East',
      image: '/assets/alumni/shrenik-jain.webp'
    },
    {
      name: 'Biswapriya Bhattacharjee',
      designation: 'Executive Vice President and Head, Kantar, Bengaluru',
      image: '/assets/alumni/biswapriya-bhattacharjee.webp'
    },
    {
      name: 'Saurabh Baishakhia',
      designation: 'Head Of Digital Appliances at Samsung India',
      image: '/assets/alumni/saurabh-baishakhia.webp'
    },
    {
      name: 'Ayesha Bhalla',
      designation: 'Market Director National Sales, Marriott International',
      image: '/assets/alumni/ayesha-bhalla.webp'
    },
    {
      name: 'Mansi Chaudhry',
      designation: 'Founder and Managing Partner, The Frontiers Legal, New Delhi',
      image: '/assets/alumni/mansi-chaudhry.webp'
    }
  ];

  get visibleAlumni(): Alumnus[] {
    const result: Alumnus[] = [];
    const count = Math.min(this.itemsPerView, this.alumni.length);

    for (let i = 0; i < count; i++) {
      result.push(
        this.alumni[(this.currentIndex + i) % this.alumni.length]
      );
    }

    return result;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateItemsPerView();
  }

  ngOnInit(): void {
    this.updateItemsPerView();
  }

  private updateItemsPerView(): void {
    if (typeof window === 'undefined') {
      this.itemsPerView = 1;
      return;
    }

    if (window.innerWidth < 576) {
      this.itemsPerView = 1;
    } else if (window.innerWidth < 992) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 3;
    }
  }

  nextSlide(): void {
    this.currentIndex =
      (this.currentIndex + 1) % this.alumni.length;
  }

  previousSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.alumni.length) % this.alumni.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  trackByName(index: number, alumnus: Alumnus): string {
    return alumnus.name;
  }


}
