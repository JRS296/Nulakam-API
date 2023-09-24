const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    isbn13: {
        type: Number,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    edition: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    meta: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: "Admin",
        required: true,
        trim: true
        //ref: ''
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    slug: { //Important for SEO, and scalalbility (in case using API for web)
        type: String,
        required: true,
        trim: true,
        unique: true //Unique Posts only
    },
    image: { //Important for SEO, and scalalbility (in case using API for web)
        type: String,
        required: true,
    },
},
{
    timestamps: true, //Store created/updated time in DB
});

module.exports = mongoose.model('Post',bookSchema)