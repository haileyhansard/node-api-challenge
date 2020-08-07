const express = require('express');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();

// GET REQUESTS

// get all actions
router.get('/', (req, res) => {
    actionModel.get()
        .then(actions => {
            console.log(actions)
            res.send(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Actions could not be retreived." })
        })
});

//get action by id
router.get('/:id', (req, res) => {
    actionModel.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router;