const User = require('../models/User');

// @desc    Render login page
// @route   GET /login
const getLogin = (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('pages/login', { title: 'Login' });
};

// @desc    Handle login
// @route   POST /login
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            req.session.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            req.flash('success', 'You are now logged in');
            res.redirect('/');
        } else {
            req.flash('error', 'Invalid credentials');
            res.redirect('/login');
        }
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/login');
    }
};

// @desc    Render signup page
// @route   GET /signup
const getSignup = (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('pages/signup', { title: 'Sign Up' });
};

// @desc    Handle signup
// @route   POST /signup
const postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            req.flash('error', 'User already exists');
            return res.redirect('/signup');
        }

        const user = await User.create({
            name,
            email,
            password, // Role is 'user' by default
        });

        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        req.flash('success', 'Registration successful');
        res.redirect('/');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/signup');
    }
};

// @desc    Logout user
// @route   GET /logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};

module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    logout
};
