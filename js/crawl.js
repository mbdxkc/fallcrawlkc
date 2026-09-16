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
 *   @version      1.0.0
 *   @updated      2026-09-15
 *   @client       East Crossroads Fall Crawl, Kansas City, MO
 *   @url          https://mbdxkc.github.io/fallcrawlkc/
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
 *   Fall Crawl v1.0.0  ·  js/crawl.js  ·  mediaBrilliance
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
    var d = document.querySelector('[data-date]');
    if (d && DATA.date) d.textContent = DATA.date;
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
  }

  /* ---- participating spots --------------------------------------------- */
  function venues() {
    var list = (DATA.venues || []).filter(function (v) { return v && v.live !== false; });
    if (!list.length) return drop('spots');

    var ul = document.getElementById('venue-list');
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
    list.forEach(function (p) {
      var li = el('li', 'partner');
      var head = p.url ? el('a', 'partner-name') : el('h3', 'partner-name');
      head.textContent = p.name || '';
      if (p.url) { head.href = p.url; head.target = '_blank'; head.rel = 'noopener'; }
      li.appendChild(head);
      if (p.blurb) li.appendChild(el('p', null, p.blurb));
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
  var NAV = [
    { id: 'map',      label: 'Where' },
    { id: 'spots',    label: 'Spots' },
    { id: 'routes',   label: 'Crawls' },
    { id: 'partners', label: 'Partners' }
  ];

  function nav() {
    var host = document.getElementById('bar-nav');
    if (!host) return;
    var live = NAV.filter(function (n) { return document.getElementById(n.id); });
    if (!live.length) { host.parentNode.removeChild(host); return; }

    var ul = document.createElement('ul');
    live.forEach(function (n) {
      var li = document.createElement('li');
      var a  = el('a', null, n.label);
      a.href = '#' + n.id;
      li.appendChild(a);
      ul.appendChild(li);
    });
    host.appendChild(ul);
  }

  function title() {
    var t = document.querySelector('[data-title]');
    if (t && DATA.title) t.textContent = DATA.title;
  }

  function init() {
    basics(); title();
    venues(); routes(); partners();
    nav(); socials();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
