import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const BASE = 'advantage-assets';

/** CSS is added when the Amity Advantage section opens and REMOVED when you leave it,
 *  so its global rules (html, body, a, h1, .container ...) never touch the rest of the site.
 *  NOTE: bootstrap.min.css is excluded to prevent conflicts with the main site's Bootstrap */
const STYLES = [
  // 'bootstrap.min.css', // Skip - main site already has Bootstrap, loading another causes header conflicts
  'style.css',
  'style-responsive.css',
  'vertical-rhythm.min.css',
  'splitting.css',
  'owl.carousel.min.css',
].map((f) => `${BASE}/css/${f}`);

/** CSS to protect the header from advantage page CSS overrides - injected AFTER advantage CSS */
const HEADER_PROTECTION_CSS = `
  app-header .th-header,
  app-header .header-top,
  app-header .header-links,
  app-header .nav-background,
  app-header .navbar,
  app-header .navbar-collapse,
  app-header .navbar-nav,
  app-header .nav-item,
  app-header .nav-link,
  app-header .dropdown-menu,
  app-header .container,
  app-header .container-fluid,
  app-header .row,
  app-header [class*="col-"] {
    all: revert !important;
  }

  app-header .th-header { position: relative !important; z-index: 41 !important; }
  app-header .header-top { display: block !important; background-color: #f6c214 !important; padding: 9px 0 !important; }
  app-header .header-top .container { display: block !important; }
  app-header .header-top .row { display: flex !important; flex-wrap: wrap !important; }
  app-header .d-none { display: none !important; }
  app-header .d-lg-block { display: block !important; }
  app-header .col-md-9 { flex: 0 0 75% !important; max-width: 75% !important; display: block !important; }
  app-header .col-md-3 { flex: 0 0 25% !important; max-width: 25% !important; display: block !important; }
  app-header .col-md-2 { flex: 0 0 16.666667% !important; max-width: 16.666667% !important; display: block !important; }
  app-header .col-md-10 { flex: 0 0 83.333333% !important; max-width: 83.333333% !important; display: block !important; }
  app-header .header-links { display: block !important; }
  app-header .header-links ul { margin: 0 !important; padding: 0 !important; list-style: none !important; display: block !important; }
  app-header .header-links li { display: inline-block !important; font-size: 15px !important; }
  app-header .header-links li:not(:last-child) { padding: 0 11px 0 0 !important; margin: 0 11px 0 0 !important; }
  app-header .header-links a { color: #0b2d4c !important; text-decoration: none !important; }
  app-header .nav-background { background: #0c2d4d !important; padding: 0 !important; }
  app-header .navbar { padding: 0 !important; display: flex !important; flex-wrap: wrap !important; align-items: center !important; }
  app-header .navbar-collapse { display: flex !important; flex-basis: auto !important; }
  app-header .navbar-nav { display: flex !important; flex-direction: row !important; padding-left: 0 !important; margin-bottom: 0 !important; list-style: none !important; }
  app-header .nav-item { display: list-item !important; }
  app-header .nav-item.dropdown { position: relative !important; }
  app-header .navbar-nav .nav-link { display: block !important; color: #fff !important; padding: 20px 15px !important; font-size: 15px !important; font-weight: 500 !important; text-transform: uppercase !important; text-decoration: none !important; }
  app-header .navbar-nav .nav-link:hover { color: #f6c214 !important; }
  app-header .dropdown-menu { display: none !important; position: absolute !important; background-color: #fff !important; border: none !important; box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important; padding: 10px 0 !important; min-width: 200px !important; z-index: 1000 !important; }
  app-header .dropdown:hover > .dropdown-menu, app-header .nav-item.dropdown:hover > .dropdown-menu { display: block !important; }
  app-header .dropdown-menu .dropdown-item { display: block !important; color: #0c2d4d !important; padding: 8px 20px !important; font-size: 14px !important; text-decoration: none !important; }
  app-header .dropdown-menu .dropdown-item:hover { background-color: #f6c214 !important; color: #0c2d4d !important; }
  app-header .th-btn { display: inline-block !important; background-color: #f6c214 !important; color: #0c2d4d !important; padding: 15px 18px !important; border-radius: 5px !important; font-weight: 600 !important; text-transform: uppercase !important; border: none !important; text-decoration: none !important; }
  app-header .header-social { display: inline-block !important; }
  app-header .header-social a { color: #0b2d4c !important; margin-right: 10px !important; display: inline-block !important; text-decoration: none !important; }
  app-header .header-social a:hover { color: #f6c214 !important; }
  app-header .text-end { text-align: right !important; }
  app-header .ms-auto { margin-left: auto !important; }
  app-header .justify-content-center { justify-content: center !important; }
  app-header .justify-content-lg-between { justify-content: space-between !important; }
  app-header .align-items-center { align-items: center !important; }
  app-header a { text-decoration: none !important; }
`;

/** Scripts are order-dependent. They can't be "unloaded", so each loads only once. */
const SCRIPTS = [
  'jquery.min.js',
  'bootstrap.bundle.min.js',
  'plugins.js',
  'jquery.ajaxchimp.min.js',
  'all.js',
  'custom.js',
  'owl.carousel.js',
  'init-menu.js',
].map((f) => `${BASE}/js/${f}`);

@Injectable({ providedIn: 'root' })
export class AdvantageAssetLoader {
  private scriptsReady?: Promise<void>;

  constructor(@Inject(DOCUMENT) private doc: Document) { }

  async load(): Promise<void> {
    await Promise.all(STYLES.map((h) => this.addStyle(h)));
    this.injectHeaderProtection(); // Inject AFTER advantage CSS to override it
    this.scriptsReady ??= this.loadScriptsInOrder();
    await this.scriptsReady;
    this.doc.documentElement.classList.add('advantage-active');
  }

  private injectHeaderProtection(): void {
    const existingStyle = this.doc.querySelector('style[data-header-protection]');
    if (existingStyle) return;
    const style = this.doc.createElement('style');
    style.setAttribute('data-header-protection', '');
    style.textContent = HEADER_PROTECTION_CSS;
    this.doc.head.appendChild(style);
  }

  unload(): void {
    this.doc.querySelectorAll('link[data-advantage]').forEach((el) => el.remove());
    this.doc.querySelector('style[data-header-protection]')?.remove();
    this.doc.documentElement.classList.remove('advantage-active');
    (window as any).destroyMainMenu?.();
  }

  private addStyle(href: string): Promise<void> {
    return new Promise((resolve) => {
      const existing = this.doc.querySelector(`link[data-advantage][href="${href}"]`);
      if (existing) return resolve();
      const link = this.doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-advantage', '');
      link.onload = () => resolve();
      link.onerror = () => resolve(); // never block the page on one failed file
      this.doc.head.appendChild(link);
    });
  }

  private async loadScriptsInOrder(): Promise<void> {
    for (const src of SCRIPTS) {
      // If the main site already ships jQuery, reuse it instead of replacing window.$
      if (src.endsWith('jquery.min.js') && (window as any).jQuery) continue;
      await new Promise<void>((resolve) => {
        const s = this.doc.createElement('script');
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        s.onerror = () => resolve();
        this.doc.body.appendChild(s);
      });
    }
  }
}
