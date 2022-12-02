const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/getUserById',userController.getUserById);

module.exports =router;
