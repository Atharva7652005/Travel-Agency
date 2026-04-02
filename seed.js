require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const TravelPackage = require('./models/TravelPackage');
const Booking = require('./models/Booking');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL', error);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();
        
        await Booking.deleteMany();
        await TravelPackage.deleteMany();
        await User.deleteMany();

        // Admin User
        const adminUser = await User.create({
            name: "Admin",
            email: "admin@example.com",
            password: "password123", // Will be hashed by pre-save hook
            role: "admin"
        });

        // Test User
        const testUser = await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "user"
        });

        const packages = await TravelPackage.insertMany([
            {
                title: '7 Days in Maldives',
                description: 'Enjoy a luxurious week in the Maldives. Includes flights, a water villa, and food.',
                price: 125000,
                totalSeats: 30,
                availableSeats: 30,
                date: new Date('2026-10-15'),
                image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Backpacking through Europe',
                description: 'A 14-day train journey covering Paris, Berlin, Rome, and Barcelona.',
                price: 185000,
                totalSeats: 20,
                availableSeats: 20,
                date: new Date('2026-06-10'),
                image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Safari in Kenya',
                description: 'Witness the great migration. Guided tours and premium lodge accommodations included.',
                price: 145000,
                totalSeats: 12,
                availableSeats: 12,
                date: new Date('2026-08-05'),
                image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Royal Rajasthan Tour',
                description: 'Explore the majestic forts and palaces of Jaipur, Udaipur, and Jodhpur with luxury desert camps.',
                price: 45000,
                totalSeats: 25,
                availableSeats: 25,
                date: new Date('2026-11-12'),
                image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Kerala Backwaters Retreat',
                description: 'A 5-night relaxing escape in premium houseboats along the serene Alleppey backwaters.',
                price: 32000,
                totalSeats: 18,
                availableSeats: 18,
                date: new Date('2026-09-20'),
                image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Goa Beach Escapade',
                description: 'Experience the ultimate beach vibe in South Goa with luxury resorts and water sports.',
                price: 28000,
                totalSeats: 40,
                availableSeats: 40,
                date: new Date('2026-12-25'),
                image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Himalayan Adventure in Manali',
                description: '7 days of trekking, paragliding, and camping under the stars in the beautiful Solang Valley.',
                price: 38000,
                totalSeats: 20,
                availableSeats: 20,
                date: new Date('2026-05-15'),
                image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Mystical Meghalaya',
                description: 'Discover the living root bridges, crystal clear rivers, and the wettest place on Earth.',
                price: 42000,
                totalSeats: 15,
                availableSeats: 15,
                date: new Date('2026-10-05'),
                image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Spiritual Varanasi & Ganga Ghats',
                description: 'A deeply spiritual journey experiencing the Ganga Aarti and the ancient temples of Kashi.',
                price: 22000,
                totalSeats: 30,
                availableSeats: 30,
                date: new Date('2026-11-01'),
                image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
                createdBy: adminUser._id
            },
            {
                title: 'Andaman Scuba & Island Hop',
                description: 'Crystal clear waters, coral reefs, and pristine beaches in Havelock and Neil islands.',
                price: 65000,
                totalSeats: 24,
                availableSeats: 24,
                date: new Date('2026-02-14'),
                image: 'https://images.unsplash.com/photo-1589552197143-a61b8f58bfaa?w=800&q=80',
                createdBy: adminUser._id
            }
        ]);

        // console.log('Data Imported - Seeding complete!');
        // console.log('--- Credentials ---');
        // console.log('Admin: admin@example.com / password123');
        // console.log('User: john@example.com / password123');
        process.exit();

    } catch (error) {
        console.error('Error importing data', error);
        process.exit(1);
    }
};

importData();
