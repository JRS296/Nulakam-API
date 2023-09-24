const {check, validationResult} = require("express-validator")

exports.postValidator = [
    check('title').trim().not().isEmpty().withMessage('Book Title is Missing!'),
    check('author').trim().not().isEmpty().withMessage('Book Author is Missing!'),
    check('isbn13').trim().not().isEmpty().withMessage('Book isbn is Missing!'),
    check('image').trim().not().isEmpty().withMessage('Book isbn is Missing!'),
    check('publisher').trim().not().isEmpty().withMessage('Book Publisher is Missing!'),
    check('edition').trim().not().isEmpty().withMessage('Book Edition is Missing!'),
    check('number').trim().not().isEmpty().withMessage('Book Number is Missing!'),
    check('content').trim().not().isEmpty().withMessage('Book Content is Missing!'),
    check('meta').trim().not().isEmpty().withMessage('Meta Description is Missing!'),
    check('slug').trim().not().isEmpty().withMessage('Book slug is Missing!'),
    check('tags').trim().not().isEmpty().withMessage('Tag is Missing!'),
    //We'll handle tags within controller itself 
]

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if(error.length)
    {
        return res.status(401).json({error: error[0].msg})
        //console.log(error);
    }
    next();
};