module.exports = function validateAction(req, res, next) {
    if(!req.body) {
        res.status(404).json({ message: 'Check requirements, missing data'})
    } else if (!req.body.description || !req.body.notes) {
        res.status(404).json({ message: 'Data is missing for description or notes'})
    } else if (req.body.description.length > 128) {
        res.status(400).json({ message: 'Please shorten description to 128 characters or less'})
    } else {
        next()
    };
};