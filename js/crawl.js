/**
 * ============================================================================
 *
 *   EAST CROSSROADS FALL CRAWL
 *   Content renderer
 *
 * ============================================================================
 *   PROJECT
 * ============================================================================
 *
 *   @project      fallcrawlkc
 *   @file         js/crawl.js
 *   @version      1.1.0
 *   @updated      2026-09-28
 *   @client       East Crossroads Fall Crawl, Kansas City, MO
 *   @url          https://fallcrawlkc.com/
 *   @repository   https://github.com/mbdxkc/fallcrawlkc
 *
 * ============================================================================
 *   AUTHORSHIP
 * ============================================================================
 *
 *   @author       Valdez Campos <dez@mediabrilliance.io>
 *   @studio       mediaBrilliance - https://www.mediabrilliance.io
 *   @contact      dez@mediabrilliance.io
 *
 * ============================================================================
 *   LICENSE
 * ============================================================================
 *
 *   Copyright (c) 2026 mediaBrilliance. All rights reserved.
 *   Proprietary. See LICENSE at the repository root.
 *
 * ============================================================================
 *   IMPLEMENTATION NOTES
 * ============================================================================
 *
 *   @desc         Renders every list on the page from data/crawl.js so the
 *                 client edits one plain file through GitHub's web editor and
 *                 never touches markup.
 *   @a11y         Header links are built after the sections render, so a
 *                 section that removed itself cannot leave a dead anchor.
 *                 Sections whose list is empty are removed from the DOM, not
 *                 hidden, so a screen reader does not announce an empty
 *                 heading while the event is still being assembled.
 *   @security     Every value is written with textContent, never innerHTML.
 *                 Venue copy arrives from a hand-edited file and must not be
 *                 able to inject markup.
 *
 * ============================================================================
 *   Fall Crawl v1.1.0  ·  js/crawl.js  ·  mediaBrilliance
 * ============================================================================
 */

(function () {
  'use strict';

  var DATA = window.FALL_CRAWL || {};
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=';

  /** Build an element with text and optional class. */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  /** Instagram link for a handle, or null when there is none. */
  function insta(handle, label) {
    if (!handle) return null;
    var a = el('a', 'ig-link', label || ('@' + handle));
    a.href = 'https://www.instagram.com/' + handle;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  }

  /** Remove a section outright when it has nothing to show. */
  function drop(id) {
    var s = document.getElementById(id);
    if (s && s.parentNode) s.parentNode.removeChild(s);
  }

  /* ---- the basics ------------------------------------------------------ */
  function basics() {
    var s = document.querySelector('[data-date-short]');
    if (s && DATA.dateShort) s.textContent = DATA.dateShort;

    var h = document.querySelector('[data-hours]');
    if (h) {
      if (DATA.hours) h.textContent = DATA.hours;
      else if (h.parentNode) h.parentNode.removeChild(h);
    }
    [].forEach.call(document.querySelectorAll('[data-ig]'), function (a) {
      if (!DATA.instagram) return;
      a.href = 'https://www.instagram.com/' + DATA.instagram;
      var t = a.querySelector('[data-ig-handle]');
      if (t) t.textContent = '@' + DATA.instagram;
    });

    var ig = DATA.ig || {};
    var btn = document.querySelector('[data-ig-button]');
    if (btn && ig.button) btn.textContent = ig.button;

    // The sentence under the button. Removed rather than left empty, so a
    // blank line never opens up under the call to action.
    var blurb = document.querySelector('[data-ig-blurb]');
    if (blurb) {
      if (ig.blurb) blurb.textContent = ig.blurb;
      else if (blurb.parentNode) blurb.parentNode.removeChild(blurb);
    }
  }

  /* ---- the headline over the map ------------------------------------ */
  function headline() {
    var h = document.querySelector('[data-headline]');
    if (h) h.textContent = DATA.headline || 'Where';
    var b = document.querySelector('[data-blurb]');
    if (b) {
      if (DATA.blurb) b.textContent = DATA.blurb;
      else if (b.parentNode) b.parentNode.removeChild(b);
    }
  }

  /* ---- what to expect -------------------------------------------------- */
  function expect() {
    var list = (DATA.expect || []).filter(function (x) { return x && x.title; });
    if (!list.length) return drop('expect');
    var ul = document.getElementById('expect-list');
    if (!ul) return;
    list.forEach(function (x) {
      var li = el('li', 'expect');
      li.appendChild(el('h3', 'expect-title', x.title));
      if (x.text) li.appendChild(el('p', null, x.text));
      if (x.note) li.appendChild(el('p', 'expect-note', x.note));
      ul.appendChild(li);
    });
  }

  /* ---- coming-soon sections: the text if there is any, else the promise */
  function soon() {
    [['[data-guide]', DATA.guide], ['[data-treats]', DATA.treats]].forEach(function (pair) {
      var n = document.querySelector(pair[0]);
      if (!n) return;
      if (pair[1]) { n.textContent = pair[1]; n.className = ''; }
      else n.textContent = 'Coming soon.';
    });
  }

  /* ---- participating spots ---------------------------------------------
     Each of the three renderers below checks for its own <ul> before it
     writes. The check is not paranoia: privacy.html and terms.html reuse
     this file for the header bar and have none of the list containers, and
     an unguarded appendChild threw there, which aborted init() before the
     nav and the social icons were built. An EMPTY list hides the fault,
     because drop() returns first - so it only appears on a page that has
     data to render and nowhere to put it.
  ------------------------------------------------------------------------- */
  function venues() {
    var list = (DATA.venues || []).filter(function (v) { return v && v.live !== false; });
    if (!list.length) return drop('spots');

    var ul = document.getElementById('venue-list');
    if (!ul) return;
    var n = document.querySelector('[data-venue-count]');
    if (n) n.textContent = String(list.length);

    list.forEach(function (v) {
      var li = el('li', 'venue');
      li.appendChild(el('h3', 'venue-name', v.name || ''));

      if (v.street) {
        var a = el('a', 'venue-street', v.street);
        a.href = MAPS + encodeURIComponent(v.street + ', Kansas City, MO');
        a.target = '_blank';
        a.rel = 'noopener';
        li.appendChild(a);
      }
      if (v.doing) li.appendChild(el('p', 'venue-doing', v.doing));

      var ig = insta(v.insta);
      if (ig) li.appendChild(ig);
      ul.appendChild(li);
    });
  }

  /* ---- suggested crawls ------------------------------------------------- */
  function routes() {
    var list = DATA.routes || [];
    if (!list.length) return drop('routes');
    var ul = document.getElementById('route-list');
    if (!ul) return;
    list.forEach(function (r) {
      var li = el('li', 'route');
      li.appendChild(el('h3', 'route-name', r.name || ''));
      if (r.blurb) li.appendChild(el('p', null, r.blurb));
      ul.appendChild(li);
    });
  }

  /* ---- partners --------------------------------------------------------- */
  function partners() {
    var list = DATA.partners || [];
    if (!list.length) return drop('partners');
    var ul = document.getElementById('partner-list');
    if (!ul) return;
    list.forEach(function (p) {
      var li = el('li', 'partner');
      var head = p.url ? el('a', 'partner-name') : el('h3', 'partner-name');
      head.textContent = p.name || '';
      if (p.url) { head.href = p.url; head.target = '_blank'; head.rel = 'noopener'; }
      li.appendChild(head);
      if (p.blurb) li.appendChild(el('p', null, p.blurb));

      // tap-to-call rather than text on a page people read on a phone
      if (p.phone) {
        var d = String(p.phone).replace(/\D/g, '');
        if (d.length === 10) {
          var t = el('a', 'partner-phone',
            '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6));
          t.href = 'tel:+1' + d;
          li.appendChild(t);
        }
      }

      var ig = insta(p.insta);
      if (ig) li.appendChild(ig);
      ul.appendChild(li);
    });
  }

  /* ---- header: socials right ------------------------------------------- */
  /* Inline SVG rather than an <img>, because an img cannot inherit
     currentColor and the icons have to tint on hover from one file. */
  var GLYPH = {
    instagram: '<rect x="2.5" y="2.5" width="19" height="19" rx="5"/>' +
               '<circle cx="12" cy="12" r="4.2"/>' +
               '<circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/>',
    facebook:  '<path d="M15.5 2.5h-2.4a4.1 4.1 0 0 0-4.1 4.1V9.5H6.3v3.4h2.7v8.6h3.5v-8.6h2.7' +
               'l.5-3.4h-3.2V6.9c0-.8.4-1.2 1.2-1.2h2v-3.2z"/>',
    tiktok:    '<path d="M14.2 2.5v12.2a3.3 3.3 0 1 1-2.8-3.3"/>' +
               '<path d="M14.2 2.5c.4 2.3 2 4 4.3 4.3"/>'
  };
  var LABEL = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok' };
  var BASE  = {
    instagram: 'https://www.instagram.com/',
    facebook:  'https://www.facebook.com/',
    tiktok:    'https://www.tiktok.com/@'
  };

  function socials() {
    var list = (DATA.socials || []).filter(function (s) {
      return s && s.handle && GLYPH[s.network];
    });
    var ul = document.getElementById('bar-social');
    if (!ul) return;
    if (!list.length) { ul.parentNode.removeChild(ul); return; }

    list.forEach(function (s) {
      var li = document.createElement('li');
      var a  = document.createElement('a');
      a.className = 'social';
      a.href = BASE[s.network] + s.handle;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', LABEL[s.network] + ', opens in a new tab');
      a.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" ' +
        'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true">' + GLYPH[s.network] + '</svg>';
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  /* ---- header: links left ----------------------------------------------
     Built AFTER the sections render, so a section that removed itself for
     being empty cannot leave a link pointing at nothing.
  ---------------------------------------------------------------------- */
  /* `on` answers "will this section exist on the crawl page", from the
     DATA rather than from the DOM. It has to: privacy.html and terms.html
     carry the same header and none of these sections, so asking the
     document would remove the nav on exactly the pages that most need a
     way back. The tests below MUST match the ones the renderers use, or
     the header offers a link to a section that removed itself. */
  var NAV = [
    /* Home is not a section, it is the crawl page itself, so it carries no
       anchor and is the one entry that shows unconditionally. */
    { id: null,     label: 'Home',   on: function () { return true; } },
    { id: 'spin',   label: 'Spin',   on: function () { return true; } },
    { id: 'map',    label: 'Where',  on: function () { return true; } },
    { id: 'expect', label: 'Expect', on: function () {
        return (DATA.expect || []).length > 0; } },
    { id: 'spots',  label: 'Spots',  on: function () {
        return liveVenues().length > 0; } }
  ];

  function liveVenues() {
    return (DATA.venues || []).filter(function (v) { return v && v.name && v.live !== false; });
  }

  function nav() {
    var host = document.getElementById('bar-nav');
    if (!host) return;

    // The crawl page is the one with the hero on it. On it the DOM is
    // authoritative, because a section may already have removed itself;
    // anywhere else the links have to reach back across to it.
    var onCrawl = !!document.querySelector('.hero');
    var live = NAV.filter(function (n) {
      if (!n.id) return true;                       // Home, always
      return onCrawl ? !!document.getElementById(n.id) : n.on();
    });
    if (!live.length) { host.parentNode.removeChild(host); return; }

    var prefix = onCrawl ? '' : './';
    var ul = document.createElement('ul');
    live.forEach(function (n) {
      var li = document.createElement('li');
      var a  = el('a', null, n.label);
      if (n.id) {
        a.href = prefix + '#' + n.id;
      } else {
        // './' rather than '#', so the label means the same thing on every
        // page. On the crawl page it is where you already are, and saying
        // so is what stops it reading as a link that does nothing.
        a.href = './';
        if (onCrawl) a.setAttribute('aria-current', 'page');
      }
      li.appendChild(a);
      ul.appendChild(li);
    });
    host.appendChild(ul);
  }

  function title() {
    // Two spans, not one string: CSS decides which is visible at which
    // width, so the bar can carry the full name on a desktop and a short
    // one beside a menu button on a phone.
    var full = document.querySelector('.title-full');
    if (full && DATA.title) full.textContent = DATA.title;
    var short = document.querySelector('.title-short');
    if (short && (DATA.titleShort || DATA.title)) {
      short.textContent = DATA.titleShort || DATA.title;
    }
  }

  /* ---- the menu button -------------------------------------------------
     Only does anything on a narrow screen: above the breakpoint CSS hides
     the button and shows the nav, so the open state is irrelevant there.
     The class lives on the header because both the button's bars and the
     panel are styled from it.
  --------------------------------------------------------------------- */
  function menu() {
    var btn = document.getElementById('bar-toggle');
    var bar = document.querySelector('.site-header');
    var host = document.getElementById('bar-nav');
    if (!btn || !bar) return;
    // No links to show means no button: this runs after nav(), which
    // removes the nav outright when nothing survived.
    if (!host) { btn.parentNode.removeChild(btn); return; }

    function set(open) {
      bar.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () {
      set(bar.className.indexOf('is-open') === -1);
    });
    // Following a link closes it; on the crawl page the target is an
    // anchor on the same page, so nothing else would.
    host.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') set(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') set(false);
    });
  }

  /* ---- spin for your next stop ----------------------------------------
     A wheel of the live spots. Each spin lands on a random one, skipping
     spots already landed on this visit (while the box is ticked), then
     opens a card with whatever details the data file has so far. Missing
     details are left off; a spot with none says details drop day-of.
     Landed spots live in sessionStorage only, for this tab. */
  var SEEN_KEY = 'fallcrawl-seen';
  var COLORS = ['#c84008', '#1b1b1b', '#8a2b06', '#2b2b2b'];

  function seen() {
    try { return JSON.parse(sessionStorage.getItem(SEEN_KEY)) || []; } catch (e) { return []; }
  }
  function remember(name) {
    try {
      var s = seen(); if (s.indexOf(name) < 0) s.push(name);
      sessionStorage.setItem(SEEN_KEY, JSON.stringify(s));
    } catch (e) { /* storage blocked: the wheel still works, it just forgets */ }
  }

  function wheel() {
    var svg = document.getElementById('wheel');
    var btn = document.getElementById('spin-btn');
    if (!svg || !btn) return;
    var spots = liveVenues(), example = false;
    if (!spots.length && DATA.showExamples) {
      spots = (DATA.examples || []).filter(function (v) { return v && v.name; });
      example = true;
    }
    if (!spots.length) return;               // "Coming soon" stays up
    if (example) {
      var lede = document.getElementById('spin-lede');
      if (lede) lede.textContent = 'Try it out. These spots are made up until the real list lands.';
    }

    document.getElementById('spin-soon').hidden = true;
    document.getElementById('wheel-wrap').hidden = false;
    document.getElementById('spin-skip-wrap').hidden = false;
    btn.hidden = false;

    // Draw one slice per spot, names along the radius.
    var n = spots.length, R = 100, ns = 'http://www.w3.org/2000/svg';
    var rotor = document.createElementNS(ns, 'g');
    rotor.setAttribute('class', 'wheel-rotor');
    spots.forEach(function (v, i) {
      var a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
      var p = document.createElementNS(ns, 'path');
      var large = a1 - a0 > Math.PI ? 1 : 0;
      p.setAttribute('d', n === 1
        ? 'M -100 0 A 100 100 0 1 1 100 0 A 100 100 0 1 1 -100 0 Z'
        : 'M0 0 L' + (R * Math.cos(a0)).toFixed(2) + ' ' + (R * Math.sin(a0)).toFixed(2) +
          ' A' + R + ' ' + R + ' 0 ' + large + ' 1 ' + (R * Math.cos(a1)).toFixed(2) + ' ' +
          (R * Math.sin(a1)).toFixed(2) + ' Z');
      p.setAttribute('fill', COLORS[i % COLORS.length]);
      p.setAttribute('stroke', '#000');
      p.setAttribute('stroke-width', '0.8');
      rotor.appendChild(p);
      var mid = ((i + 0.5) / n) * 360 - 90;
      var t = document.createElementNS(ns, 'text');
      t.setAttribute('transform', 'rotate(' + mid.toFixed(2) + ') translate(92 0)');
      t.setAttribute('text-anchor', 'end');
      t.setAttribute('dominant-baseline', 'middle');
      t.setAttribute('class', 'wheel-label');
      var label = v.name.length > 18 ? v.name.slice(0, 17) + '\u2026' : v.name;
      t.textContent = label;
      rotor.appendChild(t);
    });
    svg.appendChild(rotor);
    var hub = document.createElementNS(ns, 'circle');
    hub.setAttribute('r', '9'); hub.setAttribute('class', 'wheel-hub');
    svg.appendChild(hub);

    var angle = 0, spinning = false;
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function pick() {
      var skip = document.getElementById('spin-skip').checked;
      var s = seen();
      var pool = spots.map(function (v, i) { return i; })
                      .filter(function (i) { return !skip || s.indexOf(spots[i].name) < 0; });
      if (!pool.length) {                    // been everywhere: start the loop over
        try { sessionStorage.removeItem(SEEN_KEY); } catch (e) {}
        pool = spots.map(function (v, i) { return i; });
      }
      return pool[Math.floor(Math.random() * pool.length)];
    }

    function spin() {
      if (spinning) return;
      var i = pick();
      // Land slice i's centre under the pointer at the top.
      var centre = ((i + 0.5) / n) * 360;
      var jitter = (Math.random() - 0.5) * (300 / n) * 0.6;
      var target = angle - (angle % 360) + (still ? 0 : 360 * 5) + (360 - centre) + jitter;
      if (target <= angle) target += 360;
      angle = target;
      spinning = true; btn.disabled = true;
      rotor.style.transform = 'rotate(' + angle + 'deg)';
      var done = function () {
        spinning = false; btn.disabled = false;
        remember(spots[i].name);
        document.getElementById('spin-live').textContent = 'Landed on ' + spots[i].name;
        showSpot(spots[i], example);
      };
      if (still) done(); else setTimeout(done, 4200);   // matches the CSS transition
    }

    btn.addEventListener('click', spin);
    var again = document.getElementById('spot-again');
    if (again) again.addEventListener('click', function () {
      closeModal(document.getElementById('spot-card'));
      spin();
    });
    var close = document.getElementById('spot-close');
    if (close) close.addEventListener('click', function () {
      closeModal(document.getElementById('spot-card'));
    });
  }

  function showSpot(v, example) {
    var card = document.getElementById('spot-card');
    if (!card) return;
    var k = card.querySelector('.spot-kicker');
    if (k) k.textContent = example ? 'Example spot' : 'Your next stop';
    document.getElementById('spot-name').textContent = v.name;
    var st = document.getElementById('spot-street');
    if (v.street) { st.textContent = v.street; st.href = MAPS + encodeURIComponent(v.street + ', Kansas City, MO'); st.hidden = false; }
    else st.hidden = true;
    var dl = document.getElementById('spot-details');
    dl.textContent = '';
    var any = false;
    [['Drinks', v.drinks], ['Entertainment', v.entertainment], ['Menu', v.menu], ['Cover', v.cover],
     ['Also', v.doing]].forEach(function (row) {
      if (!row[1]) return;
      any = true;
      dl.appendChild(el('dt', null, row[0]));
      dl.appendChild(el('dd', null, row[1]));
    });
    document.getElementById('spot-empty').hidden = any;
    var ig = document.getElementById('spot-ig');
    if (v.insta) { ig.textContent = '@' + v.insta; ig.href = 'https://www.instagram.com/' + v.insta; ig.hidden = false; }
    else ig.hidden = true;
    openModal(card);
  }

  function openModal(d) {
    if (d.showModal) { if (!d.open) d.showModal(); }
    else d.setAttribute('open', '');
  }
  function closeModal(d) {
    if (d.close) d.close(); else d.removeAttribute('open');
  }

  /* ---- 21+ check ---------------------------------------------------------
     Once per visit. The answer is kept in sessionStorage for this tab only,
     so it asks again next time and nothing is remembered on the device.
     Search engines never run it, so the page stays indexable. */
  var AGE_KEY = 'fallcrawl-21';

  function ageGate() {
    var d = document.getElementById('age-gate');
    if (!d) return;
    try { if (sessionStorage.getItem(AGE_KEY) === 'yes') return; } catch (e) {}
    d.addEventListener('cancel', function (e) { e.preventDefault(); });   // Escape does not skip it
    document.getElementById('age-yes').addEventListener('click', function () {
      try { sessionStorage.setItem(AGE_KEY, 'yes'); } catch (e) {}
      closeModal(d);
    });
    document.getElementById('age-no').addEventListener('click', function () {
      document.getElementById('age-denied').hidden = false;
    });
    openModal(d);
  }

  /* ---- ghost chase across the header ------------------------------------
     Decorative: a small ghost fleeing, a big one gaining, every so often.
     Injected here so all three pages get it from one place. Hidden from
     assistive tech, never takes clicks, and off entirely under
     prefers-reduced-motion (in CSS). */
  var GHOST = function (cls, eyes) {
    return '<svg class="ghost ' + cls + '" viewBox="0 0 40 46" aria-hidden="true" focusable="false">' +
      '<path d="M20 2C9.5 2 3 10 3 20v24l5.5-5 5.5 5 6-5 6 5 5.5-5 5.5 5V20C37 10 30.5 2 20 2z" fill="currentColor"/>' +
      eyes + '</svg>';
  };
  var FACES = {
    scared: '<circle cx="14" cy="18" r="3.4" fill="#000"/><circle cx="26" cy="18" r="3.4" fill="#000"/>' +
            '<ellipse cx="20" cy="29" rx="3" ry="4.2" fill="#000"/>',
    chaser: '<path d="M10 15l8 4M30 15l-8 4" stroke="#000" stroke-width="2.6" stroke-linecap="round"/>' +
            '<circle cx="14.5" cy="20" r="2.6" fill="#c84008"/><circle cx="25.5" cy="20" r="2.6" fill="#c84008"/>' +
            '<path d="M12 29q8 7 16 0" stroke="#000" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
    drift:  '<ellipse cx="14" cy="19" rx="2.6" ry="3.4" fill="#000"/><ellipse cx="26" cy="19" rx="2.6" ry="3.4" fill="#000"/>' +
            '<path d="M15 28q5 3 10 0" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>'
  };

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function ghosts() {
    var bar = document.querySelector('.site-header');
    if (!bar || bar.querySelector('.ghost-run')) return;
    var run = document.createElement('div');
    run.className = 'ghost-run';
    run.setAttribute('aria-hidden', 'true');

    // The original chase keeps its fixed timing; every other lane draws its
    // own speed, pause, height, size and direction on each page load, so the
    // header never repeats the same pattern.
    var lanes = [{ kind: 'chase', dur: 16, delay: 2, dir: 1, y: 0, scale: 1 }];
    // A phone's header is a third as wide, so it gets half the extra lanes.
    var extra = window.innerWidth < 768 ? 2 : 6;
    for (var k = 0; k < extra; k++) {
      lanes.push({
        kind:  k < extra / 3 ? 'chase' : 'drift',
        dur:   rnd(11, 26),                  // seconds per loop, travel is half of it
        delay: rnd(0, 14),
        dir:   Math.random() < 0.5 ? 1 : -1, // 1 = right to left
        y:     rnd(-0.35, 0.35),              // rem off the centre line
        scale: rnd(0.6, 1.05)
      });
    }
    run.innerHTML = lanes.map(function (l) {
      var inner = l.kind === 'chase'
        ? GHOST('ghost-scared', FACES.scared) + GHOST('ghost-chaser', FACES.chaser)
        : GHOST('ghost-drift', FACES.drift);
      return '<span class="ghost-lane' + (l.dir < 0 ? ' ghost-lane-rev' : '') + '" style="' +
        '--dur:' + l.dur.toFixed(1) + 's;--delay:' + l.delay.toFixed(1) + 's;' +
        '--y:' + l.y.toFixed(2) + 'rem;--scale:' + l.scale.toFixed(2) + '">' + inner + '</span>';
    }).join('');
    bar.insertBefore(run, bar.firstChild);
  }

  function init() {
    basics(); title(); headline(); expect(); soon();
    venues(); routes(); partners();
    nav(); socials(); menu();
    wheel(); ageGate(); ghosts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
