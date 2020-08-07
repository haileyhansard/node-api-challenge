const express = require('express');
const projectModel = require('../data/helpers/projectModel');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();

//GET REQUESTS 

// get all projects
// get request to localhost:4444/api/projects
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
// get request to localhost:4444/api/projects/2
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

// get the list of all actions for a specific prject
// requires the id of the project (make sure to check this with project id 1 because it will have the actions)
// get request to localhost:4444/api/projects/1/actions
router.get('/:id/actions', (req, res) => {
    const projectId = req.params.id;
    projectModel.getProjectActions(projectId)
        .then(actions => {
            console.log(actions)
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Unable to get the actions for the specified project'})
        })
})

// POST REQUEST
// add a new project
// post request to localhost:4444/api/projects/
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
// put request to localhost:4444/api/projects/4
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
// delete request to localhost:4444/api/projects/6
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