import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdvantageAssetLoader } from '../asset-loader.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advantage-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './advantage-layout.component.html',
})
export class AdvantageLayoutComponent implements OnInit, AfterViewChecked, OnDestroy {
  ready = false;
  private menuInit = false;

  constructor(private assets: AdvantageAssetLoader, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.assets.load();   // CSS + JS first, then render the pages
    this.ready = true;
    this.cdr.markForCheck();
  }

  ngAfterViewChecked() {
    if (this.ready && !this.menuInit) {
      this.menuInit = true;
      setTimeout(() => (window as any).initMainMenu?.(), 200);
    }
  }

  ngOnDestroy() {
    this.assets.unload();
  }
}
