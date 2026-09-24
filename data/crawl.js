/**
 * ============================================================================
 *  EAST CROSSROADS FALL CRAWL
 *  Event content. THIS IS THE ONLY FILE THAT NEEDS EDITING.
 * ============================================================================
 *
 *  HOW TO EDIT, with nothing installed:
 *
 *    1. Click the pencil icon, top right of this file
 *    2. Change the text between the quote marks
 *    3. Scroll to the bottom and click the green "Commit changes" button
 *    4. A box appears. Leave everything as it is and click "Commit changes"
 *       again. "Commit directly to the main branch" is already selected
 *    5. Wait about a minute, then reload fallcrawlkc.com
 *
 *  IF THE SITE LOOKS UNCHANGED: give it another minute, then reload the page
 *  while holding Shift. Your browser may be showing you a saved copy.
 *
 *  ADDING THE BARS? Skip to "Participating spots" further down. That is the
 *  section you will use most, and there is a filled-in example to copy.
 *
 * ----------------------------------------------------------------------------
 *  THE FOUR RULES
 * ----------------------------------------------------------------------------
 *
 *  1. Change the words, not the punctuation.
 *     Every quote mark, comma, brace and bracket is holding the file
 *     together. Type inside the quotes and leave the rest alone.
 *
 *         GOOD    name: 'Ope's Bar',        <- wait, see rule 2
 *         GOOD    name: 'The Brass Rail',
 *         BAD     name: The Brass Rail,     <- quote marks gone
 *         BAD     name: 'The Brass Rail'    <- comma gone
 *
 *  2. An apostrophe needs a backslash in front of it.
 *     The apostrophe is the same character that ends the text, so it has to
 *     be marked as part of the words.
 *
 *         GOOD    name: 'Ope\'s Bar',
 *         BAD     name: 'Ope's Bar',
 *
 *     Or sidestep it entirely by using the curly one: 'Ope’s Bar'
 *
 *  3. Some sentences are split across lines with a + sign.
 *     That is only so the line does not run off the screen. The + joins
 *     them back together. If you edit one, keep the quote marks at both
 *     ends of EVERY piece and keep the + between them.
 *
 *         blurb: 'The first half of the sentence ' +
 *                'and the second half.',
 *
 *     Note the space before the closing quote on the first line. Without
 *     it the two halves run together as "sentenceand".
 *
 *  4. Leaving a list empty hides that whole section.
 *     No empty headings, no "coming soon", no half-built page. The section
 *     and its menu link both disappear until there is something to show.
 *
 * ----------------------------------------------------------------------------
 *  IF SOMETHING GOES WRONG
 * ----------------------------------------------------------------------------
 *
 *  You cannot take the site down from this file. If the punctuation breaks,
 *  the page treats the content as empty and hides those sections. The logo,
 *  the date, the headline and the Instagram button are written elsewhere and
 *  always survive. The page gets shorter. It does not break.
 *
 *  TO UNDO ANY EDIT: go to the repository, click "Commits", find yours,
 *  click the "..." on the right and choose "Revert". The site returns to how
 *  it was on the same one-minute cycle. Nothing is ever lost.
 *
 * ============================================================================
 */

window.FALL_CRAWL = {

  /* ---- The basics ------------------------------------------------------
     Change these if anything about the event moves.
  --------------------------------------------------------------------- */
  title:     'East Crossroads Fall Crawl',
  // Shown in the bar on narrow screens, where the full name will not fit
  // beside a menu button and the Instagram icon on one line.
  titleShort: 'Fall Crawl',
  // Long form. NOT shown on the page at the moment - the big 10.24.26 is
  // the date on display. Kept because the page title and the search
  // listing still say it, and because it is the one place it is written
  // out in full if you want it back on the page.
  date:      'Saturday, October 24, 2026',
  // The big orange date in the middle of the hero.
  dateShort: '10.24.26',
  // Sits under the headline. Empty means the line is not shown at all.
  // Fill it in once doors times are settled, e.g. '4 p.m. to midnight'.
  hours:     '',
  instagram: 'fallcrawlkc', // handle only, no @ and no link

  /* ---- The Instagram button, under the hero ----------------------------
     button   the words on the orange button. The @handle is added for you,
              so 'Follow + tag' renders as "Follow + tag  @fallcrawlkc"
     blurb    the sentence underneath it

     The — in the blurb is a long dash and the pair of codes at the end
     is the crystal ball. They look odd here and render normally on the
     page. You can paste a real emoji in instead if you prefer.
  --------------------------------------------------------------------- */
  ig: {
    button: 'Follow + tag',
    blurb:  'Follow @fallcrawlkc for the latest updates, cocktail specials ' +
            '& everything happening along the crawl. Tag us while you\'re ' +
            'out — we want to see where you end up! 🔮',
  },

  /* ---- The block under the hero ----------------------------------------
     heading    the orange headline
     paragraphs one line per paragraph, in the order they appear.

     To add a paragraph, copy an existing one including its comma and paste
     it below. To remove one, delete it and its comma. Emptying the list
     removes the whole section.
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
      '— the night is yours.',

      'No tickets. No wristbands. No starting point. No finish line. ' +
      'There is no right way to crawl it.',
    ],
  },

  /* ---- Social accounts, shown top right --------------------------------
     Only these three work: instagram, tiktok, facebook. Anything else is
     ignored rather than shown broken.

     To add TikTok or Facebook, delete the two slashes at the start of that
     line and put the real handle in. Handle only, no @ and no link.
  --------------------------------------------------------------------- */
  socials: [
    { network: 'instagram', handle: 'fallcrawlkc' },
    // { network: 'tiktok',   handle: 'fallcrawlkc' },
    // { network: 'facebook', handle: 'fallcrawlkc' },
  ],

  /* ---- Participating spots -------------------------------------------------
     THIS IS THE MAIN ONE. The whole Spots section is hidden until there is
     at least one bar in here, and the count in the heading updates itself.

     To add a bar: copy the example below, paste it above this comment's
     closing line, and remove the two slashes from the front of both lines.
     Keep the { } around each bar and the comma after each one.

     name    what it is called
     street  street address ONLY. Do not add the city: "Kansas City, MO" is
             added for you when the address is turned into a map link
     insta   their Instagram handle, no @. Use '' if they have none
     doing   what they are running that night. Use '' until it is confirmed,
             and the line simply will not appear
     live    false hides the bar while keeping its details here for later.
             Leave it as true, or leave the line out entirely, to show it
  ------------------------------------------------------------------------- */
  venues: [
    // { name: 'Example Bar', street: '1234 Grand Blvd', insta: 'examplebar',
    //   doing: 'Spiced old fashioned, $8 all night', live: true },
  ],

  /* ---- Suggested crawls. Optional routes, not official. -------------------
     HIDDEN while the routes are being worked out. An empty list removes the
     whole section AND its header link, so nothing half-finished shows.
     To bring it back: delete the // in front of the three lines below, and
     change the words to suit.
  ------------------------------------------------------------------------- */
  routes: [
    // { name: 'The Chill Crawl', blurb: 'Three stops, no rush, somewhere to sit at each one.' },
    // { name: 'All Day',         blurb: 'Start when doors open and work east. Pace yourself.' },
    // { name: 'Late Night',      blurb: 'Show up after dark for the places that get loud.' },
  ],

  /* ---- Partners -----------------------------------------------------------
     name    who they are
     blurb   one line about what they do for the crawl
     url     their website, the full address starting https://. Use '' for
             none, and the name simply will not be a link
     phone   a 10 digit number. Dashes, spaces and brackets are all fine:
             the page reformats it and makes it tap-to-call. Anything that
             is not 10 digits is left off rather than shown wrong
     insta   their Instagram handle, no @. Use '' for none
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
