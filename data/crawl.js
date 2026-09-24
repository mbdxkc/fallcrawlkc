/**
 *  EAST CROSSROADS FALL CRAWL - event content
 *  This is the only file that needs editing.
 *
 *    1. Click the pencil icon, top right
 *    2. Change the words between the quote marks
 *    3. Green "Commit changes" button at the bottom, then again in the box
 *    4. Reload fallcrawlkc.com in about a minute
 *
 *  Keep every quote mark and comma where it is and nothing can break. If one
 *  does go missing, that section just hides itself until it is fixed. The
 *  logo, date and headline live elsewhere and are always there.
 *
 *  To undo anything: Commits, find yours, "..." on the right, Revert.
 *
 *  Adding the bars? That is "Participating spots", near the bottom.
 */

window.FALL_CRAWL = {

  /* ---- The basics --------------------------------------------------- */

  title:      "East Crossroads Fall Crawl",
  titleShort: "Fall Crawl",          // used on phones, where the full name will not fit
  date:       "Saturday, October 24, 2026",   // search listings only, not on the page
  dateShort:  "10.24.26",            // the big orange date
  hours:      "",                    // e.g. "4 p.m. to midnight". Empty hides the line
  instagram:  "fallcrawlkc",         // handle only, no @

  /* ---- The Instagram button under the hero --------------------------- */

  ig: {
    button: "Follow + tag",          // the @handle is added for you
    blurb:  "Follow @fallcrawlkc for the latest updates, cocktail specials & everything happening along the crawl. Tag us while you're out — we want to see where you end up! 🔮",
  },

  /* ---- The block under the hero -------------------------------------- */

  about: {
    heading: "The East Crossroads is getting spooky",

    // One line per paragraph. Copy a line to add one, delete a line to remove
    // one, and keep the comma at the end of each.
    paragraphs: [
      "Spend the Saturday before Halloween exploring the East Crossroads as bars and restaurants throughout the neighborhood come together for specialty cocktails, one-night-only events, live entertainment, featured brands and plenty of surprises.",

      "The plan is simple: throw on a costume, grab your friends and show up.",

      "Stop for a cocktail, stay for an event, wander to the next bar — the night is yours.",

      "No tickets. No wristbands. No starting point. No finish line. There is no right way to crawl it.",
    ],
  },

  /* ---- Social icons, top right ---------------------------------------
     Only instagram, tiktok and facebook work. Delete the // to add one.  */

  socials: [
    { network: "instagram", handle: "fallcrawlkc" },
    // { network: "tiktok",   handle: "fallcrawlkc" },
    // { network: "facebook", handle: "fallcrawlkc" },
  ],

  /* ---- Participating spots -------------------------------------------
     The whole section stays hidden until there is one bar in here, and the
     count in the heading looks after itself.

     To add one, delete the // from the two lines below and change the words.

       street   no city. "Kansas City, MO" is added for the map link
       doing    leave as "" until confirmed and the line is left off
       insta    handle only, no @. "" if they have none
       live     false hides a bar without deleting it                     */

  venues: [
    // { name: "Example Bar", street: "1234 Grand Blvd", insta: "examplebar",
    //   doing: "Spiced old fashioned, $8 all night", live: true },
  ],

  /* ---- Suggested crawls ----------------------------------------------
     Optional routes, not official. Hidden until the // come off.         */

  routes: [
    // { name: "The Chill Crawl", blurb: "Three stops, no rush, somewhere to sit at each one." },
    // { name: "All Day",         blurb: "Start when doors open and work east. Pace yourself." },
    // { name: "Late Night",      blurb: "Show up after dark for the places that get loud." },
  ],

  /* ---- Partners -------------------------------------------------------
       url     full address starting https://. "" leaves the name unlinked
       phone   any 10 digit number. Dashes and brackets are fine
       insta   handle only, no @. "" if they have none                    */

  partners: [
    {
      name:  "EZ Pedicabs",
      blurb: "No app. Just text or call. You can schedule ahead too!",
      url:   "https://ezpedicabs.com",
      phone: "8162268444",
      insta: "",
    },
  ],
};
