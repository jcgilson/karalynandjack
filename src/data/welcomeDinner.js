// Welcome dinner boat ride: Rapallo → Santa Margherita Ligure → Portofino,
// following Line 1 of the Servizio Marittimo del Tigullio.

export const BOARDING = {
  name: "Rapallo ferry pier",
  address: "Lungomare Vittorio Veneto, 16035 Rapallo GE, Italy",
  coord: [44.3472, 9.2318],
};

export const appleMapsUrl = () =>
  `https://maps.apple.com/?q=${encodeURIComponent(BOARDING.name)}&address=${encodeURIComponent(BOARDING.address)}&ll=${BOARDING.coord.join(",")}`;

export const googleMapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BOARDING.name}, ${BOARDING.address}`)}`;

export const LINKS = {
  line1: "https://www.traghettiportofino.it/en/lines-trips/line-1",
  boardingPoint: "https://www.traghettiportofino.it/en/useful-info/boarding-points/rapallo",
};

// Map projection: lon/lat → SVG units (viewBox 0 0 600 410).
// 4000 units per degree of longitude, 5640 per degree of latitude (≈ true scale at 44.3°N).
export const projectBay = ([lat, lon]) => [(lon - 9.14) * 4000, (44.362 - lat) * 5640];

export const BAY_COAST = [
  [44.356, 9.14], [44.349, 9.155], [44.335, 9.15], [44.322, 9.146], [44.315, 9.16], [44.316, 9.175],
  [44.306, 9.192], [44.299, 9.208], [44.2975, 9.219], [44.3005, 9.2165], [44.302, 9.213], [44.303, 9.2095],
  [44.3045, 9.2125], [44.307, 9.215], [44.311, 9.2125], [44.322, 9.2105], [44.33, 9.211], [44.334, 9.2112],
  [44.3365, 9.216], [44.339, 9.2195], [44.342, 9.222], [44.346, 9.226], [44.3488, 9.2295], [44.349, 9.234],
  [44.3475, 9.24], [44.344, 9.247], [44.34, 9.255], [44.3345, 9.264], [44.3335, 9.268], [44.329, 9.278],
  [44.322, 9.29],
];

export const BOAT_ROUTE = [
  [44.3472, 9.2318], [44.342, 9.228], [44.336, 9.22], [44.333, 9.214], [44.33, 9.216], [44.32, 9.217],
  [44.309, 9.219], [44.303, 9.216], [44.3033, 9.212],
];

export const PORTS = [
  { id: "rapallo", name: "Rapallo", note: "Board here", coord: [44.3472, 9.2318], label: [-12, -12, "end"] },
  { id: "smargherita", name: "S. Margherita Ligure", coord: [44.333, 9.214], label: [-12, 4, "end"], passing: true },
  { id: "portofino", name: "Portofino", coord: [44.3033, 9.212], label: [-14, 18, "end"], passing: true },
];

// Sights the ferry company highlights along Line 1, in order along the route.
// We stay aboard the whole evening — these are seen from the water, not stops.
export const SIGHTS = [
  {
    name: "Rapallo’s castle on the sea",
    where: "Rapallo",
    coord: [44.3452, 9.2372],
    text: "The little sixteenth-century castle sits on a rock in the water beside the promenade — the first sight as we push off from the pier.",
  },
  {
    name: "San Michele di Pagana",
    where: "Between Rapallo and Santa Margherita",
    coord: [44.3428, 9.2208],
    text: "A quiet cove of seaside villas — look for Villa Spinola among the trees as we round the point.",
  },
  {
    name: "Santa Margherita Ligure",
    where: "Along the shore",
    coord: [44.3385, 9.2085],
    text: "Pastel houses along a fin-de-siècle promenade, fishing boats in the harbor, and Villa Durazzo Centurione’s gardens on the hill above town.",
  },
  {
    name: "Portofino",
    where: "Around the bay",
    coord: [44.3045, 9.2075],
    text: "The famous tiny harbor and its Piazzetta, ringed by colored houses and the green slopes of the Portofino promontory.",
  },
  {
    name: "San Fruttuoso",
    where: "Beyond the headland",
    coord: [44.3168, 9.1755],
    text: "Around the headland lies San Fruttuoso, a hidden cove reached only by boat or on foot — one to save for another day.",
  },
];

export const BAY_LABELS = [
  { text: "Golfo del Tigullio", coord: [44.322, 9.245], cls: "region" },
  { text: "Mar Ligure", coord: [44.296, 9.17], cls: "region" },
  { text: "Parco di Portofino", coord: [44.328, 9.178], cls: "small" },
  { text: "Camogli", coord: [44.352, 9.16], cls: "town" },
  { text: "Paraggi", coord: [44.311, 9.205], cls: "town", anchor: "end" },
];

export const VENUE = { name: "Castello Canevaro", coord: [44.3352, 9.2662] };
