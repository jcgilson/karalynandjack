export const NAV_LINKS = [
  { href: "#rsvp", label: "RSVP" },
  { href: "#travel", label: "Travel" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#our-story", label: "Our Story" },
  { href: "#faq", label: "FAQ" },
];

export const HOTELS = [
  {
    name: "Hotel Zoagli",
    url: "https://www.hotelzoagli.it/",
    text: "the town’s best-reviewed proper hotel, and now the closest option to the venue, right across from the train station. Family run, with simple but clean rooms and a breakfast guests love. Five minute walk to the public beach.",
  },
  {
    name: "Vista Portofino",
    url: "https://www.booking.com/hotel/it/vista-portofino-zoagli.html",
    text: "apartment style in Zoagli, singled out for its views across the gulf from a private terrace. A short walk to Spiaggia del Duca and to the castle venue.",
  },
  {
    name: "Casa Camilla",
    url: "https://www.booking.com/hotel/it/casa-camilla-zoagli.it.html",
    text: "also in Zoagli, walking distance to both beaches. One-bedroom apartment with a sea view balcony and free private parking. Often called one of the best views in town.",
  },
  {
    name: "Hotel Canali",
    url: "https://www.hotelcanalirapallo.eu/en/index",
    text: "about ten minutes away in Rapallo, a belle époque villa set in a quiet park. Turkish bath, small gym, and a restaurant open in season. More rooms and amenities than anything in Zoagli itself.",
  },
];

export const EVENTS = [
  {
    date: "6/8",
    title: "Welcome Dinner",
    time: "4PM",
    text: "The moment we’ve been waiting for. We ask that you set your phones and cameras aside and be fully present with us as we say “I do.”  We promise to share plenty of photos.",
  },
  {
    date: "6/9",
    title: "The Ceremony",
    time: "4PM",
    text: "The moment we’ve been waiting for. We ask that you set your phones and cameras aside and be fully present with us as we say “I do.”  We promise to share plenty of photos.",
  },
  {
    date: "6/9",
    title: "Cocktail Hour",
    time: "5PM",
    text: "Time to celebrate. Sip on signature cocktails and light bites out on the terrace while we grab some quick family photos. Relax and mingle.",
  },
  {
    date: "6/9",
    title: "The Reception",
    time: "6PM",
    text: "Dinner, drinks, and toasts. Join us for a family style meal shared with our favorite people, along with a few words from those closest to us. Then time to dance. We’ll open the floor with our first dance, then it’s yours — come celebrate with us until the night runs out.",
  },
  {
    date: "6/9",
    title: "Send Off",
    time: "11PM",
    text: "The night’s not over until we say goodbye properly. Light the candles, raise one last glass, and send us off into forever.",
  },
];

// Widths (px at desktop) match the original photo strip.
export const GALLERY = [451, 450, 450, 450, 450, 478, 750, 480, 480, 480, 480, 480].map(
  (width, i) => ({ src: `/assets/img/gallery-${String(i + 1).padStart(2, "0")}.jpg`, width })
);

export const STORY = [
  "We met in February 2025 on a first date at a speakeasy in Cherry Creek, complete with a memorable (and slightly questionable) parallel parking attempt by Jack. From that night on, we spent nearly every day together, talking for hours, playing cards, walking Arthur, and dreaming up adventures.",
  "Just a week into dating, we took our first trip to Rocky Mountain National Park and discovered a shared love of exploring new places. Since then, we’ve traveled to Scotland (where Jack proposed!), Iceland, Banff, Oregon, and countless places around Colorado, collecting memories and meeting wonderful people along the way.",
  "At home, you’ll usually find Jack cooking, Karalyn keeping our little crew of Arthur, Kitty, and Ophelia in line, and both of us gathered around the dinner table playing games, talking about everything and nothing, or settling in for a TV binge and a sweet treat.",
  "Getting married in Italy has always been Karalyn’s dream, and celebrating with our favorite people is Jack’s. We couldn’t be more excited to bring those two dreams together and create memories we’ll cherish forever. We hope to see you there.",
];

// `answer` may be a string or a function receiving helpers (see Faq.jsx).
export const FAQS = [
  { q: "Is there a deadline to RSVP?", a: "We would appreciate your RSVP before April 2027." },
  { q: "What is the location?", a: "The Venue Castello Canevaro: Via Luisa Canevaro, 18 16035 Zoagli (GE) – Italia" },
  { q: "What should I wear?", a: "Formal attire, bonus if it’s a neutral color palette." },
  { q: "Can I bring a gift, or is there a registry?", a: "registry" },
  {
    q: "Can I take photos during the ceremony?",
    a: "This is an unplugged ceremony, we would love for you to be a part of the moment. Our wonderful photographer will capture the day.",
  },
  { q: "What time should we arrive?", a: "The Ceremony is at 4pm, please arrive 30 minutes early." },
  {
    q: "Are kids allowed at the wedding?",
    a: "Unfortunately, as much as we’d love to invite all of our friends’ children, we can only accommodate a few close family children. We hope that you will understand this decision.",
  },
  {
    q: "What is the weather like this time of year?",
    a: "On average, in the low to mid 70s, and cool evenings in the mid 60s. Perfect summer weather.",
  },
  { q: "Can I contact you with questions?", a: "contact" },
];
