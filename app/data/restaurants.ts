export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  img: string;
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Restaurant = {
  id: string;
  name: string;
  location: string;
  address: string;
  mapUrl: string;
  cover: string;
  description: string;
  menu: MenuItem[];
  reviews: Review[];
  openingSoon?: boolean; // Added this property
};

export const restaurants: Restaurant[] = [
  {
    id: 'jvc',
    name: 'Tahera Restaurant JVC',
    location: 'Jumeirah Village Circle',
    address: 'Shop 2, Building 27, JVC District 14, Jumeirah Village Circle, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=Tahera+Restaurant+JVC,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600',
    description: 'Our vibrant neighborhood branch in the heart of JVC, offering authentic comfort food and an inviting family atmosphere.',
    menu: [
      { name: 'Downtown Royal Biryani', desc: 'Fragrant basmati rice with tender chicken and aromatic spices.', price: 'AED 85', img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600' },
      { name: 'Truffle Naan Basket',    desc: 'Freshly baked naan brushed with truffle butter.',                price: 'AED 35', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600' },
      { name: 'Mutton Karahi',          desc: 'Slow-cooked mutton in rich tomato and ginger gravy.',            price: 'AED 75', img: 'https://images.unsplash.com/photo-1601728902047-9f6674971c26?auto=format&fit=crop&q=80&w=600' },
      { name: 'Mixed Grill Platter',    desc: 'Assorted kebabs, tikka, and seekh with mint chutney.',           price: 'AED 95', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600' },
    ],
    reviews: [
      { author: 'Sara M.',    rating: 5, text: 'Absolutely stunning interior and the Biryani is life-changing!', date: 'May 2025' },
      { author: 'Ahmed K.',   rating: 4, text: 'Great food, friendly staff. Will definitely return.',            date: 'Apr 2025' },
    ],
  },
  {
    id: 'port-saeed',
    name: 'Tahera Restaurant Port Saeed',
    location: 'Port Saeed, Dubai',
    address: 'Port Saeed Road, Near Deira City Centre, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=Tahera+Restaurant+Port+Saeed,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600',
    description: 'A premium dining destination in Port Saeed, famous for its riverside ambiance and authentic Pakistani cuisine.',
    menu: [
      { name: 'Nihari Special',        desc: 'Slow-braised beef shank in rich spiced gravy, served with naan.',   price: 'AED 65', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600' },
      { name: 'Haleem Bowl',           desc: 'Thick lentil and wheat porridge with tender lamb.',                 price: 'AED 45', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
      { name: 'Paya Soup',             desc: 'Traditional trotters soup slow-cooked overnight.',                  price: 'AED 55', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600' },
      { name: 'Chapli Kebab',          desc: 'Minced beef patties with herbs, pan-fried to perfection.',          price: 'AED 50', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600' },
    ],
    reviews: [
      { author: 'Khalid R.', rating: 5, text: 'Best Nihari in all of Dubai. Authentic and hearty.',  date: 'Jun 2025' },
      { author: 'Priya S.',  rating: 4, text: 'Loved the ambiance and the Haleem was outstanding.',   date: 'May 2025' },
    ],
  },
  {
    id: 'arjan',
    name: 'Tahera Restaurant Arjan',
    location: 'Arjan, Dubai',
    address: 'Arjan Community, Dubailand, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=Tahera+Restaurant+Arjan,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=1600',
    description: 'A beautifully modern dining space in Arjan with rich flavors and perfect mood lighting for dinner dates.',
    menu: [
      { name: 'Seafood Platter',   desc: 'Grilled prawns, calamari, and hammour with garlic sauce.',   price: 'AED 145', img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=600' },
      { name: 'Grilled Hammour',   desc: 'Whole hammour marinated in Emirati spices and grilled.',      price: 'AED 95',  img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600' },
      { name: 'Arabic Mixed Grill',desc: 'Premium shish tawook, lamb chops, and kofta.',                price: 'AED 120', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600' },
      { name: 'Mandi Rice',        desc: 'Slow-cooked lamb over saffron-infused basmati rice.',         price: 'AED 85',  img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600' },
    ],
    reviews: [
      { author: 'Faisal K.', rating: 5, text: 'Best seafood grill in the area. Highly recommend!',     date: 'Jun 2025' },
      { author: 'Nadia A.',  rating: 5, text: 'The ambiance is magical. Perfect for date night.',      date: 'May 2025' },
    ],
  },
  {
    id: 'meena',
    name: 'Tahera Restaurant Meena Bazaar',
    location: 'Meena Bazaar, Bur Dubai',
    address: 'Meena Bazaar Street, Bur Dubai, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=Tahera+Restaurant+Meena+Bazaar,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1600',
    description: 'Experience the bustling old Dubai street food culture with our aromatic curries and traditional charcoal grills.',
    menu: [
      { name: 'Special Karahi',         desc: 'Chicken karahi cooked in iron wok with tomatoes and green chilli.', price: 'AED 75', img: 'https://images.unsplash.com/photo-1601728902047-9f6674971c26?auto=format&fit=crop&q=80&w=600' },
      { name: 'Peshawari Charsi Tikka', desc: 'Bone-in chicken pieces marinated and cooked on charcoal.',           price: 'AED 65', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600' },
      { name: 'Seekh Kebab',            desc: 'Spiced minced meat skewers fresh off the grill.',                    price: 'AED 45', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600' },
      { name: 'Tawa Roti Basket',       desc: 'Fresh hand-rolled tawa rotis, served hot.',                          price: 'AED 15', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600' },
    ],
    reviews: [
      { author: 'Elena R.',   rating: 5, text: 'The Charsi Tikka was incredibly tender. Real charcoal taste!', date: 'Jun 2025' },
      { author: 'Imran T.',   rating: 5, text: 'Feels like home cooking. The karahi is unmatched.',             date: 'Apr 2025' },
    ],
  },
  {
    id: 'bur-dubai',
    name: 'Tahera Restaurant Bur Dubai',
    location: 'Bur Dubai',
    address: 'Khalid Bin Walid Road, Bur Dubai, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=Tahera+Restaurant+Bur+Dubai,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1600',
    description: 'Our Bur Dubai branch is a local favourite serving hearty portions of classic Pakistani and Emirati dishes.',
    menu: [
      { name: 'Classic Mutton Pulao', desc: 'Fragrant rice slow-cooked with tender mutton pieces.',            price: 'AED 55', img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600' },
      { name: 'Daal Makhani',         desc: 'Black lentils simmered overnight with butter and cream.',          price: 'AED 35', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
      { name: 'Shahi Paneer',         desc: 'Cottage cheese in rich saffron cream sauce.',                      price: 'AED 45', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600' },
      { name: 'Lassi (Sweet/Salted)', desc: 'Traditional churned yogurt drink, chilled and refreshing.',        price: 'AED 18', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600' },
    ],
    reviews: [
      { author: 'Tariq H.',  rating: 5, text: 'Pulao is legendary here. My weekly spot.',          date: 'May 2025' },
      { author: 'Deepa M.',  rating: 4, text: 'Daal Makhani rivals the best I have had in India.', date: 'Mar 2025' },
    ],
  },
  {
    id: 'tgrills-jvc',
    name: 'T Grills Cafe & Rest. JVC',
    location: 'Jumeirah Village Circle',
    address: 'Ground Floor, Circle Mall, JVC, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=T+Grills+Cafe+and+Restaurant+JVC,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600',
    description: 'T Grills is our cafe-style grill concept inside Circle Mall JVC — fast, casual, and packed with bold flavors.',
    menu: [
      { name: 'T-Grill Signature Burger', desc: 'Double smash patty, special sauce, pickled onions.',         price: 'AED 55', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600' },
      { name: 'Crispy Chicken Wrap',      desc: 'Fried chicken, coleslaw, sriracha mayo in a toasted wrap.',   price: 'AED 42', img: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=600' },
      { name: 'Loaded Fries',             desc: 'Crispy fries topped with cheese, jalapeños, and sauce.',      price: 'AED 30', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600' },
      { name: 'Grilled Chicken Platter',  desc: 'Half chicken marinated in T-Grills house spice blend.',       price: 'AED 65', img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600' },
    ],
    reviews: [
      { author: 'Ryan B.',   rating: 5, text: 'Best smash burger in JVC! The loaded fries are addictive.',  date: 'Jun 2025' },
      { author: 'Layla F.',  rating: 4, text: 'Quick service, great flavors. Perfect for a lunch run.',     date: 'May 2025' },
    ],
  },
  {
    id: 'tgrills-marjan',
    name: 'T Grill Restaurant Marjan',
    location: 'Al Marjan Island, Ras Al Khaimah',
    address: 'Al Marjan Island Boulevard, Ras Al Khaimah',
    mapUrl: 'https://maps.google.com/maps?q=Al+Marjan+Island,+Ras+Al+Khaimah&output=embed',
    cover: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1600',
    description: 'Our island escape. T Grill Marjan brings sizzling grills and fresh seafood to the beautiful shores of Al Marjan Island.',
    menu: [],
    reviews: [],
    openingSoon: true // Coming Soon Flag!
  },
  {
    id: 'production-city',
    name: 'Tahera Dubai Production City',
    location: 'Dubai Production City',
    address: 'IMPZ, Dubai Production City, Dubai',
    mapUrl: 'https://maps.google.com/maps?q=Dubai+Production+City,+Dubai&output=embed',
    cover: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?auto=format&fit=crop&q=80&w=1600',
    description: 'The go-to spot for media professionals and corporate teams. Fast, hearty meals that fuel a busy workday.',
    menu: [],
    reviews: [],
    openingSoon: true // Coming Soon Flag!
  },
];