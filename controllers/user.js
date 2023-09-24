const User = require('../Models/user')
const Post = require("../Models/post");

const jwt = require('jsonwebtoken');

const secret = "ShivanshloveswoMen"

exports.handleUserSignup = async (req, res) => {//Await only works if async, generally requires try and catch if async is used
    const { fname, lname, email, pwd } = req.body;
    const alreadyExists = await User.findOne({ email });
    const cart = [];

    if (alreadyExists) return res.status(401).json({ error: 'Please Work' })
    const newUser = new User({ fname, lname, email, password: pwd, cart });

    await newUser.save();

    res.json(true);
};

exports.handleUserLogin = async (req, res) => {//Await only works if async, generally requires try and catch if async is used
    const { email, pwd } = req.body;
    const user = await User.findOne({ email, password: pwd });
    if (!user) res.json(false)
    else {
        const payload = { email: email };
        const token = jwt.sign(payload, secret, { expiresIn: '30d' });
        res.json({ token: token });
    }
};

exports.getCart = async (req, res) => { //Flexible Route
    var email = null;
    const token = req.headers['token'];
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            // Token verification failed
            console.log("response fail");
            return res.status(403).json({ response: 'Token verification failed' });
        }
        email = payload.email; // Add the username to the request object
    });
    const user = await User.find({ email: email })

    res.json({
        id: user[0]._id,
        cart: user[0].cart,
    });
};

exports.updateCartAndBooks = async (req, res) => {//Await only works if async, generally requires try and catch if async is used
    const { title } = req.query;
    var email = null;
    const token = req.headers['token'];
    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            // Token verification failed
            console.log("response fail");
            return res.status(403).json({ response: 'Token verification failed' });
        }
        email = payload.email; // Add the username to the request object
    });
    const user = await User.find({ email: email });
    const book = await Post.find({ title: title });

    user[0].cart.push(book[0]);
    book[0].number = book[0].number - 1; 

    await User.findByIdAndUpdate(user[0]._id, {cart: user[0].cart});
    await Post.findByIdAndUpdate(book[0]._id, {number: book[0].number});

    res.json("Done");
};