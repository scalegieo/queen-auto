import { googleBusiness } from "@/lib/google-reviews";

export const dealership = {
  name: "Queen Auto Sales",
  legalName: "Queen Auto Sales",
  tagline: "Get Treated Like a Queen. Quality Cars. Royal Financing.",
  city: "Denver",
  state: "CO",
  stateFull: "Colorado",
  zip: "80220",
  address: "7405 E Colfax Ave",
  addressFull: "7405 E Colfax Ave, Denver, CO 80220",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "7209029561",
  phoneDisplay:
    process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(720) 902-9561",
  phoneEs: process.env.NEXT_PUBLIC_PHONE_ES ?? "3034841543",
  phoneEsDisplay:
    process.env.NEXT_PUBLIC_PHONE_ES_DISPLAY ?? "(303) 484-1543",
  email: "info@queenautosales.com",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.queenautosales.com",
  foundedYear: 1999,
  googlePlaceId: googleBusiness.placeId,
  hours: [
    { day: "Monday", open: "9:30 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "9:30 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "9:30 AM", close: "6:00 PM" },
    { day: "Thursday", open: "9:30 AM", close: "6:00 PM" },
    { day: "Friday", open: "9:30 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:30 AM", close: "6:00 PM" },
    { day: "Sunday", open: "Closed", close: "" },
  ],
  mapLink: googleBusiness.mapsUrl,
  highlights: [
    "Family owned & operated",
    "Serving Denver since 1999",
    "Guaranteed credit approval",
    "Buy Here Pay Here available",
    "Se habla Español",
  ],
} as const;

export function telHref(phone = dealership.phone) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}
