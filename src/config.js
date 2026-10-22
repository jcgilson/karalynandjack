// Wedding date (Zoagli is on Central European Summer Time in June).
export const WEDDING_DATE = new Date("2027-06-09T16:00:00+02:00");

// Where RSVP submissions are POSTed. Set this to a form backend such as
// Formspree ("https://formspree.io/f/xxxxxxx"), Basin, or a Google Apps
// Script web app URL. Can also be set with VITE_RSVP_ENDPOINT in .env.local.
// Leave empty to disable submission.
export const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT ?? "";

// Link used by every "Registry" link on the page. When empty, the menu
// item is hidden and the FAQ link is inert.
export const REGISTRY_URL = import.meta.env.VITE_REGISTRY_URL ?? "";
