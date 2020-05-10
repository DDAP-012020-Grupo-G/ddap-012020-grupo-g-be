const express = require('express')
const router = express.Router()
const profileService = require('../services/profile.service')

// routes
router.get('/:id', getByUserId)

module.exports = router

function getByUserId(req, res, next) {
  profileService
    .getByUserId(req.params.id)
    .then((profile) => (profile ? res.json(profile) : res.sendStatus(404)))
    .catch((err) => next(err))
}
