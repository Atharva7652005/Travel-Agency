const TravelPackage = require('../models/TravelPackage');
const Booking = require('../models/Booking');

// @desc    Admin dashboard
// @route   GET /admin/dashboard
const getDashboard = async (req, res) => {
    try {
        const packages = await TravelPackage.find().sort('-date');
        const bookings = await Booking.find().populate('userId').populate('packageId').sort('-bookingDate');
        res.render('admin/dashboard', { title: 'Admin Dashboard', packages, bookings });
    } catch (error) {
        req.flash('error', 'Error loading dashboard');
        res.redirect('/');
    }
};

// @desc    Add Package page
// @route   GET /admin/add-package
const getAddPackage = (req, res) => {
    res.render('admin/add-package', { title: 'Add Package' });
};

// @desc    Handle add package
// @route   POST /admin/add-package
const postAddPackage = async (req, res) => {
    try {
        const { title, description, price, totalSeats, date, image } = req.body;
        
        await TravelPackage.create({
            title,
            description,
            price,
            totalSeats,
            availableSeats: totalSeats,
            date,
            image,
            createdBy: req.session.user._id
        });

        req.flash('success', 'Travel package added successfully');
        res.redirect('/admin/dashboard');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/admin/add-package');
    }
};

// @desc    Delete Package
// @route   POST /admin/delete/:id
const deletePackage = async (req, res) => {
    try {
        await TravelPackage.findByIdAndDelete(req.params.id);
        // Optional: Also delete related bookings
        await Booking.deleteMany({ packageId: req.params.id });

        req.flash('success', 'Package deleted successfully');
        res.redirect('/admin/dashboard');
    } catch (error) {
        req.flash('error', 'Error deleting package');
        res.redirect('/admin/dashboard');
    }
};

module.exports = {
    getDashboard,
    getAddPackage,
    postAddPackage,
    deletePackage
};
