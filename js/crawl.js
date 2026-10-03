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
 *   @version      1.7.5
 *   @updated      2026-10-03
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
 *   Fall Crawl v1.7.5  ·  js/crawl.js  ·  mediaBrilliance
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

  /* Featured-brand logos, by the name the data file uses. Sizes are the
     WebP's own, printed by tools/make-brands.py; a name not listed here
     shows as a text chip, so a brand with no logo yet still appears. */
  var LOGOS = {
    'Ben Holladay':               ['ben-holladay',   88, 88],
    'Chica Chida':                ['chica-chida',    79, 88],
    'Crystal Head Vodka':         ['crystal-head',   88, 88],
    'Espolon':                    ['espolon',        90, 88],
    'Fireball':                   ['fireball',       96, 88],
    'Four Roses':                 ['four-roses',     87, 88],
    'High Noon':                  ['high-noon',      89, 88],
    "Jack Daniel's":              ['jack-daniels',  123, 88],
    'Justin Winery':              ['justin',         70, 88],
    'Lucky One':                  ['lucky-one',      73, 88],
    'Old Forester 86':            ['old-forester',   88, 88],
    'Ole Smoky':                  ['ole-smoky',      88, 88],
    'Rosaluna Mezcal':            ['rosaluna',       88, 88],
    "Tito's Handmade Vodka":      ['titos',          87, 88],
    'Wild Turkey American Honey': ['american-honey', 88, 88],
  };

  /** A spot's featured brands as a row of white chips, or null if none. */
  function brands(names) {
    var list = (names || []).filter(Boolean);
    if (!list.length) return null;
    var ul = el('ul', 'brands');
    ul.setAttribute('aria-label', 'Featured brands');
    list.forEach(function (name) {
      var li = el('li', 'brand');
      var logo = LOGOS[name];
      if (logo) {
        var img = el('img');
        img.src = 'images/brands/' + logo[0] + '.webp';
        img.width = logo[1];
        img.height = logo[2];
        img.alt = name;
        img.loading = 'lazy';
        img.decoding = 'async';
        li.appendChild(img);
      } else {
        li.className = 'brand brand-text';
        li.textContent = name;
      }
      ul.appendChild(li);
    });
    return ul;
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
      // The icon is hidden from screen readers, so the link says where it goes.
      a.setAttribute('aria-label', '@' + DATA.instagram + ' on Instagram');
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

  /* ---- countdown and add-to-calendar -----------------------------------
     Both run from DATA.date (YYYY-MM-DD). The countdown reads "N days to
     go", then "Tomorrow", then "Tonight", and disappears after the event,
     taking the calendar buttons with it. Days are counted in the visitor's
     own calendar, midnight to midnight. */
  function eventDay() {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(DATA.date || '');
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  function countdown() {
    var n = document.querySelector('[data-countdown]');
    var day = eventDay();
    if (!n) return;
    if (!day) { n.parentNode.removeChild(n); return; }
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var days = Math.round((day - now) / 86400000);
    if (days < 0) { n.parentNode.removeChild(n); return; }
    n.textContent = days === 0 ? 'Tonight' : days === 1 ? 'Tomorrow' : days + ' days to go';
    if (days === 0) n.className += ' is-tonight';
  }

  function calendar() {
    var big = document.querySelector('[data-date-short]');
    var day = eventDay();
    if (!big || !big.textContent || !day) return;
    var now = new Date(); now.setHours(0, 0, 0, 0);
    if (day < now) return;
    var pad = function (x) { return (x < 10 ? '0' : '') + x; };
    var ymd = function (d) { return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()); };
    var next = new Date(day); next.setDate(next.getDate() + 1);
    var title = DATA.title || 'East Crossroads Fall Crawl';
    var where = 'East Crossroads, Kansas City, MO';
    var about = 'A choose-your-own-adventure bar crawl. No tickets. No wristbands. No set route. 21+. ' +
                'Spots, specials and the spin wheel: https://fallcrawlkc.com/';
    // An all-day event: no official hours have been published.
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//fallcrawlkc//EN', 'BEGIN:VEVENT',
      'UID:fallcrawl-' + ymd(day) + '@fallcrawlkc.com', 'DTSTAMP:' + ymd(new Date()) + 'T000000Z',
      'DTSTART;VALUE=DATE:' + ymd(day), 'DTEND;VALUE=DATE:' + ymd(next),
      'SUMMARY:' + title, 'LOCATION:' + where.replace(/,/g, '\\,'),
      'DESCRIPTION:' + about.replace(/,/g, '\\,'), 'URL:https://fallcrawlkc.com/',
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var icsHref = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
    var googleHref = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + encodeURIComponent(title) + '&dates=' + ymd(day) + '/' + ymd(next) +
      '&details=' + encodeURIComponent(about) + '&location=' + encodeURIComponent(where);

    // The big date is the add-to-calendar link. Apple devices and desktop
    // take the calendar file, built here so nothing loads from elsewhere;
    // Android has no handler for one and would only download it, so there
    // the date opens Google Calendar instead.
    var a = document.createElement('a');
    a.className = 'date-link';
    a.title = 'Add to calendar';
    a.setAttribute('aria-label', big.textContent + ', add to calendar');
    if (/Android/i.test(navigator.userAgent)) {
      a.href = googleHref; a.target = '_blank'; a.rel = 'noopener';
    } else {
      a.href = icsHref; a.setAttribute('download', 'fall-crawl.ics');
    }
    a.textContent = big.textContent;
    a.insertAdjacentHTML('beforeend', '<svg class="date-cal" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false">' +
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M12 13v5M9.5 15.5h5"/></svg>');
    big.textContent = '';
    big.appendChild(a);
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
  // What to Expect and Play It Safe share one card layout.
  function expect() { cards('expect', DATA.expect); cards('safety', DATA.safety); }
  function cards(id, items) {
    var list = (items || []).filter(function (x) { return x && x.title; });
    if (!list.length) return drop(id);
    var ul = document.getElementById(id + '-list');
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
    [['[data-guide]', DATA.guide, 'guide'], ['[data-treats]', DATA.treats, 'treats']].forEach(function (pair) {
      if (pair[1] === false) return drop(pair[2]);   // false hides the section outright
      var n = document.querySelector(pair[0]);
      if (!n) return;
      var lines = [].concat(pair[1] || []).filter(Boolean);
      if (!lines.length) { n.textContent = 'Coming soon.'; return; }
      // One paragraph per line, the first as the lead-in.
      var box = el('div', 'prose soon-copy');
      lines.forEach(function (t, i) { box.appendChild(el('p', i ? null : 'soon-lead', t)); });
      n.parentNode.replaceChild(box, n);
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
      if (v.hours) li.appendChild(el('p', 'venue-hours', v.hours));
      var ig = insta(v.insta);
      if (ig) li.appendChild(ig);
      var b = brands(v.brands);
      if (b) li.appendChild(b);
      if (v.doing) li.appendChild(el('p', 'venue-doing', v.doing));
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

      // Opens a text, not a call: the client asked for it on 3 Oct, and a
      // text is what a pedicab dispatcher can answer mid-ride.
      if (p.phone) {
        var d = String(p.phone).replace(/\D/g, '');
        if (d.length === 10) {
          var t = el('a', 'partner-phone',
            'Text (' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6));
          t.href = 'sms:+1' + d;
          li.appendChild(t);
        }
      }
      // The website as visible words, not only as the linked name.
      if (p.url) {
        var w = el('a', 'partner-phone', p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''));
        w.href = p.url; w.target = '_blank'; w.rel = 'noopener';
        li.appendChild(w);
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
    { id: 'expect', label: 'Expect', on: function () {
        return (DATA.expect || []).length > 0; } },
    { id: 'map',    label: 'Where',  on: function () { return true; } },
    { id: 'spin',   label: 'Spin',   on: wheelOpen },
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

  /* ---- Fall Crawl Roulette --------------------------------------------
     A wheel of the live spots. Each spin lands on a random one, never the
     same one twice in a row, then opens a card with whatever details the
     data file has so far. Missing details are left off; a spot with none
     says details are coming soon. Nothing is stored. */
  var COLORS = ['#c84008', '#1b1b1b', '#8a2b06', '#2b2b2b'];

  // The wheel stays off the page until DATA.wheelFrom (YYYY-MM-DD), in the
  // visitor's own calendar. Empty, missing or mistyped shows it, so a typo
  // in the data file can only make it appear early, never lose it.
  function wheelOpen() {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(DATA.wheelFrom || '');
    if (!m) return true;
    var now = new Date(); now.setHours(0, 0, 0, 0);
    return now >= new Date(+m[1], +m[2] - 1, +m[3]);
  }

  // Runs before nav(), so a removed section takes its link with it.
  function spinWindow() {
    var sec = document.getElementById('spin');
    if (sec && !wheelOpen()) sec.parentNode.removeChild(sec);
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

    var angle = 0, spinning = false, last = -1;
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // "Spin again" landing where it just was reads as broken, so the
    // previous spot sits out one spin. A single spot has to repeat.
    function pick() {
      var pool = spots.map(function (v, i) { return i; })
                      .filter(function (i) { return i !== last || n === 1; });
      last = pool[Math.floor(Math.random() * pool.length)];
      return last;
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
        document.getElementById('spin-live').textContent = 'Landed on ' + spots[i].name;
        showSpot(spots[i], example);
      };
      if (still) done(); else setTimeout(done, 5040);   // matches the CSS transition
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
    var hrs = document.getElementById('spot-hours');
    if (hrs) { hrs.textContent = v.hours || ''; hrs.hidden = !v.hours; }
    var box = document.getElementById('spot-brands');
    if (box) {
      box.textContent = '';
      var row = brands(v.brands);
      if (row) {
        row.querySelectorAll('img').forEach(function (i) { i.loading = 'eager'; });
        box.appendChild(row);
      }
      box.hidden = !row;
    }
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
    // A ride for the long walks: the first partner with a phone number,
    // as a text rather than a call (client, 3 Oct).
    var ride = document.getElementById('spot-ride');
    var cab = (DATA.partners || []).filter(function (p) { return p && p.phone; })[0];
    var digits = cab ? String(cab.phone).replace(/\D/g, '') : '';
    if (ride && digits.length === 10) {
      ride.textContent = 'Too far to walk? ';
      var call = el('a', null, 'Text ' + cab.name);
      call.href = 'sms:+1' + digits;
      ride.appendChild(call);
      ride.hidden = false;
    }
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

  /* ---- night procession across the header -----------------------------
     Decorative and slow: translucent ghosts drift through the bar and the
     odd goblin or monster trudges along its bottom edge. Each figure draws
     its own pace, pause, height and direction on page load. Injected here
     so all three pages get it from one place. Hidden from assistive tech,
     never takes clicks, and off under prefers-reduced-motion (in CSS). */
  var uid = 0;

  // A sheet ghost: a soft dome fading out through a ragged hem, blurred at
  // the edges, with hollow eyes. Its hem sways on its own (CSS).
  function ghostSVG() {
    var n = ++uid;
    return '<svg class="fig ghost" viewBox="0 0 60 84" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<linearGradient id="gb' + n + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#fff" stop-opacity=".75"/>' +
          '<stop offset=".55" stop-color="#e8ecf2" stop-opacity=".42"/>' +
          '<stop offset="1" stop-color="#dfe6ee" stop-opacity="0"/></linearGradient>' +
        '<filter id="gf' + n + '" x="-30%" y="-30%" width="160%" height="160%">' +
          '<feGaussianBlur stdDeviation="1.1"/></filter>' +
        '<filter id="gg' + n + '" x="-50%" y="-50%" width="200%" height="200%">' +
          '<feGaussianBlur stdDeviation="4"/></filter>' +
      '</defs>' +
      '<ellipse cx="30" cy="30" rx="24" ry="26" fill="#cfe0ff" opacity=".14" filter="url(#gg' + n + ')"/>' +
      '<g filter="url(#gf' + n + ')">' +
        '<path class="ghost-sheet" d="M30 4C15 4 8 16 8 30v22c0 6-3 12-5 18 4-2 7-6 9-3 2 4 1 10 3 14 2-5 5-10 8-8 3 2 3 8 6 9 2-4 3-10 7-10 3 0 4 6 7 7 1-5 1-11 4-13 3-1 5 4 8 5-2-6-4-13-4-19V30C53 16 45 4 30 4z" fill="url(#gb' + n + ')"/>' +
      '</g>' +
      '<ellipse cx="22.5" cy="28" rx="3.6" ry="5" fill="#0a0a0f" opacity=".8"/>' +
      '<ellipse cx="37.5" cy="28" rx="3.6" ry="5" fill="#0a0a0f" opacity=".8"/>' +
      '<ellipse cx="30" cy="41" rx="3" ry="4.4" fill="#0a0a0f" opacity=".55"/>' +
    '</svg>';
  }

  // A hunched goblin walking: big ears, long nose, lantern-green eyes.
  function goblinSVG() {
    return '<svg class="fig goblin" viewBox="0 0 48 52" aria-hidden="true" focusable="false">' +
      '<g fill="#26301f">' +
        '<path d="M8 16l-7-5 9 1zM40 16l7-5-9 1z"/>' +                       // ears
        '<ellipse cx="24" cy="17" rx="13" ry="11"/>' +                       // head
        '<path d="M34 19l9 3-9 1z"/>' +                                       // nose
        '<path d="M14 26q10-4 18 0l4 14q-12 4-24 0z"/>' +                     // hunched body
        '<rect class="leg leg-a" x="16" y="38" width="5" height="13" rx="2"/>' +
        '<rect class="leg leg-b" x="26" y="38" width="5" height="13" rx="2"/>' +
        '<path d="M33 28l9 8-2 2-9-7z"/>' +                                   // arm
      '</g>' +
      '<circle cx="21" cy="15" r="2" fill="#b9ff4a"/><circle cx="29" cy="15" r="2" fill="#b9ff4a"/>' +
      '<circle cx="21" cy="15" r="4" fill="#b9ff4a" opacity=".18"/><circle cx="29" cy="15" r="4" fill="#b9ff4a" opacity=".18"/>' +
    '</svg>';
  }

  // A shaggy horned monster: one big ember eye, stubby legs.
  function monsterSVG() {
    return '<svg class="fig monster" viewBox="0 0 56 52" aria-hidden="true" focusable="false">' +
      '<g fill="#2c2029">' +
        '<path d="M15 12l-4-10 9 7zM41 12l4-10-9 7z"/>' +                     // horns
        '<path d="M8 26c0-11 9-18 20-18s20 7 20 18v10c0 3-2 5-3 7l-3-3-3 4-3-4-3 4-3-4-3 4-3-4-3 4-3-4-3 3c-1-2-3-4-3-7z"/>' +
        '<rect class="leg leg-a" x="17" y="40" width="7" height="11" rx="3"/>' +
        '<rect class="leg leg-b" x="32" y="40" width="7" height="11" rx="3"/>' +
      '</g>' +
      '<circle cx="28" cy="24" r="6.5" fill="#1a1016"/>' +
      '<circle cx="28" cy="24" r="3.4" fill="#e0561c"/>' +
      '<circle cx="28" cy="24" r="9" fill="#e0561c" opacity=".12"/>' +
    '</svg>';
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }

  // One knob for the header's tempo: every duration below is multiplied by it.
  var PACE = 1.2;

  function ghosts() {
    var bar = document.querySelector('.site-header');
    if (!bar || bar.querySelector('.ghost-run')) return;
    var run = document.createElement('div');
    run.className = 'ghost-run';
    run.setAttribute('aria-hidden', 'true');

    // A phone's header is a third as wide, so it gets fewer figures.
    var cast = window.innerWidth < 768
      ? ['ghost', 'ghost', 'goblin']
      : ['ghost', 'ghost', 'ghost', 'goblin', 'monster'];
    // Size and speed go together: tiny ones dart across, normal ones walk
    // or drift at a medium pace, huge ones lumber. Each figure picks a size
    // class, then a size and a crossing time inside it, on every page load.
    var SIZES = [
      { scale: [0.45, 0.65], cross: [4, 7]   },   // tiny, fast
      { scale: [0.85, 1.1],  cross: [9, 14]  },   // normal, medium
      { scale: [1.5, 1.85],  cross: [18, 26] }    // huge, slow
    ];
    run.innerHTML = cast.map(function (kind, k) {
      var walker = kind !== 'ghost';
      var sz = SIZES[Math.floor(Math.random() * SIZES.length)];
      var scale = rnd(sz.scale[0], sz.scale[1]);
      var cross = rnd(sz.cross[0], sz.cross[1]);        // seconds on screen
      var loop = (cross / 0.6 + rnd(0, 8)) * PACE;      // plus an offscreen pause
      var dir = Math.random() < 0.5 ? 1 : -1;           // 1 = right to left
      var art = kind === 'ghost' ? ghostSVG() : kind === 'goblin' ? goblinSVG() : monsterSVG();
      return '<span class="fig-lane ' + (walker ? 'walker' : 'floater') + (dir < 0 ? ' rev' : '') +
        '" style="--dur:' + loop.toFixed(1) + 's;--delay:' + ((k * rnd(1, 3) + rnd(0, 4)) * PACE).toFixed(1) + 's;' +
        '--y:' + (walker ? 0 : rnd(-0.25, 0.2)).toFixed(2) + 'rem;--scale:' + scale.toFixed(2) +
        ';--bob:' + (rnd(1.6, 2.6) * scale * PACE).toFixed(2) + 's;--step:' + (0.9 * scale * PACE).toFixed(2) + 's">' + art + '</span>';
    }).join('');
    bar.insertBefore(run, bar.firstChild);

    // Low fog behind the title: a few blurred puffs drifting and breathing
    // out of step. It sits under the figures and the text, and under
    // reduced motion it stays as still mist rather than disappearing.
    var fog = document.createElement('div');
    fog.className = 'fog-bank';
    fog.setAttribute('aria-hidden', 'true');
    // Puffs span the whole bar, packed tighter and denser toward the middle
    // (--fa, strength) and thinning to a light haze over the links.
    var PUFFS = 13;
    fog.innerHTML = Array.apply(null, Array(PUFFS)).map(function (_, i) {
      var t = i / (PUFFS - 1) * 2 - 1;                 // -1 .. 1 across the bar
      var x = Math.sign(t) * Math.pow(Math.abs(t), 1.35) * 50;
      var strength = Math.max(0.18, 1 - Math.pow(Math.abs(t), 1.6) * 0.85);
      return '<i style="--fx:' + (x + rnd(-2, 2)).toFixed(1) + '%;--fy:' + rnd(-15, 15).toFixed(0) + '%;' +
        '--fa:' + strength.toFixed(2) + ';' +
        '--fw:' + rnd(9, 15).toFixed(1) + 'rem;--fd:' + (rnd(14, 24) * PACE).toFixed(1) + 's;' +
        '--fdl:-' + rnd(0, 20).toFixed(1) + 's"></i>';
    }).join('');
    bar.insertBefore(fog, bar.firstChild);

    var moon = document.createElement('div');
    moon.className = 'moon';
    moon.setAttribute('aria-hidden', 'true');
    bar.insertBefore(moon, bar.firstChild);
    sky(bar, moon, fog);
  }

  /* ---- the real moon over Kansas City, and the weather --------------------
     Position and phase are computed here from the date (the low-precision
     lunar formulas popularised by SunCalc, after Meeus), nothing fetched:
     east of south maps to the left of the bar, west to the right, altitude
     to how high it sits, and below the horizon it is gone. Weather is the
     one outside request on the site: current conditions for Kansas City's
     fixed coordinates from Open-Meteo, cached for 30 minutes in this tab.
     Clouds and daylight dim the moon, fog and rain thicken the fog bank. If
     the request fails the sky just stays clear. */
  var KC = { lat: 39.0997, lng: -94.5786 };
  var RAD = Math.PI / 180, DAY_MS = 864e5, J1970 = 2440588, J2000 = 2451545, OBL = RAD * 23.4397;

  function toDays(d) { return d.valueOf() / DAY_MS - 0.5 + J1970 - J2000; }
  function ra(l, b)  { return Math.atan2(Math.sin(l) * Math.cos(OBL) - Math.tan(b) * Math.sin(OBL), Math.cos(l)); }
  function dec(l, b) { return Math.asin(Math.sin(b) * Math.cos(OBL) + Math.cos(b) * Math.sin(OBL) * Math.sin(l)); }
  function sunCoords(d) {
    var M = RAD * (357.5291 + 0.98560028 * d);
    var C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
    var L = M + C + RAD * 102.9372 + Math.PI;
    return { ra: ra(L, 0), dec: dec(L, 0) };
  }
  function moonCoords(d) {
    var L = RAD * (218.316 + 13.176396 * d), M = RAD * (134.963 + 13.064993 * d), F = RAD * (93.272 + 13.229350 * d);
    var l = L + RAD * 6.289 * Math.sin(M), b = RAD * 5.128 * Math.sin(F);
    return { ra: ra(l, b), dec: dec(l, b), dist: 385001 - 20905 * Math.cos(M) };
  }
  function moonNow(date) {
    var d = toDays(date), c = moonCoords(d), phi = RAD * KC.lat;
    var H = RAD * (280.16 + 360.9856235 * d) - RAD * -KC.lng - c.ra;
    var alt = Math.asin(Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H));
    var az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(c.dec) * Math.cos(phi));
    var s = sunCoords(d), sd = 149598000;
    var p = Math.acos(Math.sin(s.dec) * Math.sin(c.dec) + Math.cos(s.dec) * Math.cos(c.dec) * Math.cos(s.ra - c.ra));
    var inc = Math.atan2(sd * Math.sin(p), c.dist - sd * Math.cos(p));
    var ang = Math.atan2(Math.cos(s.dec) * Math.sin(s.ra - c.ra),
      Math.sin(s.dec) * Math.cos(c.dec) - Math.cos(s.dec) * Math.sin(c.dec) * Math.cos(s.ra - c.ra));
    var sunAlt = Math.asin(Math.sin(phi) * Math.sin(s.dec) +
      Math.cos(phi) * Math.cos(s.dec) * Math.cos(RAD * (280.16 + 360.9856235 * d) - RAD * -KC.lng - s.ra));
    return {
      alt: alt / RAD,                                  // degrees above the horizon
      bearing: (az / RAD + 180 + 360) % 360,          // compass: 90 east, 180 south, 270 west
      lit: (1 + Math.cos(inc)) / 2,                    // fraction illuminated
      waxing: ang < 0,
      sunUp: sunAlt / RAD > -4
    };
  }

  // The lit shape as SVG: the full disc in shadow, then the lit part bounded
  // by the limb on one side and the terminator ellipse on the other.
  function moonSVG(lit, waxing) {
    var rx = Math.abs(1 - 2 * lit) * 50;
    var sweep = lit < 0.5 ? 0 : 1;
    var litPath = 'M50 0A50 50 0 0 1 50 100A' + rx.toFixed(2) + ' 50 0 0 ' + sweep + ' 50 0Z';
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      '<defs><radialGradient id="mg" cx="42%" cy="38%" r="65%">' +
        '<stop offset="0" stop-color="#bf901f"/><stop offset=".6" stop-color="#9a6f14"/><stop offset="1" stop-color="#6b4a0b"/>' +
      '</radialGradient></defs>' +
      '<circle cx="50" cy="50" r="49.5" fill="#2a2210" opacity=".55"/>' +
      '<g' + (waxing ? '' : ' transform="translate(100 0) scale(-1 1)"') + '>' +
        '<path d="' + litPath + '" fill="url(#mg)"/>' +
      '</g>' +
      '<clipPath id="mc"><path d="' + litPath + '"' + (waxing ? '' : ' transform="translate(100 0) scale(-1 1)"') + '/></clipPath>' +
      '<g fill="#5c3e08" opacity=".22" clip-path="url(#mc)">' +
        '<ellipse cx="36" cy="40" rx="15" ry="11"/><ellipse cx="60" cy="58" rx="11" ry="14"/>' +
        '<ellipse cx="62" cy="30" rx="9" ry="7"/><ellipse cx="30" cy="68" rx="7" ry="6"/></g>' +
    '</svg>';
  }

  var WX_KEY = 'fallcrawl-weather';
  function weather(done) {
    try {
      var hit = JSON.parse(sessionStorage.getItem(WX_KEY));
      if (hit && Date.now() - hit.t < 30 * 60000) return done(hit.w);
    } catch (e) {}
    if (!window.fetch) return done(null);
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + KC.lat + '&longitude=' + KC.lng +
          '&current=cloud_cover,weather_code', ctl ? { signal: ctl.signal } : {})
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        clearTimeout(timer);
        var w = j && j.current ? { clouds: j.current.cloud_cover, code: j.current.weather_code } : null;
        if (w) { try { sessionStorage.setItem(WX_KEY, JSON.stringify({ t: Date.now(), w: w })); } catch (e) {} }
        done(w);
      })
      .catch(function () { clearTimeout(timer); done(null); });
  }

  function sky(bar, moon, fog) {
    var wx = null;
    function place() {
      var m = moonNow(new Date());
      // Only the arc a person facing south would see: rising east to setting west.
      if (m.alt <= -1 || m.bearing < 45 || m.bearing > 315) { moon.hidden = true; return; }
      moon.hidden = false;
      moon.innerHTML = moonSVG(m.lit, m.waxing);
      var H = bar.offsetHeight, size = moon.offsetWidth;
      var x = Math.min(1, Math.max(0, (m.bearing - 60) / 240));   // 60 = far left, 300 = far right
      var up = Math.min(1, Math.max(0, m.alt / 40));              // 40 degrees up = sitting fully in the bar
      moon.style.left = (6 + x * 88).toFixed(1) + '%';
      moon.style.top = (H - (0.2 + 0.82 * up) * size).toFixed(1) + 'px';
      var dim = 1;
      if (m.sunUp) dim *= 0.45;                                    // a daytime moon is washed out
      // Clouds veil the moon but never erase it: overcast leaves a faint glow.
      var veil = wx && wx.clouds != null ? Math.min(100, wx.clouds) / 100 : 0;
      dim *= 1 - 0.45 * veil;
      moon.style.setProperty('--veil', (veil * 3).toFixed(1) + 'px');
      // Never let the moon fight the text it passes behind.
      var r = moon.getBoundingClientRect(), behind = false;
      [].forEach.call(bar.querySelectorAll('.bar-nav a, .bar-title, .social, .bar-toggle'), function (t) {
        if (!t.offsetParent) return;
        var b = t.getBoundingClientRect();
        if (b.right > r.left && b.left < r.right && b.bottom > r.top && b.top < r.bottom) behind = true;
      });
      if (behind) dim *= 0.5;
      moon.style.opacity = (0.95 * dim).toFixed(2);
      moon.style.setProperty('--glow', (0.28 * m.lit * dim).toFixed(2));
    }
    place();
    setInterval(place, 5 * 60000);
    window.addEventListener('resize', place);
    weather(function (w) {
      wx = w;
      if (w && w.code != null) {
        var c = w.code;
        // 45/48 fog, 51-67 drizzle and rain, 80-82 showers, 95+ storms: thicker fog.
        if (c === 45 || c === 48 || (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95) fog.classList.add('is-thick');
      }
      place();
    });
  }

  /* ---- the bat ------------------------------------------------------------
     A large bat crosses the page window (not the header) about once a
     minute. It is drawn fresh every frame from a small 3D model seen from
     below and a little to the side, the way bats are seen overhead: each wing is a membrane stretched over
     four finger bones, it flaps about the shoulder with a fast downstroke
     and a slower upstroke that half-folds the wing, and the far wing sits
     behind the body, a little darker. The path is a bat's, not a glide: steady
     headway, a quick jink up or down every half second or so, and the
     body banks into each climb and dive. Black with orange line work, like
     the logo. Fixed, click-through, under the header, off under reduced
     motion. */

  // The wing in its own plane: u runs forward along the body, v out along
  // the span. Shoulder, wrist, four fingertips (leading to trailing), hip.
  // Span is about three body lengths, as on a real bat.
  var WING = { shoulder: [0, 0], wrist: [10, 30], tips: [[22, 58], [4, 62], [-12, 53], [-21, 36]], hip: [-15, 6] };
  var TILT = 80 * RAD;                                  // seen mostly from below, the way bats are

  // Project a wing point for flap angle th (radians, + is up) and span fold f.
  function wingPt(p, th, f, near) {
    var u = p[0], v = p[1] * f;
    var y = v * Math.sin(th), z = v * Math.cos(th) * (near ? -1 : 1);
    return [u, -(y * Math.cos(TILT) - z * Math.sin(TILT))];
  }

  function wingPath(th, f, near) {
    var P = function (p) { return wingPt(p, th, f, near); };
    var s = P(WING.shoulder), w = P(WING.wrist), h = P(WING.hip);
    var t = WING.tips.map(P);
    var pt = function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); };
    // Scalloped trailing edge: each span of membrane sags toward the wrist.
    var sag = function (a, b) {
      return [(a[0] + b[0]) / 2 * 0.72 + w[0] * 0.28, (a[1] + b[1]) / 2 * 0.72 + w[1] * 0.28];
    };
    var d = 'M' + pt(s) + 'L' + pt(w) + 'L' + pt(t[0]);
    var edge = t.concat([h]);
    for (var i = 1; i < edge.length; i++) d += 'Q' + pt(sag(edge[i - 1], edge[i])) + ' ' + pt(edge[i]);
    d += 'Z';
    var bones = 'M' + pt(s) + 'L' + pt(w) + t.map(function (q) { return 'M' + pt(w) + 'L' + pt(q); }).join('');
    return { membrane: d, bones: bones };
  }

  // Flap cycle, c in [0, 1): 0-0.42 downstroke (fast), then the upstroke,
  // wing half-folded at its middle. Returns [angle, fold].
  function flap(c) {
    if (c < 0.42) {
      var k = c / 0.42, e = 0.5 - 0.5 * Math.cos(Math.PI * k);
      return [(55 - 95 * e) * RAD, 1];
    }
    var k2 = (c - 0.42) / 0.58, e2 = 0.5 - 0.5 * Math.cos(Math.PI * k2);
    return [(-40 + 95 * e2) * RAD, 1 - 0.32 * Math.sin(Math.PI * k2)];
  }

  // From below: a furry teardrop, ears splayed at the head, tail membrane.
  var BODY = 'M-14 0C-12 -5 2 -6 9 -4.5C12 -4 13 -3 13 0C13 3 12 4 9 4.5C2 6 -12 5 -14 0Z' +       // furry body
             'M12 0a4.6 4.2 0 1 0 9.2 0a4.6 4.2 0 1 0 -9.2 0Z' +                                    // round head
             'M16 -3.2L19.5 -8.5L19.8 -2.6ZM16 3.2L19.5 8.5L19.8 2.6Z' +                          // ears
             'M-13 -2.2Q-19 -6 -22 -5Q-20 0 -22 5Q-19 6 -13 2.2Z';                                // tail membrane

  var STILL = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // One bat added to the page, and a function that poses it for a frame:
  // centre (x, y) in px, drawn size, heading (1 = left to right), wingbeat
  // phase and climb rate.
  function makeBat() {
    var el = document.createElement('div');
    el.className = 'bat';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="-75 -75 150 150" aria-hidden="true" focusable="false"><g class="bat-frame">' +
      '<g class="bat-far"><path class="bat-membrane"/><path class="bat-bone"/></g>' +
      '<path class="bat-body" d="' + BODY + '"/>' +
      '<g class="bat-near"><path class="bat-membrane"/><path class="bat-bone"/></g>' +
      '</g></svg>';
    document.body.appendChild(el);
    var frame = el.querySelector('.bat-frame');
    var far = el.querySelectorAll('.bat-far path'), near = el.querySelectorAll('.bat-near path');
    var drawn = 0;
    return {
      el: el,
      pose: function (x, y, size, dir, cyc, vy) {
        if (size !== drawn) { drawn = size; el.style.width = size + 'px'; }
        var fl = flap(cyc);
        var bob = -Math.sin(fl[0]) * 2.2;                   // the body rides opposite the wings
        var bank = Math.max(-22, Math.min(22, -vy * 2.6)) * dir;
        el.style.transform = 'translate(' + (x - size / 2).toFixed(1) + 'px,' + (y - size / 2).toFixed(1) + 'px)';
        frame.setAttribute('transform', (dir < 0 ? 'scale(-1 1) ' : '') + 'rotate(' + (-bank).toFixed(1) + ') translate(0 ' + bob.toFixed(1) + ')');
        var nw = wingPath(fl[0], fl[1], true), fw = wingPath(fl[0] * 0.92, fl[1] * 0.9, false);
        near[0].setAttribute('d', nw.membrane); near[1].setAttribute('d', nw.bones);
        far[0].setAttribute('d', fw.membrane); far[1].setAttribute('d', fw.bones);
      }
    };
  }

  function bat() {
    if (STILL) return;
    var b = makeBat();

    function fly() {
      var W = window.innerWidth, H = window.innerHeight;
      var dir = Math.random() < 0.5 ? 1 : -1;
      var size = Math.min(Math.max(W * 0.3, 170), 420);     // px, the drawn box
      var secs = rnd(5.5, 8) * PACE;
      var y = rnd(0.2, 0.7) * H, targetY = y, vy = 0, nextJink = 0;
      var beat = rnd(0.2, 0.26);                            // seconds per wingbeat
      var t0 = null;
      b.el.classList.add('is-flying');

      function step(ts) {
        if (t0 === null) t0 = ts;
        var t = (ts - t0) / 1000, p = t / secs;
        if (p >= 1) { b.el.classList.remove('is-flying'); setTimeout(fly, (rnd(45, 75)) * 1000); return; }
        // Headway with a little surge on each downstroke.
        var cyc = (t / beat) % 1;
        var x = dir > 0 ? -size + p * (W + 2 * size) : W + size - p * (W + 2 * size);
        x += dir * 6 * Math.sin(cyc * 2 * Math.PI);
        // Jinks: a new target height every 0.35-0.9s, chased with damping.
        if (t >= nextJink) { targetY = Math.min(H * 0.85, Math.max(H * 0.12, y + rnd(-0.14, 0.14) * H)); nextJink = t + rnd(0.35, 0.9); }
        vy += (targetY - y) * 0.012 - vy * 0.12;
        y += vy;
        b.pose(x, y, size, dir, cyc, vy);
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    setTimeout(fly, rnd(12, 30) * 1000);
  }

  /* ---- the ravens -------------------------------------------------------
     A thousand ravens pour across the page window: the first within a
     minute of arriving, then again at random, never less than five minutes
     apart. They stream in over three seconds along a wandering line, and the
     flock stretches and turns as it goes, the way a murmuration does. Each
     bird is the same projected wing model as the bat, reshaped as a raven:
     fingered primaries, a heavy bill, a wedge tail. Black with orange line
     work, like the logo; nearer birds bigger, farther ones dimmer.

     Drawn on one canvas that exists only for the pass. The wingbeat is
     prebuilt as 24 poses, so a bird costs one fill and one stroke a frame. */

  var RAVEN_TILT = 25 * RAD;                            // mostly side-on: wings beat up and down in the crow V and M
  // Wing plane, u forward and v out along the span: shoulder, wrist, five
  // primary tips (leading to trailing), the secondaries, the body.
  var RAVEN_WING = { shoulder: [4, 0], wrist: [6, 20], tips: [[-4, 46], [-6.5, 46.5], [-8.5, 45], [-10, 42.5], [-11, 39.5]],
                     trail: [-8, 19], root: [-6, 0] };
  // Body side-on: wedge tail, a deep chest, heavy head and bill.
  var RAVEN_BODY = [[-25, 0], [-19, -5.5], [-11, -3], [-5, -5.5], [3, -5.5], [9, -4], [13, -3.5], [17, -3], [22, -1],
                    [22, 1], [17, 2.2], [13, 3], [8, 5.5], [0, 6.5], [-8, 4.5], [-12, 3], [-19, 5.5]];
  var RAVEN_POSES = 24;

  // The hand beats further than the arm and pivots at the wrist, which
  // bends the wing into the raven's M rather than a flat paddle.
  function ravenWing(th, f, near) {
    var vw = RAVEN_WING.wrist[1], th2 = th * 1.45 + 0.12;
    var P = function (p) {
      var arm = Math.min(p[1], vw) * f, hand = Math.max(0, p[1] - vw) * f;
      var y = arm * Math.sin(th) + hand * Math.sin(th2);
      var z = (arm * Math.cos(th) + hand * Math.cos(th2)) * (near ? -1 : 1);
      return [p[0], -(y * Math.cos(RAVEN_TILT) - z * Math.sin(RAVEN_TILT))];
    };
    var w = P(RAVEN_WING.wrist), tips = RAVEN_WING.tips.map(P);
    var pts = [P(RAVEN_WING.shoulder), w, tips[0]];
    // A shallow notch between each primary gives the fingered raven wingtip.
    for (var i = 1; i < tips.length; i++) {
      var a = tips[i - 1], b = tips[i];
      pts.push([(a[0] + b[0]) / 2 * 0.9 + w[0] * 0.1, (a[1] + b[1]) / 2 * 0.9 + w[1] * 0.1], b);
    }
    pts.push(P(RAVEN_WING.trail), P(RAVEN_WING.root));
    return pts;
  }

  function ravenPoses() {
    var poses = [];
    for (var k = 0; k < RAVEN_POSES; k++) {
      var fl = flap(k / RAVEN_POSES), path = new Path2D();
      [ravenWing(fl[0] * 0.92, fl[1] * 0.9, false), RAVEN_BODY, ravenWing(fl[0], fl[1], true)].forEach(function (pts) {
        path.moveTo(pts[0][0], pts[0][1]);
        for (var i = 1; i < pts.length; i++) path.lineTo(pts[i][0], pts[i][1]);
        path.closePath();
      });
      poses.push(path);
    }
    return poses;
  }

  function ravens() {
    if (STILL || !window.Path2D) return;
    var poses = null, N = 1000;

    function gauss() { return Math.max(-2.5, Math.min(2.5, (Math.random() + Math.random() + Math.random() - 1.5) * 2)); }

    function pass() {
      poses = poses || ravenPoses();
      var W = window.innerWidth, H = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      var cv = document.createElement('canvas');
      cv.className = 'ravens';
      cv.setAttribute('aria-hidden', 'true');
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      document.body.appendChild(cv);
      var ctx = cv.getContext('2d');
      var orange = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim() || '#c8430f';

      var dir = Math.random() < 0.5 ? 1 : -1;
      var R = Math.min(W, H) * 0.14;                     // flock radius
      var unit = Math.min(W, H) / 1400;                  // px per model unit for the nearest birds
      var M = R * 4 + 60;                                // margin, so the whole flock starts and ends offscreen
      var secs = rnd(8, 10) * PACE;
      var y0 = rnd(0.3, 0.6), slope = rnd(-0.3, 0.3), f1 = rnd(0.5, 1), f2 = rnd(1.5, 2.5), a1 = rnd(0, 6.3), a2 = rnd(0, 6.3);
      var flockPhase = rnd(0, 6.3);

      // Centre of the flock at progress p along its line.
      function centre(p) {
        return [dir > 0 ? -M + p * (W + 2 * M) : W + M - p * (W + 2 * M),
                H * (y0 + slope * (p - 0.5) + 0.16 * Math.sin(2 * Math.PI * f1 * p + a1) + 0.06 * Math.sin(2 * Math.PI * f2 * p + a2))];
      }
      // A bird's place at time t: its point on the line plus its slot in a
      // flock that stretches and turns over time.
      function place(b, t) {
        var c = centre((t - b.lag) / secs);
        var st = 1 + 0.5 * Math.sin(t * 0.8 + flockPhase), turn = 0.6 * Math.sin(t * 0.45 + flockPhase);
        var ox = b.ox * R * st, oy = b.oy * R / st;
        return [c[0] + ox * Math.cos(turn) - oy * Math.sin(turn) + 3 * Math.sin(t * b.ww + b.wp),
                c[1] + ox * Math.sin(turn) + oy * Math.cos(turn) + 3 * Math.cos(t * b.ww * 1.3 + b.wp)];
      }

      var birds = [];
      for (var i = 0; i < N; i++) {
        var depth = Math.pow(Math.random(), 1.6);         // most birds far, a few close
        birds.push({ depth: depth, s: unit * (0.35 + 0.65 * depth), alpha: 0.45 + 0.55 * depth,
                     lag: rnd(0, 3), ox: gauss() * 1.4, oy: gauss() * 0.7,
                     beat: rnd(0.28, 0.4) * PACE, ph: Math.random(), ww: rnd(1, 2.5), wp: rnd(0, 6.3) });
      }
      birds.sort(function (a, b) { return a.depth - b.depth; });  // far first, near paint over them

      var t0 = null;
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var t = (ts - t0) / 1000;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.fillStyle = '#070506'; ctx.strokeStyle = orange; ctx.lineJoin = 'round';
        var live = false;
        for (var i = 0; i < birds.length; i++) {
          var b = birds[i], p = (t - b.lag) / secs;
          if (p < 0) { live = true; continue; }
          if (p > 1) continue;
          live = true;
          var q = place(b, t), q0 = place(b, t - 0.05);
          var vx = q[0] - q0[0], vy = q[1] - q0[1];
          var sx = vx < 0 ? -1 : 1;
          var ang = Math.max(-0.6, Math.min(0.6, Math.atan2(vy, Math.abs(vx) || 1e-6)));
          var s = b.s * 2 * dpr, co = Math.cos(ang), si = Math.sin(ang);
          ctx.setTransform(sx * s * co, s * si, -sx * s * si, s * co, q[0] * dpr, q[1] * dpr);
          ctx.globalAlpha = b.alpha;
          ctx.lineWidth = 0.9 * dpr / s;                  // under a pixel of orange at any size
          var pose = poses[Math.floor(((t / b.beat + b.ph) % 1) * RAVEN_POSES)];
          ctx.fill(pose); ctx.stroke(pose);
        }
        if (live) { requestAnimationFrame(frame); return; }
        cv.remove();
        next(false);
      }
      requestAnimationFrame(frame);
    }

    function next(first) { setTimeout(pass, (first ? rnd(20, 60) : rnd(300, 600)) * 1000); }
    next(true);
  }

  /* The starfield behind every page: one canvas fixed to the window, drawn
     once and redrawn only when the window's width or full height changes.
     Stars are kept as fractions of the window, so a redraw repaints the same
     sky rather than a new one. 100lvh keeps the phone URL bar showing and
     hiding from resizing it. Five stars twinkle in CSS. */
  function stars() {
    if (document.querySelector('.stars')) return;
    var cv = document.createElement('canvas');
    cv.className = 'stars';
    cv.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cv, document.body.firstChild);

    var sky = [], w = 0, h = 0;
    function draw() {
      var r = cv.getBoundingClientRect();
      if (Math.round(r.width) === w && Math.round(r.height) === h) return;
      w = Math.round(r.width); h = Math.round(r.height);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = w * dpr; cv.height = h * dpr;
      // A downtown sky: light pollution washes out all but a scatter of
      // stars. One per ~9,000 square px, so a phone and a desktop read
      // equally sparse.
      var want = Math.round(w * h / 9000);
      while (sky.length < want) {
        var a = Math.pow(Math.random(), 2.2);           // most faint, a few bright
        sky.push({ x: Math.random(), y: Math.random(),
                   s: 0.35 + a * 0.9,                    // radius in css px
                   o: 0.05 + a * 0.23,                   // never past .28
                   warm: Math.random() < 0.15 });
      }
      var g = cv.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      for (var i = 0; i < want; i++) {
        var st = sky[i];
        g.fillStyle = (st.warm ? 'rgba(255,228,190,' : 'rgba(222,230,255,') + st.o.toFixed(2) + ')';
        g.beginPath(); g.arc(st.x * w, st.y * h, st.s, 0, 6.2832); g.fill();
      }
    }
    draw();
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(draw, 200); });

    var tw = document.createElement('div');
    tw.className = 'stars-twinkle';
    tw.setAttribute('aria-hidden', 'true');
    var html = '';
    for (var k = 0; k < 5; k++) {
      html += '<i style="left:' + rnd(2, 98).toFixed(1) + '%;top:' + rnd(8, 98).toFixed(1) +
        '%;--tw:' + rnd(3, 7).toFixed(1) + 's;--twd:-' + rnd(0, 7).toFixed(1) + 's"></i>';
    }
    tw.innerHTML = html;
    document.body.insertBefore(tw, cv.nextSibling);
  }

  function init() {
    stars(); basics(); title(); countdown(); calendar(); headline(); expect(); soon();
    venues(); routes(); partners(); spinWindow();
    nav(); socials(); menu();
    wheel(); ageGate(); ghosts(); bat(); ravens();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
