const actionModel = require('../data/helpers/actionModel');

module.exports = function validateActionIdMatches(req, res, next) {
    if(req.body.project_id !== req.params.id) {
        res.status(400).json({ message: 'The project id must match the project id you are tryin to target'})
    } else {
        next()
    }
;}


//actionModel.get(req.params.id)
    //     .then(id => {
    //         if
    //     })
    //     .catch()