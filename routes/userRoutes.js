const express = require('express');
const router = express.Router();
const { getLanding, getHome, getPackage, postBookPackage, getMyBookings, getPaymentPage, postConfirmPayment, getReceipt } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', getLanding);
router.get('/home', isAuthenticated, getHome);
router.get('/package/:id', isAuthenticated, getPackage);
router.post('/book/:id', isAuthenticated, postBookPackage);
router.get('/payment/:id', isAuthenticated, getPaymentPage);
router.post('/confirm-payment/:id', isAuthenticated, postConfirmPayment);
router.get('/receipt/:id', isAuthenticated, getReceipt);
router.get('/my-bookings', isAuthenticated, getMyBookings);

module.exports = router;
