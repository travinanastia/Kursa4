/** @format */

const express = require('express');
const crypto = require('crypto');
const { generateLiqPayForm, liqPayCallback } = require('../controllers/paymentController');
const ROLES_LIST = require('../config/rolesList');
const verifyJwt = require('../middleware/verifyJwt');
const verifyRoles = require('../middleware/verifyRoles');

const router = express.Router();

router.route('/payment/:id').get(generateLiqPayForm);
router.route('/callback').post(liqPayCallback);

module.exports = router;
