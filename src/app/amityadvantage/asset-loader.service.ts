import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const BASE = 'advantage-assets';

/** CSS is added when the Amity Advantage section opens and REMOVED when you leave it.
 *  These are the `.scoped.css` builds (see scripts/scope-advantage-css.mjs): every rule is
 *  prefixed with `.advantage-scope`, so the section's global selectors (html, body, a, div, *,
 *  .container ...) can never restyle the shared header/footer.
 *  bootstrap.min.css is not loaded - the main site already ships Bootstrap. */
const STYLES = [
  'style.scoped.css',
  'style-responsive.scoped.css',
  'vertical-rhythm.min.scoped.css',
  'splitting.scoped.css',
  'owl.carousel.min.scoped.css',
].map((f) => `${BASE}/css/${f}`);

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
    this.scriptsReady ??= this.loadScriptsInOrder();
    await this.scriptsReady;
    this.doc.documentElement.classList.add('advantage-active');
  }

  unload(): void {
    this.doc.querySelectorAll('link[data-advantage]').forEach((el) => el.remove());
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
