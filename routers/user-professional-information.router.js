// importing models
const UserInformation = require('../models/user-information.model')
const UserAuthService = require('../middlewares/userAuth.middleware')

// importing libraries
const express = require('express')

// other imports
const mongoose = require('../database/db'),
    router = express.Router()

// routes
router
    .get('/:mobile', (req, res) => {
        UserInformation.
            findOne({ mobile: req.params.mobile })
            .then(d => res.status(200).json({
                message: 'Professional-Information retrieved',
                pInfo: d.professionalInformation
            }))
            .catch(d => res.status(400).json({ message: 'Something went wrong', data: d }))
    })
    .post('/:mobile', UserAuthService, (req, res) => {
        UserInformation
            .updateOne({ mobile: req.params.mobile }, { $set: { professionalInformation: req.body } })
            .then(d => {
                console.log(d);
                res.status(200).json({ message: 'Professional-Information Updated', data: d })
            })
            .catch(d => res.status(500).json({ message: 'Something went wrong', data: d }))
    })
    .patch('/:mobile', (req, res) => {

    })
    .delete('/:id', (req, res) => {

    })

module.exports = router