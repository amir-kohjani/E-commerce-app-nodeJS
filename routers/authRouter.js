const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.genCode);
router.get('/valiteCode', authController.validationCode);
module.exports =router;
