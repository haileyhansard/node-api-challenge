const express = require('express');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();


// GET REQUESTS

// get all actions
//get request to localhost:4444/api/projects/1/actions
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
//get request to localhost:444/api/actions/1
router.get('/:id', (req, res) => {
    actionModel.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
        })
});

// POST REQUEST
// Add a new action
// requires project_id (of an existing project), description, and notes
// post request to localhost:4444/api/actions/1/actions

router.post('/:id/actions', (req, res) => {
    const actionReqBody = {...req.body, project_id: req.params.id}
    actionModel.insert(actionReqBody)
        .then((newAction) => {
            console.log(newAction)
            res.status(201).json(newAction)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'New action item could not be added' })
        });
});


// PUT REQUEST
// Updates an action
// first get request to localhost:4444/api/projects/1
// then put request to localhost:4444/api/actions/1/
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    actionModel.update(id, changes)
        .then(action => {
            console.log(action)
            res.status(200).json({ message: 'Action was successfully updated' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Action was NOT able to be updated' })
        });
});

// DELETE REQUEST
// Delets an action
// delete request to localhost:4444/api/actions/6
router.delete('/:id', (req, res) => {
    actionModel.remove(req.params.id)
        .then(deleted => {
            console.log(deleted)
            res.status(200).json({ message: 'Action was successfully deleted' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Action was not able to be deleted' })
        })
})

module.exports = router;