//Create a Router
const router = require('express').Router()

const { createPost, deletePost, updatePost, getPost, getPostsTag, getPosts, searchPost, getRelatedPosts, uploadImage, getTrash } = require("../controllers/post"); //CRUD
const { postValidator, validate } = require('../middleware/postValidator');
const { parseData } = require('../middleware/ParserForTagsFeatured');
const multer = require("../middleware/multer");
const bodyParser = require('body-parser');


//CRUD Operations - Book
//Create Route
router.post('/create',
    // parseData,
    postValidator,
    validate,
    createPost);

//Read Route(s)
router.get('/single/:slug', getPost); //Changed from /single/:postId to :slug
// router.get('/featured-posts', getFeaturedPosts);
router.get('/posts',bodyParser.json(), getPosts);
router.get('/search', searchPost);
router.get('/related-posts/:postId', getRelatedPosts);
router.get('/posts/:tag', getPostsTag);

//Update Route
router.put('/:postId',
    parseData,
    postValidator,
    validate,
    updatePost
);

//Delete Route
router.delete('/:postId', deletePost)

module.exports = router;