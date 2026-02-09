import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Package {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  price: string;
  image: string;
  featured: boolean;
}

export interface Destination {
  id: string;
  name: string;
  category: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  trip: string;
  rating: number;
  text: string;
  image: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  tripType: string;
  travelMonth: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed';
  date: string;
}

interface AdminState {
  isAuthenticated: boolean;
  adminUser: { username: string; email: string } | null;
  packages: Package[];
  destinations: Destination[];
  testimonials: Testimonial[];
  bookings: Booking[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addPackage: (pkg: Omit<Package, 'id'>) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  addDestination: (dest: Omit<Destination, 'id'>) => void;
  updateDestination: (id: string, dest: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  deleteBooking: (id: string) => void;
}

// Default data
const defaultPackages: Package[] = [
  {
    id: '1',
    title: '7 Days Shira Route',
    category: 'Climbing',
    duration: '7 Days',
    description: 'A scenic and less frequented route approaching Kilimanjaro\'s peak across the Shira Plateau. Experience high altitude wilderness.',
    price: '$2,850',
    image: '/images/kilimanjaro_summit.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Northern Circuit & Zanzibar',
    category: 'Safari & Beach',
    duration: '11 Days',
    description: 'The ultimate 11-day adventure exploring Tarangire, Serengeti, Ngorongoro, and Lake Manyara, followed by relaxation on Zanzibar\'s pristine beaches.',
    price: '$4,200',
    image: '/images/zanzibar_beach.jpg',
    featured: true,
  },
  {
    id: '3',
    title: 'Great Migration Safari',
    category: 'Safari',
    duration: '7 Days',
    description: 'Witness the world\'s largest mammal migration with over 1.5 million wildebeest, zebras, and gazelles crossing the vast plains.',
    price: '$3,500',
    image: '/images/wildebeest_migration.jpg',
    featured: true,
  },
];

const defaultDestinations: Destination[] = [
  {
    id: '1',
    name: 'Serengeti National Park',
    category: 'National Park',
    duration: '3-7 Days',
    description: 'World\'s most famous wildlife sanctuary and UNESCO World Heritage Site. Home to the Great Wildebeest Migration and Africa\'s Big Five.',
    highlights: ['Big Five', 'Great Migration', 'UNESCO Site', 'Hot Air Balloon'],
    image: '/images/wildebeest_migration.jpg',
    featured: true,
  },
  {
    id: '2',
    name: 'Mount Kilimanjaro',
    category: 'Mountain Climbing',
    duration: '5-9 Days',
    description: 'Conquer Africa\'s highest mountain and one of the Seven Summits. Experience diverse ecosystems from rainforest to arctic summit.',
    highlights: ['Seven Summits', '5,895m Peak', 'Multiple Routes', 'UNESCO Site'],
    image: '/images/kilimanjaro_summit.jpg',
    featured: true,
  },
  {
    id: '3',
    name: 'Ngorongoro Crater',
    category: 'Conservation Area',
    duration: '2-3 Days',
    description: 'Descend into this natural amphitheater to witness the densest population of wildlife in Africa, including the Big Five.',
    highlights: ['Big Five', 'Volcanic Caldera', 'UNESCO Site', 'High Density Wildlife'],
    image: '/images/crater_landscape.jpg',
    featured: true,
  },
  {
    id: '4',
    name: 'Zanzibar Beach',
    category: 'Island Paradise',
    duration: '4-6 Days',
    description: 'Pristine beaches, spice tours, and rich cultural heritage. The perfect way to end your safari adventure.',
    highlights: ['White Sand Beaches', 'Spice Tours', 'Stone Town', 'Diving & Snorkeling'],
    image: '/images/zanzibar_beach.jpg',
    featured: true,
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Robert Johnson',
    trip: 'Great Migration Safari',
    rating: 5,
    text: 'Our 7-day Great Migration safari was absolutely phenomenal! We witnessed thousands of wildebeest crossing the Mara River and saw all the Big Five.',
    image: '',
  },
  {
    id: '2',
    name: 'Michael Chen',
    trip: 'Kilimanjaro Summit',
    rating: 5,
    text: 'Climbing Kilimanjaro with Triple Lions was the adventure of a lifetime! The Machame route was challenging but our experienced guides made it safe.',
    image: '',
  },
  {
    id: '3',
    name: 'Emily & David Thompson',
    trip: 'Bush to Beach Safari',
    rating: 5,
    text: 'The Bush to Beach package was perfect! Starting with incredible wildlife in Serengeti and ending with relaxation in Zanzibar.',
    image: '',
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminUser: null,
      packages: defaultPackages,
      destinations: defaultDestinations,
      testimonials: defaultTestimonials,
      bookings: [],

      login: (username: string, password: string) => {
        // Simple authentication - in production, this should be server-side
        if (username === 'admin' && password === 'triplelions2025') {
          set({
            isAuthenticated: true,
            adminUser: { username: 'admin', email: 'admin@triplelions.com' },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          adminUser: null,
        });
      },

      addPackage: (pkg) => {
        const newPackage = { ...pkg, id: Date.now().toString() };
        set((state) => ({
          packages: [...state.packages, newPackage],
        }));
      },

      updatePackage: (id, pkg) => {
        set((state) => ({
          packages: state.packages.map((p) =>
            p.id === id ? { ...p, ...pkg } : p
          ),
        }));
      },

      deletePackage: (id) => {
        set((state) => ({
          packages: state.packages.filter((p) => p.id !== id),
        }));
      },

      addDestination: (dest) => {
        const newDestination = { ...dest, id: Date.now().toString() };
        set((state) => ({
          destinations: [...state.destinations, newDestination],
        }));
      },

      updateDestination: (id, dest) => {
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === id ? { ...d, ...dest } : d
          ),
        }));
      },

      deleteDestination: (id) => {
        set((state) => ({
          destinations: state.destinations.filter((d) => d.id !== id),
        }));
      },

      addTestimonial: (testimonial) => {
        const newTestimonial = { ...testimonial, id: Date.now().toString() };
        set((state) => ({
          testimonials: [...state.testimonials, newTestimonial],
        }));
      },

      updateTestimonial: (id, testimonial) => {
        set((state) => ({
          testimonials: state.testimonials.map((t) =>
            t.id === id ? { ...t, ...testimonial } : t
          ),
        }));
      },

      deleteTestimonial: (id) => {
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        }));
      },

      updateBookingStatus: (id, status) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        }));
      },

      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: 'triple-lions-admin',
    }
  )
);
