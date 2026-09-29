/**
 *  EAST CROSSROADS FALL CRAWL - event content
 *  This is the only file that needs editing.
 *
 *    1. Click the pencil icon, top right
 *    2. Change the words between the quote marks
 *    3. Click the green "Commit changes" button, then again in the box
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
  dateShort:  "10.24.26",            // the big orange date
  hours:      "",                    // e.g. "4 p.m. to midnight". Empty hides the line
  instagram:  "fallcrawlkc",         // handle only, no @

  /* ---- The Instagram button under the hero --------------------------- */

  ig: {
    button: "Follow",                // the @handle is added for you
    blurb:  "",                      // the line under the button. Empty hides it
  },

  /* ---- The headline over the map ------------------------------------- */

  headline: "The East Crossroads is Getting Spooky!",
  blurb:    "",                      // 1 or 2 sentences under the headline. Empty hides it

  /* ---- What to Expect -------------------------------------------------
     One block per item. Copy a block to add one, delete a block to remove
     one.                                                                  */

  expect: [
    { title: "13 Neighborhood Spots",
      text:  "Your favorite East Crossroads bars and restaurants are doing their own thing for the night." },
    { title: "Really Good Drinks",
      text:  "Specialty craft cocktails, one-night-only menus and featured pours throughout the neighborhood." },
    { title: "More Than a Bar Crawl",
      text:  "Live entertainment. Themed parties. Pop-up bars. Spooky surprises. Giveaways. And more still in the works." },
    { title: "No Schedule to Follow",
      text:  "Start wherever you want. Stay somewhere all night. Hit four places. Try all 13. We genuinely do not care. Most places open around 4 p.m. More info to come." },
    { title: "Costumes Encouraged",
      text:  "It's the Saturday before Halloween in the Crossroads Arts District. Get creative!" },
    { title: "Free to Attend",
      text:  "No tickets. No wristbands. Drinks are purchased directly from each participating business. 21+.",
      note:  "Cover charges may apply at some locations." },
  ],

  /* ---- Coming-soon sections -------------------------------------------
     Leave as "" and the section shows "Coming soon". Type a description
     and it replaces that. false hides the section completely.            */

  guide:  false,                     // Crawl Guide (hidden for now)
  treats: "",                        // Trick-or-Treat Routes

  /* ---- Social icons, top right ---------------------------------------
     Only instagram, tiktok and facebook work. Delete the // to add one.  */

  socials: [
    { network: "instagram", handle: "fallcrawlkc" },
    // { network: "tiktok",   handle: "fallcrawlkc" },
    // { network: "facebook", handle: "fallcrawlkc" },
  ],

  /* ---- Participating spots -------------------------------------------
     Every spot here also goes on the "Spin for your next stop" wheel.
     Anything left as "" is simply left off, and a spot with no details yet
     says "Details drop day-of". Fill in what you know, add the rest later.

       street        no city. "Kansas City, MO" is added for the map link
       insta         handle only, no @. "" if they have none
       doing         one line for the list, e.g. "Spooky cocktail menu"
       drinks        drink specials
       entertainment DJs, bands, costume contests, anything happening
       menu          feature menu or food
       cover         e.g. "$10 after 9 p.m." or "No cover"
       live          false hides a spot without deleting it              */

  venues: [
    // { name: "Example Bar", street: "1234 Grand Blvd", insta: "examplebar",
    //   doing: "Spooky cocktail menu", drinks: "$8 spiced old fashioneds",
    //   entertainment: "DJ from 9 p.m.", menu: "", cover: "No cover", live: true },
  ],

  /* ---- Wheel preview ------------------------------------------------
     Made-up spots so the wheel can be tried before the real list exists.
     They only appear while "venues" above is empty, are marked "Example" on
     the card, and never show in the spots list. Set to false to turn off.  */

  showExamples: true,

  examples: [
    { name: "The Hollow Tap",   street: "1601 Grand Blvd", drinks: "$6 black-cherry sours",       entertainment: "Costume contest at 10 p.m.", cover: "No cover" },
    { name: "Bone Dry Bar",     street: "1614 Walnut St",  drinks: "Smoked old fashioned, $9",   menu: "Graveyard nachos",           cover: "$5 after 9 p.m." },
    { name: "Crypt & Keg",      street: "1700 Grand Blvd", drinks: "Pumpkin ale on tap",          entertainment: "Live punk trio" },
    { name: "Midnight Mortuary",street: "1722 McGee St",   drinks: "Blood-orange margaritas",     entertainment: "Tarot readings",           cover: "No cover" },
    { name: "Wicked Pour",      street: "1805 Oak St",     drinks: "$7 witch's brew shots" },
    { name: "The Screaming Pint",street: "1812 Grand Blvd",entertainment: "Horror-movie karaoke",     cover: "$10 after 9 p.m." },
    { name: "Candlewax Lounge", street: "1820 Walnut St",  drinks: "Candy-corn espresso martini", menu: "Late-night churros" },
    { name: "Ghoul Hall",       street: "1901 McGee St",   entertainment: "DJ from 9 p.m.",          cover: "$5" },
    { name: "Haunt & Hops",     street: "1906 Oak St" },
    { name: "Skeleton Key",     street: "1615 Locust St",  drinks: "Mezcal \"bone marrow\" shot", entertainment: "Speakeasy password at the door" },
    { name: "Coffin Club",      street: "1733 Grand Blvd", drinks: "Cider on draft",              menu: "Coffin-shaped pizza slices", cover: "No cover" },
    { name: "Poltergeist Pub",  street: "1840 McGee St",   entertainment: "Ghost-story open mic" },
    { name: "The Last Rites",   street: "1918 Walnut St",  drinks: "$8 absinthe drip",            cover: "$10" },
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
