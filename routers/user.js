//Create a Router
const router = require('express').Router()
const { handleUserSignup, handleUserLogin, getCart, updateCartAndBooks } = require('../controllers/user');

router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);
router.post('/updateCartAndBooks', updateCartAndBooks)
router.get('/cart', getCart);


module.exports = router;