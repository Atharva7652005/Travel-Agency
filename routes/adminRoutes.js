const express = require('express');
const router = express.Router();
const { getDashboard, getAddPackage, postAddPackage, deletePackage } = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

// All admin routes should go through the isAdmin middleware
router.use(isAdmin);

router.get('/dashboard', getDashboard);
router.route('/add-package')
    .get(getAddPackage)
    .post(postAddPackage);

router.post('/delete/:id', deletePackage);

module.exports = router;
