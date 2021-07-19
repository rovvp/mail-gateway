const express        = require('express')
const router         = express.Router();
const mailController = require('../controllers/mailController');

// Main mail functions
router.post('/', mailController.processMail);

module.exports = router;
