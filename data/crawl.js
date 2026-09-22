/**
 * ============================================================================
 *  EAST CROSSROADS FALL CRAWL
 *  Event content. THIS IS THE ONLY FILE THAT NEEDS EDITING.
 * ============================================================================
 *
 *  HOW TO EDIT, with no software installed:
 *
 *    1. Open this file on GitHub
 *    2. Click the pencil icon, top right
 *    3. Change the text between the quote marks
 *    4. Click "Commit changes" at the bottom
 *    5. The site updates itself in about a minute
 *
 *  RULES THAT KEEP IT FROM BREAKING:
 *    - Keep every quote mark and comma exactly where it is
 *    - To use an apostrophe inside quotes, write it as \'  (e.g. 'Ope\'s')
 *    - To hide a venue without deleting it, change live: true to live: false
 *    - An empty list hides its whole section, so nothing half-finished shows
 *
 * ============================================================================
 */

window.FALL_CRAWL = {

  /* ---- The basics. Change these if anything moves. ---- */
  title:     'East Crossroads Fall Crawl',
  // Shown in the bar on narrow screens, where the full name will not fit
  // beside a menu button and the Instagram icon on one line.
  titleShort: 'Fall Crawl',
  // Long form. NOT shown on the page at the moment - the big 10.24.26 is
  // the date on display. Kept because the page title and the search
  // listing still say it, and because it is the one place it is written
  // out in full if you want it back on the page.
  date:      'Saturday, October 24, 2026',
  dateShort: '10.24.26',
  hours:     '',            // e.g. '4 p.m. to midnight'. Leave empty to hide.
  instagram: 'fallcrawlkc', // handle only, no @ and no link

  /* ---- The Instagram button, under the hero ----------------------------
     button   the words on the orange button. The @handle is added for you
     blurb    the sentence underneath it
  --------------------------------------------------------------------- */
  ig: {
    button: 'Follow + tag',
    blurb:  'Follow @fallcrawlkc for the latest updates, cocktail specials ' +
            '& everything happening along the crawl. Tag us while you\'re ' +
            'out \u2014 we want to see where you end up! \uD83D\uDD2E',
  },

  /* ---- The block under the hero ----------------------------------------
     heading    the orange headline
     paragraphs one line per paragraph, in order. Add or remove freely.
     An empty list removes the whole section.
  --------------------------------------------------------------------- */
  about: {
    heading: 'The East Crossroads is getting spooky',
    paragraphs: [
      'Spend the Saturday before Halloween exploring the East Crossroads as ' +
      'bars and restaurants throughout the neighborhood come together for ' +
      'specialty cocktails, one-night-only events, live entertainment, ' +
      'featured brands and plenty of surprises.',

      'The plan is simple: throw on a costume, grab your friends and show up.',

      'Stop for a cocktail, stay for an event, wander to the next bar ' +
      '\u2014 the night is yours.',

      'No tickets. No wristbands. No starting point. No finish line. ' +
      'There is no right way to crawl it.',
    ],
  },

  /* ---- Social accounts, shown top right --------------------------------
     Delete a line to remove that icon. Handle only, no @ and no link.
     Supported: instagram, tiktok, facebook
  --------------------------------------------------------------------- */
  socials: [
    { network: 'instagram', handle: 'fallcrawlkc' },
    // { network: 'tiktok',   handle: 'fallcrawlkc' },
    // { network: 'facebook', handle: 'fallcrawlkc' },
  ],

  /* ---- Participating spots -------------------------------------------------
     name      what it is called
     street    address, short form. Used for the map link
     insta     their Instagram handle, no @. Leave '' if they have none
     doing     what they are running that night. Leave '' until confirmed
     live      true shows it, false hides it
  ------------------------------------------------------------------------- */
  venues: [
    // { name: 'Example Bar', street: '1234 Grand Blvd', insta: 'examplebar',
    //   doing: 'Spiced old fashioned, $8 all night', live: true },
  ],

  /* ---- Suggested crawls. Optional routes, not official. -------------------
     HIDDEN while the routes are being worked out. An empty list removes the
     whole section AND its header link, so nothing half-finished shows.
     To bring it back: delete the // in front of the three lines below.
  ------------------------------------------------------------------------- */
  routes: [
    // { name: 'The Chill Crawl', blurb: 'Three stops, no rush, somewhere to sit at each one.' },
    // { name: 'All Day',         blurb: 'Start when doors open and work east. Pace yourself.' },
    // { name: 'Late Night',      blurb: 'Show up after dark for the places that get loud.' },
  ],

  /* ---- Partners -----------------------------------------------------------
     name    who they are
     blurb   one line about what they do for the crawl
     url     their website, full address with https://. Leave '' for none
     phone   digits only, 10 of them. Becomes a tap-to-call link
     insta   their Instagram handle, no @. Leave '' for none
  ------------------------------------------------------------------------- */
  partners: [
    {
      name:  'EZ Pedicabs',
      blurb: 'No app. Just text or call. You can schedule ahead too!',
      url:   'https://ezpedicabs.com',
      phone: '8162268444',
      insta: '',
    },
  ],
};
