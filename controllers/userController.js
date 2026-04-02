const TravelPackage = require('../models/TravelPackage');
const Booking = require('../models/Booking');

// @desc    Landing page
// @route   GET /
const getLanding = async (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    const packages = await TravelPackage.find().limit(3);
    res.render('pages/landing', { title: 'Welcome to Travel Agency', packages });
};

// @desc    Home page
// @route   GET /home
const getHome = async (req, res) => {
    const packages = await TravelPackage.find();
    res.render('pages/home', { title: 'Home - Explore Packages', packages });
};

// @desc    Package details
// @route   GET /package/:id
const getPackage = async (req, res) => {
    try {
        const travelPackage = await TravelPackage.findById(req.params.id);
        if (!travelPackage) {
            req.flash('error', 'Package not found');
            return res.redirect('/home');
        }
        
        // Find existing bookings to know which seats are taken
        const bookings = await Booking.find({ packageId: req.params.id });
        let takenSeats = [];
        bookings.forEach(b => {
            takenSeats.push(...b.selectedSeats);
        });

        res.render('pages/package-details', { 
            title: travelPackage.title, 
            travelPackage,
            takenSeats: JSON.stringify(takenSeats)
        });
    } catch (error) {
        req.flash('error', 'Error fetching package');
        res.redirect('/home');
    }
};

// @desc    Book a package
// @route   POST /book/:id
const postBookPackage = async (req, res) => {
    try {
        const { selectedSeats } = req.body; // should be a comma separated string like "1,5,6"
        if (!selectedSeats) {
            req.flash('error', 'No seats selected');
            return res.redirect(`/package/${req.params.id}`);
        }

        const seatsArray = selectedSeats.split(',').map(Number);
        
        const travelPackage = await TravelPackage.findById(req.params.id);
        
        // Strict availability validation
        if (travelPackage.availableSeats < seatsArray.length) {
            req.flash('error', 'Not enough available seats');
            return res.redirect(`/package/${req.params.id}`);
        }

        // Strict collision validation based on requested seats vs actually paid bookings
        const existingPaidBookings = await Booking.find({ packageId: req.params.id, paymentStatus: 'Paid' });
        const existingTakenSeats = existingPaidBookings.reduce((acc, b) => acc.concat(b.selectedSeats), []);
        const hasSeatCollision = seatsArray.some(seat => existingTakenSeats.includes(seat));

        if (hasSeatCollision) {
            req.flash('error', 'One or more selected seats are already booked.');
            return res.redirect(`/package/${req.params.id}`);
        }

        const totalPrice = travelPackage.price * seatsArray.length;

        const booking = await Booking.create({
            userId: req.session.user._id,
            packageId: req.params.id,
            selectedSeats: seatsArray,
            totalPrice
        });

        // Redirect to payment page instead of deducting seats right away
        res.redirect(`/payment/${booking._id}`);
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/package/${req.params.id}`);
    }
};

// @desc    Payment Demo Page
// @route   GET /payment/:id
const getPaymentPage = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('packageId');
        if (!booking || booking.paymentStatus === 'Paid') {
            return res.redirect('/my-bookings');
        }
        res.render('pages/payment', { title: 'Secure Checkout', booking });
    } catch (error) {
        req.flash('error', 'Error loading payment');
        res.redirect('/home');
    }
};

// @desc    Confirm Payment
// @route   POST /confirm-payment/:id
const postConfirmPayment = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking || booking.paymentStatus === 'Paid') {
            return res.json({ success: false, message: 'Invalid or already paid booking' });
        }

        // Validate if seats were snatched while user was typing CC
        const confirmedBookings = await Booking.find({ packageId: booking.packageId, paymentStatus: 'Paid' });
        const takenSeats = confirmedBookings.reduce((acc, b) => acc.concat(b.selectedSeats), []);
        const hasCollision = booking.selectedSeats.some(seat => takenSeats.includes(seat));

        if (hasCollision) {
            booking.paymentStatus = 'Pending'; // Remains failed/pending
            await booking.save();
            return res.json({ success: false, message: 'Sorry! One or more of these seats were just booked by someone else during checkout.' });
        }

        const travelPackage = await TravelPackage.findById(booking.packageId);
        
        // Deduct seats securely
        travelPackage.availableSeats -= booking.selectedSeats.length;
        await travelPackage.save();

        booking.paymentStatus = 'Paid';
        await booking.save();

        res.json({ success: true, redirectUrl: `/receipt/${booking._id}` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// @desc    Receipt Page
// @route   GET /receipt/:id
const getReceipt = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('packageId').populate('userId');
        if (!booking || booking.paymentStatus !== 'Paid') {
            return res.redirect('/my-bookings');
        }
        res.render('pages/receipt', { title: 'Booking Receipt', booking });
    } catch (error) {
        req.flash('error', 'Error loading receipt');
        res.redirect('/home');
    }
};

// @desc    My Bookings page
// @route   GET /my-bookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.session.user._id })
                                      .populate('packageId')
                                      .sort({ bookingDate: -1 });
        res.render('pages/my-bookings', { title: 'My Bookings', bookings });
    } catch (error) {
        req.flash('error', 'Error fetching bookings');
        res.redirect('/home');
    }
};

module.exports = {
    getLanding,
    getHome,
    getPackage,
    postBookPackage,
    getPaymentPage,
    postConfirmPayment,
    getReceipt,
    getMyBookings
};
