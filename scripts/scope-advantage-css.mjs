// Generates scoped copies of the Amity Advantage stylesheets so their global rules
// (html, body, a, div, *, .container ...) only apply inside `.advantage-scope` and can
// no longer leak into the shared header/footer.
//   usage: node scripts/scope-advantage-css.mjs
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';

const SCOPE = '.advantage-scope';
const DIR = path.resolve('public/advantage-assets/css');
const FILES = ['icons.css', 'icomoon.css', 'font-awesome-brands.css', 'style.css', 'style-responsive.css', 'vertical-rhythm.min.css', 'splitting.css', 'owl.carousel.min.css'];

function scopeSelector(sel) {
  sel = sel.trim();
  if (!sel) return sel;
  // html / body / :root stand for the page root -> the scope wrapper
  const root = sel.match(/^(?:html\s+body|html|body|:root)((?:[.#:\[][^\s>+~]*)?)$/);
  if (root) return SCOPE + root[1].replace(/^:not\(\.[\w-]+\)$/, '');
  // html-state selectors (html:not(.no-touch) .foo): keep the html condition, scope the rest
  const htmlState = sel.match(/^(html(?:[.:\[][^\s]*)?)\s+(.+)$/);
  if (htmlState) return `${htmlState[1]} ${SCOPE} ${htmlState[2].replace(/^body\s+/, '')}`;
  const bodyState = sel.match(/^body(?:[.:\[][^\s]*)?\s+(.+)$/);
  if (bodyState) return `${SCOPE} ${bodyState[1]}`;
  return `${SCOPE} ${sel}`;
}

for (const file of FILES) {
  const root = postcss.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  root.walkRules((rule) => {
    // skip @keyframes steps (from / to / 50%)
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
    rule.selectors = rule.selectors.map(scopeSelector);
  });
  // style.css @imports local icon sheets: point those at the scoped copies too
  root.walkAtRules('import', (at) => {
    at.params = at.params.replace(/(icons|icomoon|font-awesome-brands)\.css/, '$1.scoped.css');
  });
  const out = path.join(DIR, file.replace(/\.css$/, '.scoped.css'));
  fs.writeFileSync(out, root.toString());
  console.log('wrote', path.relative(process.cwd(), out));
}
