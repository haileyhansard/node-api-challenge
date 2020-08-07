const actionModel = require('../data/helpers/actionModel');

module.exports = function validateActionId(req, res, next) {
    actionModel.get(req.params.id)
        .then(id => {
            if (id) {
                next()
            } else {
                res.status(400).json({ message: 'Invalid action id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};