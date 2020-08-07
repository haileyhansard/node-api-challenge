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

//GET getProjectAction
// come back to this one ///////////////////

// POST REQUEST
// add a new project
router.post('/',  (req, res) => {
    projectModel.insert(req.body)
        .then(project => {
            console.log(project)
            res.status(201).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Project could not be added to list' })
        });
});

// PUT REQUEST
// Update a project
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    projectModel.update(id, changes)
        .then(() => {
            res.status(200).json({...changes, id })
        })
        .catch(() => {
            res.status(500).json({ message: "Project could not be updated" })
        })
});

// DELETE REQUEST
// Delete a project
router.delete('/:id', (req, res) => {
    projectModel.remove(req.params.id)
        .then((countDeleted) => {
            res.status(200).json({ message: `${countDeleted} project  was deleted successfully` })
        })
        .catch(() => {
            res.status(500).json({ message: 'Project was not able to be deleted' });
        });
});

module.exports = router;