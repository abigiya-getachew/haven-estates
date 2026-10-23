export interface Property {
  id: string;
  slug: string;
  title: string;
  neighborhood: string;
  city: string;
  transactionType: "sale" | "rent";
  priceFormatted: string;
  priceNote?: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  image: string;
  tag: string;
  description: string;
  features: string[];
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: "haven-01",
    slug: "the-obsidian-terraces-bole",
    title: "The Obsidian Terraces",
    neighborhood: "Bole Atlas",
    city: "Addis Ababa",
    transactionType: "sale",
    priceFormatted: "$680,000",
    priceNote: "or ETB equivalent",
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqm: 385,
    image: "/images/real-estate/bole-penthouse.jpg",
    tag: "Sky Penthouse",
    description:
      "A rare duplex penthouse suspended above Bole Atlas featuring 360-degree panoramic glass, Italian imported marble, expansive private terraces, and dedicated secure elevator access.",
    features: ["Private Terrace", "Concierge Service", "Full Power Backup", "Dedicated 3-Car Parking"],
  },
  {
    id: "haven-02",
    slug: "sanctuary-pavilions-old-airport",
    title: "Sanctuary Pavilions",
    neighborhood: "Old Airport",
    city: "Addis Ababa",
    transactionType: "sale",
    priceFormatted: "$1,250,000",
    priceNote: "Private treaty",
    bedrooms: 5,
    bathrooms: 6,
    areaSqm: 620,
    image: "/images/real-estate/old-airport-villa.jpg",
    tag: "Exclusive Villa",
    description:
      "A private walled estate situated in the diplomatic enclave of Old Airport. Built with indigenous Ethiopian stone and warm teak, surrounding an internal courtyard oasis.",
    features: ["Walled Compound", "Diplomatic Security Standards", "Guest Pavilion", "Staff Quarters"],
  },
  {
    id: "haven-03",
    slug: "the-zenith-loft-kazanchis",
    title: "The Zenith Loft",
    neighborhood: "Kazanchis",
    city: "Addis Ababa",
    transactionType: "rent",
    priceFormatted: "$3,800 / mo",
    priceNote: "Furnished executive lease",
    bedrooms: 2,
    bathrooms: 2.5,
    areaSqm: 195,
    image: "/images/real-estate/kazanchis-loft.jpg",
    tag: "Executive Duplex",
    description:
      "Tailored for international executives and diplomats, this minimalist light-filled loft provides immediate proximity to UNECA and major embassies with floor-to-ceiling city views.",
    features: ["Bespoke Furnishing", "High-Speed Fiber", "24/7 Security", "Fitness Suite"],
  },
  {
    id: "haven-04",
    slug: "entoto-skyline-retreat",
    title: "Entoto Skyline Villa",
    neighborhood: "Yeka / Entoto",
    city: "Addis Ababa",
    transactionType: "sale",
    priceFormatted: "$890,000",
    priceNote: "Freehold ownership",
    bedrooms: 4,
    bathrooms: 5,
    areaSqm: 480,
    image: "/images/real-estate/entoto-retreat.jpg",
    tag: "Hillside Residence",
    description:
      "Nestled against the tranquil eucalyptus forest of the Entoto foothills, this architectural sanctuary offers pure air, dramatic vistas over the metropolitan basin, and timeless stone craft.",
    features: ["Panoramic Valley Views", "Solar Thermal System", "Wine Cellar", "Expansive Forest Grounds"],
  },
  {
    id: "haven-05",
    slug: "bole-medhanialem-residence",
    title: "The Medhanialem Suite",
    neighborhood: "Bole",
    city: "Addis Ababa",
    transactionType: "rent",
    priceFormatted: "$2,900 / mo",
    priceNote: "Inclusive of service charges",
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 240,
    image: "/images/real-estate/luxury-living-interior.jpg",
    tag: "Luxury Apartment",
    description:
      "Contemporary open-plan living steps from premier dining and retail avenues. Features acoustic double-glazing, gourmet kitchen with Miele appliances, and wrap-around balconies.",
    features: ["Acoustic Glazing", "Gourmet Kitchen", "Backup Generator", "Underground Parking"],
  },
  {
    id: "haven-06",
    slug: "bisrate-gabriel-manor",
    title: "Bisrate Gabriel Manor",
    neighborhood: "Bisrate Gabriel",
    city: "Addis Ababa",
    transactionType: "sale",
    priceFormatted: "$1,100,000",
    priceNote: "Negotiable",
    bedrooms: 5,
    bathrooms: 5.5,
    areaSqm: 560,
    image: "/images/real-estate/modern-villa-exterior.jpg",
    tag: "Family Compound",
    description:
      "A grand multi-level family residence with double-height reception halls, manicured perimeter gardens, and seamless indoor-outdoor entertaining spaces.",
    features: ["Manicured Gardens", "Double-Height Ceilings", "Smart Home Automation", "Private Gatehouse"],
  },
];
