import { Product, Testimonial } from './types';

// Let's import the actual generated high-quality images.
// We'll write the hardcoded string paths directly to ensure they work fine
export const HERO_SHOE_PATH = '/src/assets/images/hero_shoe_1780128522667.png';
export const ORANGE_SNEAKER_PATH = '/src/assets/images/orange_sneaker_1780128545824.png';
export const BLACK_BOOT_PATH = '/src/assets/images/black_boot_1780128564578.png';
export const CLASSIC_MINIMALIST_PATH = '/src/assets/images/classic_minimalist_1780129608853.png';
export const RIFT_ROVER_SLIDE_PATH = '/src/assets/images/rift_rover_slide_1780129571296.png';
export const HYDRO_SHIELD_BACKPACK_PATH = '/src/assets/images/hydro_shield_backpack_1780129590019.png';
export const KINETIC_FLARE_PATH = '/src/assets/images/kinetic_flare_1780130198804.png';
export const PASTEL_SWIFT_WALK_PATH = '/src/assets/images/pastel_swift_walk_1780130218179.png';
export const TRAIL_BLAZER_RUNNER_PATH = '/src/assets/images/trail_blazer_runner_1780130960477.png';
export const DESERT_BREEZE_BOOT_PATH = '/src/assets/images/desert_breeze_boot_1780130976572.png';
export const COASTAL_OASIS_SANDAL_PATH = '/src/assets/images/coastal_oasis_sandal_1780130994496.png';
export const AEROSTRIDE_CAP_PATH = '/src/assets/images/aerostride_cap_1780131010881.png';
export const RETRO_SUEDE_CASUAL_PATH = '/src/assets/images/retro_suede_casual_1780131028979.png';
export const URBAN_STEALTH_SNEAKER_PATH = '/src/assets/images/urban_stealth_sneaker_1780131051726.png';

export const CATEGORIES = [
  { id: 'Sneakers', name: 'Sneakers', count: 12, icon: 'Zap' },
  { id: 'Running', name: 'Running', count: 8, icon: 'Activity' },
  { id: 'Casual', name: 'Casual', count: 14, icon: 'Compass' },
  { id: 'Boots', name: 'Boots', count: 6, icon: 'ShieldAlert' },
  { id: 'Sandals', name: 'Sandals', count: 7, icon: 'Sun' },
  { id: 'Accessories', name: 'Accessories', count: 15, icon: 'ShoppingBag' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'sb-01',
    name: 'Shoebaru Apex-X "Nairobi Edition"',
    category: 'Running',
    price: 12450,
    originalPrice: 15900,
    rating: 4.9,
    reviewsCount: 142,
    image: HERO_SHOE_PATH,
    tag: 'Limited',
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: false,
    isSale: true,
    description: 'Our flagship carbon-plate runner. Custom-engineered for record-breaking speed under Nairobi altitude. Ultra-breathable mesh outer with futuristic neon-orange propulsion sole.',
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['#FF5722', '#000000', '#FFFFFF']
  },
  {
    id: 'sb-02',
    name: 'Shoebaru Lava Glider v4',
    category: 'Running',
    price: 8900,
    rating: 4.8,
    reviewsCount: 94,
    image: ORANGE_SNEAKER_PATH,
    tag: 'New',
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: 'Comfort designed for long-distance cruising. Employs our proprietary OrangeForce foam midsole tech that offers a full cushion bounce back with every step.',
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ['#FF7043', '#374151', '#ECEFF1']
  },
  {
    id: 'sb-03',
    name: 'Shoebaru Rift-Valley Outlaw',
    category: 'Boots',
    price: 14500,
    rating: 4.9,
    reviewsCount: 56,
    image: BLACK_BOOT_PATH,
    tag: 'Hot',
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: false,
    isSale: false,
    description: 'Adventure-proof premium leather tactical boot with customized orange reinforcing stitching. Fully waterproof lining with deep multi-directional lugs optimized for rugged trail treks.',
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: ['#111827', '#4B5563', '#9CA3AF']
  },
  {
    id: 'sb-04',
    name: 'Shoebaru Kinetic Flare',
    category: 'Sneakers',
    price: 9200,
    originalPrice: 11500,
    rating: 4.7,
    reviewsCount: 88,
    image: KINETIC_FLARE_PATH,
    tag: 'Sale',
    isBestSeller: false,
    isFeatured: false,
    isNewArrival: false,
    isSale: true,
    description: 'High-concept street fashion sneaker with red-hot styling structure. Premium mesh underlays and suede overlays make this a timeless lifestyle aesthetic piece.',
    sizes: [37, 38, 39, 40, 41, 42, 43],
    colors: ['#EF4444', '#111827', '#F3F4F6']
  },
  {
    id: 'sb-05',
    name: 'Shoebaru Pastel Swift-Walk',
    category: 'Sneakers',
    price: 7800,
    rating: 4.6,
    reviewsCount: 61,
    image: PASTEL_SWIFT_WALK_PATH,
    tag: 'Trending',
    isBestSeller: false,
    isFeatured: false,
    isNewArrival: true,
    isSale: false,
    description: 'Chic urban wear with a combination of pastel vibes and dynamic energy. Extra heel support for dynamic day-long walking convenience.',
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ['#E0B0FF', '#FFDFD3', '#E0F2FE']
  },
  {
    id: 'sb-06',
    name: 'Shoebaru Classic Minimalist',
    category: 'Casual',
    price: 6500,
    rating: 4.5,
    reviewsCount: 110,
    image: CLASSIC_MINIMALIST_PATH,
    tag: '',
    isBestSeller: true,
    isFeatured: false,
    isNewArrival: false,
    isSale: false,
    description: 'Clean, understated white casual sneakers that pair beautifully with anything. Made from high-grade recycled canvas materials and vulcanized rubber sole.',
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ['#FFFFFF', '#D1D5DB', '#1F2937']
  },
  {
    id: 'sb-07',
    name: 'Shoebaru Rift Rover Slide',
    category: 'Sandals',
    price: 3400,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 75,
    image: RIFT_ROVER_SLIDE_PATH,
    tag: 'Sale',
    isBestSeller: false,
    isFeatured: false,
    isNewArrival: false,
    isSale: true,
    description: 'Extremely soft ergonomic sandals built for coastal rest and post-run thermal cooling. Deep footbed indentation provides instant pressure relief.',
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ['#1F2937', '#D1D5DB', '#F97316']
  },
  {
    id: 'sb-08',
    name: 'Shoebaru Hydro-Shield Backpack',
    category: 'Accessories',
    price: 5200,
    rating: 4.7,
    reviewsCount: 39,
    image: HYDRO_SHIELD_BACKPACK_PATH,
    tag: 'New',
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: 'Weatherproof high-capacity workout gear backpack. Includes a separate breathable bottom compartment for storing running shoes securely.',
    sizes: [0], // N/A for bags
    colors: ['#111827', '#F97316']
  },
  {
    id: 'sb-09',
    name: 'Shoebaru Trail Blazer x1',
    category: 'Running',
    price: 9800,
    rating: 4.9,
    reviewsCount: 42,
    image: TRAIL_BLAZER_RUNNER_PATH,
    tag: 'Rugged',
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: 'A rugged outdoor trail running shoe featuring high-grade aggressive mud-shedding tread lugs, custom carbon protective plate, and water-repellent design.',
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['#2E7D32', '#F97316', '#111827']
  },
  {
    id: 'sb-10',
    name: 'Shoebaru Desert Breeze Boot',
    category: 'Boots',
    price: 11500,
    rating: 4.8,
    reviewsCount: 31,
    image: DESERT_BREEZE_BOOT_PATH,
    tag: 'Hot',
    isBestSeller: true,
    isFeatured: false,
    isNewArrival: true,
    isSale: false,
    description: 'Chic mid-rise outdoor desert tactical boot in premium sand-colored suede, engineered with microvent panels for active foot ventilation.',
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['#D2B48C', '#FFFFFF', '#F97316']
  },
  {
    id: 'sb-11',
    name: 'Shoebaru Coastal Oasis Sandal',
    category: 'Sandals',
    price: 4500,
    originalPrice: 5200,
    rating: 4.7,
    reviewsCount: 28,
    image: COASTAL_OASIS_SANDAL_PATH,
    tag: 'Sale',
    isBestSeller: false,
    isFeatured: true,
    isNewArrival: false,
    isSale: true,
    description: 'High-traction outdoor strap sandal with custom orange webbed straps. Handcrafted soft footbed ensures ultimate non-slip amphibious convenience.',
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ['#111827', '#F97316']
  },
  {
    id: 'sb-12',
    name: 'Shoebaru Aerostride Cap',
    category: 'Accessories',
    price: 2800,
    rating: 4.6,
    reviewsCount: 48,
    image: AEROSTRIDE_CAP_PATH,
    tag: 'Essential',
    isBestSeller: true,
    isFeatured: false,
    isNewArrival: true,
    isSale: false,
    description: 'Ultralight waterproof performance cap with laser-carved mesh airflows, finished with high-contrast reflective orange safety branding logo.',
    sizes: [0],
    colors: ['#111827', '#F97316']
  },
  {
    id: 'sb-13',
    name: 'Shoebaru Retro Suede Classic',
    category: 'Casual',
    price: 8200,
    originalPrice: 9500,
    rating: 4.7,
    reviewsCount: 65,
    image: RETRO_SUEDE_CASUAL_PATH,
    tag: 'Retro',
    isBestSeller: false,
    isFeatured: false,
    isNewArrival: false,
    isSale: true,
    description: 'Sophisticated vintage blue suede leather sneaker built for ultimate versatility. Complemented with responsive spring-back cream outsoles.',
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['#1E3A8A', '#F97316', '#F5F5DC']
  },
  {
    id: 'sb-14',
    name: 'Shoebaru Urban Stealth Sneaker',
    category: 'Sneakers',
    price: 10500,
    rating: 4.9,
    reviewsCount: 77,
    image: URBAN_STEALTH_SNEAKER_PATH,
    tag: 'Trending',
    isBestSeller: true,
    isFeatured: true,
    isNewArrival: true,
    isSale: false,
    description: 'High-concept urban streetwear runner sporting multi-contoured panels in stealth deep black and high-impact reactive neon-orange elements.',
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ['#111827', '#F97316', '#FFFFFF']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Faith Kiptoo',
    role: 'Marathon Trainer',
    location: 'Eldoret, Ke',
    rating: 5,
    comment: 'The kinetic propulsion plate in the Shoebaru Nairobi Edition is absolutely insane. Decreased my split times immediately. High-quality support combined with stunning design!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't-2',
    name: 'Benson Mwangi',
    role: 'Creative Director',
    location: 'Nairobi, Ke',
    rating: 5,
    comment: 'Instant purchase via M-Pesa. Standard delivery to Westlands took under 4 hours! The lava glider comfort is matching premium high-street sneaker brands easily.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 't-3',
    name: 'Kevin Ochieng',
    role: 'Outdoor Adventurer',
    location: 'Mombasa, Ke',
    rating: 5,
    comment: 'Hiked through Mount Longonot and Naivasha wearing the Rift Valley Outlaw. Totally waterproof, didn’t get a single blister, and the local design elements are beautiful.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
  }
];
