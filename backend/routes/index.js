const express = require('express');
const router = express.Router();

const clientsRouter = require('./clients');
const jobsRouter = require('./jobs');
const machineryRouter = require('./machinery');
const inventoryRouter = require('./inventory');

router.use('/clients', clientsRouter);
router.use('/jobs', jobsRouter);
router.use('/machinery', machineryRouter);
router.use('/inventory', inventoryRouter);

module.exports = router;
