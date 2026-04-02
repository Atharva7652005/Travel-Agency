const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.flash('error', 'Please log in to access this page.');
    res.redirect('/login');
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'Not authorized as an admin.');
    res.redirect('/');
};

module.exports = {
    isAuthenticated,
    isAdmin
};
