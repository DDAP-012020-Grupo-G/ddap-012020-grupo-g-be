const express = require('express')
const router = express.Router()
const profileService = require('../services/profile.service')

// routes
router.get('/:user_id', getByUserId)
router.put('/:user_id', update)

module.exports = router

function getByUserId(req, res, next) {
  profileService
    .getByUserId(req.params.user_id)
    .then((profile) => (profile ? res.json(profile) : res.sendStatus(404)))
    .catch((err) => next(err))
}

function update(req, res, next) {
  profileService
    .update(req.params.user_id, req.body)
    .then(() => res.json({ message: 'Perfil modificado correctamente' }))
    .catch((err) => next(err))
}
