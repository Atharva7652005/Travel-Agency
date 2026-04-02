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
