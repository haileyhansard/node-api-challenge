module.exports = function validateActionIdMatches(req, res, next) {
    if(req.body.project_id !== req.params.id) {
        res.status(400).json({ message: 'The project id must match the project id you are trying to target'})
    } else {
        next()
    }
};
