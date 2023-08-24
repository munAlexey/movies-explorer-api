const { celebrate } = require('celebrate');
const express = require('express');
const { PATCH_ME } = require('../utils/validation');

const router = express.Router();

const {
  patchMe, getMe,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch('/me', celebrate(PATCH_ME), patchMe);

module.exports = router;
