// lib/db/local-db.ts - Self-contained database for immediate demo
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'resideo-demo.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_sv TEXT,
    name_fr TEXT,
    description TEXT,
    description_sv TEXT,
    description_fr TEXT,
    address TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    city TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    country TEXT DEFAULT 'Sweden',
    property_type TEXT NOT NULL,
    size REAL,
    rooms REAL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    max_guests INTEGER NOT NULL,
    max_adults INTEGER NOT NULL,
    max_children INTEGER DEFAULT 0,
    max_infants INTEGER DEFAULT 0,
    base_price_per_night INTEGER NOT NULL,
    cleaning_fee INTEGER DEFAULT 0,
    currency TEXT DEFAULT 'SEK',
    min_stay_nights INTEGER DEFAULT 1,
    max_stay_nights INTEGER DEFAULT 29,
    status TEXT DEFAULT 'ACTIVE',
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS property_images (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    room TEXT,
    sort_order INTEGER DEFAULT 0,
    is_hero INTEGER DEFAULT 0,
    FOREIGN KEY (property_id) REFERENCES properties(id)
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    booking_number TEXT UNIQUE NOT NULL,
    property_id TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    check_in DATETIME NOT NULL,
    check_out DATETIME NOT NULL,
    total_nights INTEGER NOT NULL,
    adult_count INTEGER DEFAULT 1,
    child_count INTEGER DEFAULT 0,
    infant_count INTEGER DEFAULT 0,
    total_price INTEGER NOT NULL,
    currency TEXT DEFAULT 'SEK',
    status TEXT DEFAULT 'PENDING',
    guest_portal_token TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id)
  );

  CREATE TABLE IF NOT EXISTS corporate_enquiries (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    requirements TEXT,
    status TEXT DEFAULT 'NEW',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS marrakesh_waitlist (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    interested_in TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed demo data
const seedData = () => {
  const propertyCount = db.prepare('SELECT COUNT(*) as count FROM properties').get() as any;
  
  if (propertyCount.count === 0) {
    const insertProperty = db.prepare(`
      INSERT INTO properties (id, slug, name, name_sv, description, address, latitude, longitude, city, neighborhood, country, property_type, size, rooms, bedrooms, bathrooms, max_guests, max_adults, max_children, max_infants, base_price_per_night, cleaning_fee, currency, min_stay_nights, max_stay_nights, status, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Insert properties
    const properties = [
      {
        id: 'prop-1',
        slug: 'resideo-spanga-villa',
        name: 'Resideo Spånga Villa',
        nameSv: 'Resideo Spånga Villa',
        description: 'A beautiful family villa in Spånga, perfect for families and groups. Features 6 rooms, a large garden, and modern amenities including a fully equipped kitchen, workspace, and children\'s play area. Close to nature and public transport.',
        address: 'Stinsbacken 9, Spånga',
        lat: 59.3833,
        lng: 17.9000,
        city: 'Stockholm',
        neighborhood: 'Spånga',
        type: 'VILLA',
        size: 180,
        rooms: 6,
        bedrooms: 4,
        bathrooms: 2,
        maxGuests: 10,
        maxAdults: 8,
        maxChildren: 2,
        maxInfants: 1,
        price: 2495,
        cleaning: 800,
        featured: 1
      },
      {
        id: 'prop-2',
        slug: 'resideo-tulegatan-studio',
        name: 'Resideo Tulegatan Studio',
        nameSv: 'Resideo Tulegatan Studio',
        description: 'Modern studio apartment in Sundbyberg, ideal for solo travelers or couples. Fully equipped kitchen, comfortable sleeping area, and workspace. Close to public transport with easy access to Stockholm city center.',
        address: 'Tulegatan 12, Sundbyberg',
        lat: 59.3600,
        lng: 17.9700,
        city: 'Stockholm',
        neighborhood: 'Sundbyberg',
        type: 'STUDIO',
        size: 32,
        rooms: 1,
        bedrooms: 0,
        bathrooms: 1,
        maxGuests: 2,
        maxAdults: 2,
        maxChildren: 0,
        maxInfants: 0,
        price: 1295,
        cleaning: 500,
        featured: 0
      },
      {
        id: 'prop-3',
        slug: 'resideo-tulegatan-two',
        name: 'Resideo Tulegatan Two',
        nameSv: 'Resideo Tulegatan Tvåa',
        description: 'Spacious two-room apartment with separate bedroom, fully equipped kitchen, and dedicated workspace. Perfect for business travelers or couples wanting extra space.',
        address: 'Tulegatan 14, Sundbyberg',
        lat: 59.3602,
        lng: 17.9702,
        city: 'Stockholm',
        neighborhood: 'Sundbyberg',
        type: 'APARTMENT',
        size: 60,
        rooms: 2,
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 4,
        maxAdults: 3,
        maxChildren: 1,
        maxInfants: 1,
        price: 1795,
        cleaning: 600,
        featured: 1
      },
      {
        id: 'prop-4',
        slug: 'resideo-tulegatan-three',
        name: 'Resideo Tulegatan Three',
        nameSv: 'Resideo Tulegatan Trea',
        description: 'Large three-room apartment ideal for families or groups. Two separate bedrooms, spacious living area, modern kitchen, and balcony. Located in a quiet area with excellent amenities nearby.',
        address: 'Tulegatan 16, Sundbyberg',
        lat: 59.3605,
        lng: 17.9705,
        city: 'Stockholm',
        neighborhood: 'Sundbyberg',
        type: 'APARTMENT',
        size: 70,
        rooms: 3,
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 6,
        maxAdults: 4,
        maxChildren: 2,
        maxInfants: 1,
        price: 2195,
        cleaning: 700,
        featured: 0
      },
      {
        id: 'prop-5',
        slug: 'resideo-hallonbergen',
        name: 'Resideo Hallonbergen',
        nameSv: 'Resideo Hallonbergen',
        description: 'Well-appointed apartments in Hallonbergen. Multiple units available ranging from 1-3 rooms. All units feature modern furnishings, full kitchens, and are close to shopping and transport.',
        address: 'Hallonbergsplan 1, Sundbyberg',
        lat: 59.3750,
        lng: 17.9750,
        city: 'Stockholm',
        neighborhood: 'Hallonbergen',
        type: 'APARTMENT',
        size: 45,
        rooms: 2,
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 3,
        maxAdults: 2,
        maxChildren: 1,
        maxInfants: 0,
        price: 1495,
        cleaning: 550,
        featured: 0
      },
      {
        id: 'prop-6',
        slug: 'resideo-bromma',
        name: 'Resideo Bromma',
        nameSv: 'Resideo Bromma',
        description: 'Charming two-room apartment in Alvik, Bromma. Close to the water, beautiful walking paths, and excellent connections to the city center via metro and tram.',
        address: 'Alviksvägen 45, Bromma',
        lat: 59.3333,
        lng: 17.9833,
        city: 'Stockholm',
        neighborhood: 'Bromma',
        type: 'APARTMENT',
        size: 55,
        rooms: 2,
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 4,
        maxAdults: 3,
        maxChildren: 1,
        maxInfants: 1,
        price: 1695,
        cleaning: 600,
        featured: 1
      },
      {
        id: 'prop-7',
        slug: 'resideo-kallhall',
        name: 'Resideo Kallhäll',
        nameSv: 'Resideo Kallhäll',
        description: 'Comfortable apartments in Kallhäll, perfect for those wanting more space and nature. Close to the lake and commuter train station. Ideal for longer stays.',
        address: 'Kallhälls Station 2, Kallhäll',
        lat: 59.4500,
        lng: 17.8000,
        city: 'Stockholm',
        neighborhood: 'Kallhäll',
        type: 'APARTMENT',
        size: 65,
        rooms: 3,
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 5,
        maxAdults: 4,
        maxChildren: 2,
        maxInfants: 1,
        price: 1595,
        cleaning: 550,
        featured: 0
      }
    ];

    const insertMany = db.transaction(() => {
      for (const p of properties) {
        insertProperty.run(
          p.id, p.slug, p.name, p.nameSv, p.description,
          p.address, p.lat, p.lng, p.city, p.neighborhood,
          'Sweden', p.type, p.size, p.rooms, p.bedrooms,
          p.bathrooms, p.maxGuests, p.maxAdults, p.maxChildren,
          p.maxInfants, p.price, p.cleaning, 'SEK', 1, 29,
          'ACTIVE', p.featured
        );
      }
    });

    insertMany();
    console.log('✅ Demo data seeded successfully');
  }
};

seedData();

export { db };
export default db;
