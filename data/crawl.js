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
    blurb:  "Tag #fallcrawlkc, we want to see where you end up!",   // the line under the button. Empty hides it
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
     Every spot here shows in the Fall Crawl Guide and goes on the Fall
     Crawl Roulette wheel, in this order. Anything left as "" or [] is
     simply left off.

       name          the business, e.g. "Beckett's"
       collab        the guide's heading, e.g. "Beckett's X Ole Smoky".
                     "" uses the name
       event         the night's event name, under the heading and on the
                     wheel. "" puts the business name on the wheel
       street        no city. "Kansas City, MO" is added for the map link
       hours         e.g. "4 p.m. to 1:30 a.m.", shown under the address
       insta         handle only, no @. "" if they have none
       brands        featured brands, e.g. ["Ole Smoky", "High Noon"]. A
                     name with a logo on file shows the logo; any other
                     name shows as text
       about         the write-up. One line per paragraph, in quotes, each
                     followed by a comma
       lists         titled lists, e.g. featured drinks:
                       { title: "Featured Drinks", items: ["One", "Two"] },
       prize         lines shown only when the wheel lands on this spot
       live          false hides a spot without deleting it              */

  venues: [
    { name: "Beckett's", street: "1701 McGee St", hours: "11 a.m. to 1:30 a.m.", insta: "beckettskcmo",
      collab: "Beckett's X Lucky One X Ole Smoky",
      event:  "The Haunted Tailgate",
      brands: ["Ole Smoky", "High Noon", "Lucky One"],
      about: [
        "Game day gets a spooky twist at Beckett's! Test your arm with Ole Smoky's football toss from 1-4pm, grab a caramel apple slushie, and sip on Lucky Ones while you get into the Halloween spirit.",
      ],
      lists: [
        { title: "Featured Drinks", items: ["Nut Up or Shut Up Shots", "Caramel Apple Slushies"] },
      ] },

    { name: "Chartreuse Saloon", street: "1627 Oak St", hours: "4 p.m. to 1:30 a.m.", insta: "chartreusesaloonkc",
      collab: "Chartreuse Saloon X Old Forester",
      event:  "Your Fortune Awaits",
      brands: ["Old Forester 86"],
      about: [
        "Your Old Forester cocktail comes with an offering. Make the offering and your fortune awaits…",
      ],
      lists: [
        { title: "Featured Cocktails", items: ["Fall Old Fashioned", "Lion’s Tale", "Vampire Juice"] },
      ] },

    { name: "Cigar Box", street: "1519 Grand Blvd", hours: "5 p.m. to 3 a.m.", insta: "thecigarbox",
      collab: "Cigar Box X Tito’s Handmade Vodka",
      event:  "",
      brands: ["Tito's Handmade Vodka"],
      about: ["More coming soon…"],
      lists: [] },

    { name: "Grinder's", street: "417 E 18th St", hours: "11 a.m. to midnight", insta: "grinderskc",
      collab: "Grinder’s X Wild Turkey American Honey",
      event:  "",
      brands: ["Wild Turkey American Honey"],
      about: ["More coming soon…"],
      lists: [] },

    { name: "International Tap House", street: "403 E 18th St", hours: "11 a.m. to 1 a.m.", insta: "itapxroads",
      collab: "International Tap House X Chica-Chida",
      event:  "",
      brands: ["Chica Chida"],
      about: ["More coming soon…"],
      lists: [] },

    { name: "Jade Jaguar", street: "1800 Walnut St", hours: "5 p.m. to 1:30 a.m.", insta: "jadejaguarkc",
      collab: "Jade Jaguar X Rosaluna Mezcal",
      event:  "Mezcal is Magic",
      brands: ["Rosaluna Mezcal"],
      about: [
        "Follow the moon to discover the magic of mezcal featuring a one-night-only cocktail menu featuring Rosaluna Mezcal.",
        "Giveaways!",
      ],
      lists: [
        { title: "Featured Cocktails", items: ["Coming soon…"] },
      ] },

    { name: "King G", street: "500 E 18th St", hours: "11 a.m. to 1:30 a.m.", insta: "king.g.kc",
      collab: "King G X Wild Turkey",
      event:  "The Midnight Matinee",
      brands: ["Wild Turkey"],
      about: [
        "A little spooky, a little boozy, and plenty of Halloween classics.",
      ],
      lists: [
        { title: "Featured Cocktail", items: ["Boulevardier"] },
      ] },

    { name: "MOD Gallery", street: "1809 McGee St", hours: "7 p.m. to 1 a.m.", insta: "mod.gallery.space2",
      collab: "MOD Gallery X Jack Daniel’s",
      event:  "Late Night Freaks",
      brands: ["Jack Daniel's"],
      about: [
        "DJ’s start at 8pm. lotek. clockwerk. j. curtis. $5 cover. Polaroid photos and giveaways.",
      ],
      lists: [
        { title: "Featured Cocktails", items: ["Coming soon…"] },
      ] },

    { name: "Ricochet", street: "1720 McGee St", hours: "11 a.m. to 1:30 a.m.", insta: "ricochetkcmo",
      collab: "Ricochet X High Noon X Espolon",
      event:  "Play at Your Own Risk",
      brands: ["Espolon", "High Noon", "Lucky One"],
      about: [
        "High Noon Skee-Ball Tournament | 2–4 PM",
        "Think you've got the highest score? Prove it! Top scorer takes home a prize.",
        "Keep the Games Going with Espolòn!",
        "Yard games, giveaways, and Halloween cocktails to keep the fun going into the night.",
      ],
      lists: [
        { title: "Featured Cocktails", items: ["Peach Cobbler Margarita", "Pumpkin Spice Shots"] },
      ] },

    { name: "Tannin", street: "1526 Walnut St", hours: "4 p.m. to 1:30 a.m.", insta: "tanninkc",
      collab: "Tannin X Justin Winery",
      event:  "Into the Vines",
      brands: ["Justin Winery"],
      about: [
        "A special JUSTIN Winery takeover",
        "From 5:30–7:30 PM, enjoy a complimentary guided tasting with JUSTIN Winery’s own Stephanie Kritchell and explore a special selection from one of Paso Robles’ most recognized estates.",
        "Can’t make the guided tasting? The JUSTIN lineup will be available all evening by the taste, flight, glass, and bottle.",
        "Complimentary guided tasting | 5:30–7:30 PM",
        "JUSTIN wines available all night",
      ],
      lists: [] },

    { name: "Ted's Taproom", street: "1829 McGee St", hours: "5 p.m. to 1 a.m.", insta: "teds_taproom",
      collab: "Ted’s Taproom X Holladay Bourbon",
      event:  "The Forbidden Era",
      brands: ["Ben Holladay"],
      about: [
        "Slip into the 1920’s for Jazz & Bourbon Cocktails. Featuring locally crafted Holladay Bourbon from Weston, Missouri.",
        "$10 Cover - (Chance to win Free Cover in Fall Crawl Roulette)",
      ],
      lists: [
        { title: "Live Jazz Music", items: [
            "5pm-7pm TBD",
            "8pm-11pm Danny Jensen Electronic Swing Band",
            "11pm-1am Tyree The Drummer & Vincent Orsolini Trio",
          ] },
        { title: "Featured Cocktails", items: ["The Black Cat", "Blood & Smoke"] },
      ],
      prize: ["YOU WON FREE COVER AT TED’S TAPROOM!", "10.24.26 | SCREENSHOT TO REDEEM"] },

    { name: "The Belfry Collective", street: "1532 Grand Blvd", hours: "4 p.m. to midnight", insta: "thebelfrycollective",
      collab: "The Belfry X Four Roses X Fireball",
      event:  "Heaven or Hell",
      brands: ["Fireball", "Four Roses"],
      about: [
        "Ascend into heaven at The Belfry for angelic cocktails, or descend into Ground Control for a Fireball-fueled Disco Inferno. Over-the-top decorations, wicked cocktails, and a little temptation around every corner.",
      ],
      lists: [
        { title: "Drinks in The Belfry", items: ["Oh My Gourd!", "Cinn & Spice", "Send me an Angel Shot"] },
        { title: "Ground Control Menu", items: ["Type O Negative Sangria", "The Harvest Fireball"] },
      ] },

    { name: "The Den", street: "1830 Walnut St", hours: "6 p.m. to 1 a.m.", insta: "thefoldkcmo",
      collab: "The Den X Crystal Head Vodka",
      event:  "Den of the Dead",
      brands: ["Crystal Head Vodka"],
      about: [
        "Step into The Den for a one-night-only spooky cocktail experience worth losing your head over.",
      ],
      lists: [
        { title: "Featured Cocktails", items: ["Drop Dead Gorgeous", "Blood Money", "Grave Mistake"] },
      ] },
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
