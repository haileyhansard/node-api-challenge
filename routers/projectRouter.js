const express = require('express');
const projectModel = require('../data/helpers/projectModel');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();

//GET REQUESTS 

// get all projects
router.get('/', (req, res) => {
    projectModel.get()
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Projects could not be retreived.' });
        });
});

//get project by id
router.get('/:id', (req, res) => {
    projectModel.get(req.params.id)
        .then(project => {
            console.log(project)
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Project could not be retreived.' });
        });
});

module.exports = router;