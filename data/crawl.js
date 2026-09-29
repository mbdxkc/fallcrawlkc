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
     and it replaces that.                                                 */

  guide:  "",                        // Crawl Guide
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
