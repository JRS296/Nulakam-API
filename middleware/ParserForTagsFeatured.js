exports.parseData = (req, res, next) => {
    const {tags} = req.body;
    if(tags) req.body.tags = JSON.parse(tags);
    // if(featured) req.body.featured = JSON.parse(featured);

    next();
 };