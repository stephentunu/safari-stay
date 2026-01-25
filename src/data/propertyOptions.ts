// Board Types
export const BOARD_TYPES = [
  { value: "fully_board", label: "Fully Board (Breakfast + Lunch + Supper)" },
  { value: "half_board", label: "Half Board (Breakfast/Lunch + Supper)" },
  { value: "standard", label: "Standard (Supper Only)" },
];

// Room Categories with sub-types
export const ROOM_CATEGORIES = [
  { value: "junior_executive_deluxe", label: "Junior Executive Deluxe", tier: "Executive" },
  { value: "executive_standard", label: "Executive Standard", tier: "Executive" },
  { value: "superior_deluxe", label: "Superior Deluxe", tier: "Executive" },
  { value: "standard", label: "Standard Room", tier: "Standard" },
  { value: "economy", label: "Economy Room", tier: "Economy" },
];

// Bed Types
export const BED_TYPES = [
  { value: "single", label: "Single Bed" },
  { value: "double", label: "Double Bed" },
  { value: "twin", label: "Twin Beds" },
  { value: "king", label: "King Size Bed" },
  { value: "queen", label: "Queen Size Bed" },
];

export const NEARBY_ATTRACTIONS = [
  "Library",
  "Museum",
  "Game Park/Reserve",
  "Police Station",
  "Fire Station",
  "Hospital/Clinic",
  "University",
  "River/Lake",
  "Island",
  "Mountain",
  "Airport",
  "Port",
  "Railway Station",
  "Forest",
  "Shopping Mall",
  "Beach",
  "National Park",
  "Cultural Center",
  "Sports Stadium",
  "Convention Center",
];

export const TRANSPORT_MODES = [
  "Waterbus/Ferry",
  "Taxi",
  "Matatu",
  "Railway/SGR",
  "Boda Boda (Motorcycle)",
  "Tuk Tuk",
  "Bus",
  "Uber/Bolt",
  "Shuttle Service",
  "Car Rental",
  "Bicycle Rental",
  "Walking Distance",
  "Airport Shuttle",
  "Hotel Pickup",
];

export const IMAGE_LABELS = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Parking Lot",
  "Garden/Outdoor",
  "Pool",
  "Balcony/Terrace",
  "Reception/Lobby",
  "Restaurant",
  "Gym/Fitness",
  "Conference Room",
  "Spa",
  "Rooftop",
  "Exterior View",
];

export const PROPERTY_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "guesthouse", label: "Guest House" },
  { value: "airbnb", label: "Airbnb" },
  { value: "rental", label: "Rental" },
  { value: "resort", label: "Resort" },
  { value: "motel", label: "Motel" },
  { value: "restaurant", label: "Restaurant" },
];
