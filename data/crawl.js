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
 *  The bars are under "Participating spots", near the bottom.
 */

window.FALL_CRAWL = {

  /* ---- The basics --------------------------------------------------- */

  title:      "East Crossroads Fall Crawl - KCMO",
  titleShort: "Fall Crawl - KCMO",   // used on phones, where the full name will not fit
  dateShort:  "10.24.26",            // the big orange date
  date:       "2026-10-24",          // the real date: runs the countdown and the calendar button
  wheelFrom:  "",                    // a date hides the wheel until that day, e.g. "2026-10-17". "" shows it now
  hours:      "",                    // e.g. "4 p.m. to midnight". Empty hides the line
  instagram:  "fallcrawlkc",         // handle only, no @

  /* ---- The Instagram button under the hero --------------------------- */

  ig: {
    button: "",                      // a word before the @handle, e.g. "Follow". Empty shows the handle alone
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
     and it replaces that, or a list of lines for more than one paragraph.
     false hides the section completely.                                   */

  guide:  false,                     // Crawl Guide (hidden for now)
  // Trick-or-Treat Routes: one line per paragraph, in quotes, each
  // followed by a comma.
  treats: [
    "We won't send you into the wild alone.",
    "Three curated routes are coming soon, whether you want to hit them all, take your time or chase the wildest things happening throughout the crawl.",
    "Built around special events, experiences and timing. Routes drop closer to crawl day.",
  ],

  /* ---- Play it safe ---------------------------------------------------
     Same shape as What to Expect: one block per item.                     */

  safety: [
    { title: "Plan a Safe Ride Home",
      text:  "Do not drink and drive. Walk between participating locations and plan a safe ride home before you start the crawl. Rideshare and other transportation options are encouraged." },
    { title: "Bring Your ID",
      text:  "Participating venues will be checking IDs. Bring a valid, government-issued photo ID and be prepared to show it at each location. Costumes, masks, makeup or prosthetics must not prevent staff from verifying your identity." },
    { title: "No Weapons",
      text:  "No weapons, real or fake. This includes costume or prop guns, knives, swords and other items that could be mistaken for a weapon." },
    { title: "Look Out for Each Other",
      text:  "Stay with your people and keep an eye on each other. Know your limits, don't leave anyone behind, and if something doesn't feel right, say something or let bartenders and staff know." },
    { title: "Costume Guidelines",
      text:  "Go all out, but use good judgment. Each venue reserves the right to refuse entry based on costumes, props or attire they consider offensive, unsafe or inappropriate. Individual venue policies and staff decisions apply." },
  ],

  /* ---- Social icons, top right ---------------------------------------
     Only instagram, tiktok and facebook work. Delete the // to add one.  */

  socials: [
    { network: "instagram", handle: "fallcrawlkc" },
    // { network: "tiktok",   handle: "fallcrawlkc" },
    // { network: "facebook", handle: "fallcrawlkc" },
  ],

  /* ---- Participating spots -------------------------------------------
     Every spot here also goes on the Fall Crawl Roulette wheel. Anything
     left as "" is simply left off, and a spot with no details yet says
     "Details coming soon." Fill in what you know, add the rest later.

       street        no city. "Kansas City, MO" is added for the map link
       hours         e.g. "4 p.m. to 1:30 a.m.", shown under the address
       insta         handle only, no @. "" if they have none
       brands        featured brands, e.g. ["Ole Smoky", "High Noon"]. A
                     name with a logo on file shows the logo; any other
                     name shows as text
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

    // The 13 participating spots, A to Z.
    { name: "Beckett's",                street: "1701 McGee St",    hours: "11 a.m. to 1:30 a.m.", insta: "beckettskcmo",
      brands: ["Ole Smoky", "High Noon", "Lucky One"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "The Belfry",               street: "1532 Grand Blvd",  hours: "4 p.m. to midnight", insta: "thebelfrycollective",
      brands: ["Fireball", "Four Roses"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Chartreuse Saloon",        street: "1627 Oak St",      hours: "4 p.m. to 1:30 a.m.", insta: "chartreusesaloonkc",
      brands: ["Old Forester 86"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Cigar Box",                street: "1519 Grand Blvd",  hours: "5 p.m. to 3 a.m.", insta: "thecigarbox",
      brands: ["Tito's Handmade Vodka"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "The Den",                  street: "1830 Walnut St",   hours: "6 p.m. to 1 a.m.", insta: "thefoldkcmo",
      brands: ["Crystal Head Vodka"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Grinder's",                 street: "417 E 18th St",    hours: "11 a.m. to midnight", insta: "grinderskc",
      brands: ["Wild Turkey American Honey"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "International Tap House",  street: "403 E 18th St",    hours: "11 a.m. to 1 a.m.", insta: "itapxroads",
      brands: ["Chica Chida"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Jade Jaguar",              street: "1800 Walnut St",   hours: "5 p.m. to 1:30 a.m.", insta: "jadejaguarkc",
      brands: ["Rosaluna Mezcal"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "King G",                   street: "500 E 18th St",    hours: "11 a.m. to 1:30 a.m.", insta: "king.g.kc",
      brands: [],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "MOD Gallery",              street: "1809 McGee St",    hours: "7 p.m. to 1 a.m.", insta: "mod.gallery.space2",
      brands: ["Jack Daniel's"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Ricochet",                 street: "1720 McGee St",    hours: "11 a.m. to 1:30 a.m.", insta: "ricochetkcmo",
      brands: ["Espolon", "High Noon", "Lucky One"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Tannin",                   street: "1526 Walnut St",   hours: "4 p.m. to 1:30 a.m.", insta: "tanninkc",
      brands: ["Justin Winery"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
    { name: "Ted's Taproom",            street: "1829 McGee St",    hours: "5 p.m. to 1 a.m.", insta: "teds_taproom",
      brands: ["Ben Holladay"],
      doing: "", drinks: "", entertainment: "", menu: "", cover: "" },
  ],

  /* ---- Suggested crawls ----------------------------------------------
     Optional routes, not official. Hidden until the // come off.         */

  routes: [
    // { name: "The Chill Crawl", blurb: "Three stops, no rush, somewhere to sit at each one." },
    // { name: "All Day",         blurb: "Start when doors open and work east. Pace yourself." },
    // { name: "Late Night",      blurb: "Show up after dark for the places that get loud." },
  ],

  /* ---- Partners -------------------------------------------------------
       url     full address starting https://. Links the name and shows
               the address as its own link. "" leaves both off
       phone   any 10 digit number. Dashes and brackets are fine. Tapping
               it opens a text message, here and on the wheel's card
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
