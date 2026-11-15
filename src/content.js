export const NAV_LINKS = [
  { to: "/#rsvp", label: "RSVP" },
  { to: "/travel", label: "Travel" },
  { to: "/itinerary", label: "Itinerary" },
  { to: "/#our-story", label: "Our Story" },
  { to: "/#faq", label: "FAQ" },
];

export const HOTELS = [
  {
    name: "Hotel Zoagli",
    url: "https://www.hotelzoagli.it/",
    text: "the town’s best-reviewed proper hotel, and now the closest option to the venue, right across from the train station. Family run, with simple but clean rooms and a breakfast guests love. Five minute walk to the public beach.",
    block: {
      title: "Rooms held for our guests, June 8 – 10",
      rooms: [
        { type: "Single room", count: 3, price: "€69 a night" },
        { type: "Double room", count: 11, price: "€125 a night", extra: "a third bed can be added in some for €20 a night" },
        { type: "Family room", count: 2, price: "priced by number of guests", extra: "a double and a single, or a double and two singles" },
      ],
      notes: [
        "Every room has a private bathroom, fridge, microwave and free wifi.",
        "Buffet breakfast is €15 per person, booked on arrival. A baby cot is €10 a night on request.",
        "Tourist tax of €1 per person per night (ages 15 and up) is not included.",
        "The hotel is spread over three floors with no elevator.",
      ],
    },
  },
  {
    name: "Vista Portofino",
    url: "https://www.booking.com/hotel/it/vista-portofino-zoagli.html?checkin=2027-06-07&checkout=2027-06-10&group_adults=2&group_children=0&no_rooms=1",
    text: "apartment style in Zoagli, singled out for its views across the gulf from a private terrace. A short walk to Spiaggia del Duca and to the castle venue.",
    notes: ["Availability only shows on Booking.com once dates are set, so this link opens on June 7 – 10. Adjust the dates to fit your stay."],
  },
  {
    name: "Casa Camilla",
    url: "https://www.booking.com/hotel/it/casa-camilla-zoagli.html?checkin=2027-06-07&checkout=2027-06-11&group_adults=2&group_children=0&no_rooms=1",
    text: "also in Zoagli, walking distance to both beaches. One-bedroom apartment with a sea view balcony and free private parking. Often called one of the best views in town.",
    notes: [
      "Four-night minimum stay.",
      "Availability only shows on Booking.com once dates are set, so this link opens on June 7 – 11. Adjust the dates to fit your stay.",
    ],
  },
  {
    name: "Hotel Canali",
    url: "https://www.hotelcanalirapallo.eu/en/index",
    text: "about ten minutes away in Rapallo, a belle époque villa set in a quiet park. Turkish bath, small gym, and a restaurant open in season. More rooms and amenities than anything in Zoagli itself.",
  },
  {
    name: "Grand Hotel Bristol Resort & Spa",
    url: "https://www.expedia.com/Hotel-Search?HotelID=891022&selected=891022&destination=Rapallo%2C+Liguria%2C+Italy&regionId=4878&startDate=2027-06-08&endDate=2027-06-10&adults=2",
    text: "in Rapallo, the grandest option nearby, looking out over the Gulf of Tigullio. Le Cupole, its rooftop restaurant, is known for the view, and there’s an outdoor pool in season and a full spa.",
    notes: ["This link opens Expedia on June 8 – 10 with the Bristol at the top. Adjust the dates to fit your stay."],
  },
  {
    name: "Tigullio Royal Hotel",
    url: "https://www.hotelsone.com/rapallo-hotels-it/best-western-plus-tigullio-royal-hotel.html?q=rmcnf:1[2,0];start:2027-06-08;end:2027-06-10;cur:USD",
    text: "a Best Western Plus right on Rapallo’s seafront promenade, steps from the beach and the town market. It looks out over the gulf, with a roof terrace and a small spa with sauna and Turkish bath. No pool.",
    notes: ["This link opens on June 8 – 10. Adjust the dates to fit your stay."],
  },
];

export const EVENTS = [
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
