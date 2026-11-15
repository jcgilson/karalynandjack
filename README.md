# Karalyn & Jack

Wedding website for Karalyn Murphy & Jack Gilson — June 9th, 2027, Castello Canevaro, Zoagli, Italy.
A React (Vite) recreation of https://karalynandjack.framer.website.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run preview
```

`dist/` is plain static files, so it can be deployed to Netlify, Vercel, Cloudflare Pages, or GitHub Pages.

## Configuration

Set these in `.env.local` (or edit `src/config.js`):

| Variable | Purpose |
| --- | --- |
| `VITE_RSVP_ENDPOINT` | URL the RSVP form POSTs to (e.g. a Formspree form `https://formspree.io/f/xxxx`). Until it is set, the form validates but shows "RSVPs aren't connected yet". |
| `VITE_REGISTRY_URL` | Registry link. Until it is set, the menu's Registry item is hidden and the FAQ "here" is plain text. |

The RSVP form sends the same field names as the Framer form: `Will you be attending?` / `Not attending`, `Name`, `Guest Name`, `Contact`, `Entree Selection`.

## Structure

- `src/content.js` — menu links, hotels (including the Hotel Zoagli room block for June 8–10), wedding-day events, story, FAQ, and gallery copy
- `src/data/journey.js` — train route from Milan Malpensa to Zoagli (stops, fares, booking links)
- `src/data/welcomeDinner.js` — June 8 Welcome Dinner boat route, boarding point, and sights
- `src/pages/` — Home (`/`), Travel (`/travel`), Itinerary (`/itinerary`)
- `src/components/` — one component per section (Menu, Hero, Rsvp, Travel, JourneyPlanner, JourneyMap, BoatMap, Gallery, Story, Faq, Footer)
- `src/styles.css` — all styling, with breakpoints at 1200px and 810px like the Framer site
- `public/assets/` — photos and videos from the original site

## Fonts

The Framer site uses licensed fonts: Adobe Caslon Pro (body), P22 Franklin Caslon (headings), and BakerScript (script).
These aren't included here. The site falls back to free Google Fonts lookalikes: EB Garamond, IM Fell English, and Monsieur La Doulaise.
If you have web licenses for the originals, add `@font-face` rules named `Adobe Caslon Pro`, `P22 Franklin Caslon`, and `BakerScript` and they'll take over automatically.
If you do this, set `--script-scale` in `src/styles.css` back to `1`.
