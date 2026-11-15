// Getting from Milan Malpensa (MXP) to Zoagli by train.
// Times, frequencies and fares are typical estimates — they vary by date and
// how early tickets are bought. Double-check on the operators' sites.

export const BOOKING = {
  trenitalia: "https://www.trenitalia.com/en.html",
  malpensaExpress: "https://www.malpensaexpress.it/",
};

// Map projection: lon/lat → SVG units (viewBox 0 0 600 900).
// 380 units per degree of longitude, 536 per degree of latitude (≈ true scale at 45°N).
export const project = ([lat, lon]) => [(lon - 8.3) * 380, (45.8 - lat) * 536];

export const STATIONS = {
  mxp: { name: "Malpensa Airport", short: "MXP", coord: [45.63, 8.723], kind: "airport" },
  busto: { name: "Busto Arsizio", coord: [45.612, 8.851], kind: "stop" },
  saronno: { name: "Saronno", coord: [45.625, 9.037], kind: "stop" },
  bovisa: { name: "Milano Bovisa", coord: [45.502, 9.16], kind: "stop" },
  milano: { name: "Milano Centrale", coord: [45.486, 9.204], kind: "hub" },
  pavia: { name: "Pavia", coord: [45.189, 9.144], kind: "stop" },
  voghera: { name: "Voghera", coord: [44.992, 9.009], kind: "stop" },
  tortona: { name: "Tortona", coord: [44.896, 8.866], kind: "stop" },
  novi: { name: "Novi Ligure", coord: [44.762, 8.787], kind: "stop" },
  arquata: { name: "Arquata Scrivia", coord: [44.687, 8.885], kind: "stop" },
  ronco: { name: "Ronco Scrivia", coord: [44.611, 8.954], kind: "stop" },
  principe: { name: "Genova P. Principe", coord: [44.425, 8.921], kind: "stop" },
  brignole: { name: "Genova", coord: [44.415, 8.947], kind: "via" },
  nervi: { name: "Nervi", coord: [44.389, 9.036], kind: "stop" },
  recco: { name: "Recco", coord: [44.37, 9.143], kind: "stop" },
  camogli: { name: "Camogli", coord: [44.357, 9.158], kind: "stop" },
  smargherita: { name: "S. Margherita–Portofino", coord: [44.343, 9.211], kind: "hub" },
  rapallo: { name: "Rapallo", coord: [44.356, 9.23], kind: "stop" },
  zoagli: { name: "Zoagli", coord: [44.344, 9.266], kind: "destination" },
};

export const LEGS = [
  {
    id: "malpensa-express",
    line: "Malpensa Express",
    operator: "Trenord",
    from: "Malpensa Airport (T1 / T2)",
    to: "Milano Centrale",
    duration: "≈ 50 min",
    frequency: "Every 30 min",
    stops: ["mxp", "busto", "saronno", "bovisa", "milano"],
    color: "#a0603e",
    fares: { standard: [13, 13], first: [13, 13] },
    tip: "Only if you’re flying into Malpensa. Follow the “Treni / Trains” signs from arrivals, and make sure the train is bound for Milano Centrale — some run to Milano Cadorna instead.",
    book: { label: "Malpensa Express tickets", url: BOOKING.malpensaExpress },
  },
  {
    id: "intercity",
    line: "Intercity (direct)",
    operator: "Trenitalia",
    from: "Milano Centrale",
    to: "Santa Margherita Ligure–Portofino",
    duration: "≈ 2 h – 2 h 20",
    frequency: "Several direct trains a day",
    stops: ["milano", "pavia", "voghera", "tortona", "novi", "arquata", "ronco", "principe", "brignole", "nervi", "recco", "camogli", "smargherita"],
    color: "#473025",
    fares: { standard: [18, 35], first: [28, 50] },
    tip: "Pick a direct Intercity heading toward La Spezia or Livorno — other departures need a change in Genova. Seats are reserved and fares rise closer to the date, so book early. Portofino itself is 5 km from the station by bus or boat.",
    book: { label: "Book on Trenitalia", url: BOOKING.trenitalia },
  },
  {
    id: "regionale",
    line: "Regionale",
    operator: "Trenitalia Liguria",
    from: "Santa Margherita Ligure–Portofino",
    to: "Zoagli",
    duration: "≈ 10 min",
    frequency: "1–2 per hour",
    stops: ["smargherita", "rapallo", "zoagli"],
    color: "#6b7a55",
    fares: { standard: [2, 3], first: [2, 3] },
    tip: "Two stops along the coast, via Rapallo. Not every regional train stops in Zoagli — check the departure board. Paper regional tickets must be validated before boarding.",
    book: { label: "Book on Trenitalia", url: BOOKING.trenitalia },
  },
];

export const TRAVEL_TIME = "≈ 2 h 15 from Milano Centrale";

export const ARRIVAL = {
  title: "Walk to Castello Canevaro",
  text: "From Zoagli station the castle is about a five minute walk through the center of town.",
};

// Land/sea and landmark outlines for the illustrated map, as [lat, lon].
export const COASTLINE = [
  [44.2, 8.3], [44.27, 8.44], [44.3, 8.481], [44.352, 8.578], [44.395, 8.682], [44.42, 8.751],
  [44.402, 8.89], [44.397, 8.925], [44.371, 9.04], [44.35, 9.14], [44.312, 9.15], [44.292, 9.215],
  [44.29, 9.225], [44.324, 9.212], [44.339, 9.232], [44.325, 9.266], [44.306, 9.325],
  [44.262, 9.39], [44.242, 9.42], [44.229, 9.49], [44.162, 9.61], [44.092, 9.9],
];

export const PO_RIVER = [[45.07, 8.3], [45.01, 8.64], [45.0, 8.73], [45.1, 9.0], [45.13, 9.2], [45.05, 9.69], [45.08, 9.9]];
export const TICINO_RIVER = [[45.727, 8.635], [45.6, 8.67], [45.4, 8.92], [45.18, 9.14], [45.14, 9.22]];
export const LAKE_MAGGIORE = [[45.81, 8.62], [45.76, 8.556], [45.745, 8.585], [45.727, 8.635], [45.745, 8.645], [45.775, 8.6], [45.81, 8.66]];
